import {Injectable} from '@angular/core';
import {Num} from '../num';
import {HoldingRecord} from '../classes/records/holdings/holding-record';
import {GeneratorRecord} from '../classes/records/generators/generator-record';
import {UpgradeRecord} from '../classes/records/upgrades/upgrade-record';
import {Buyable} from '../classes/features/buyable';
import {LocalStorageHelper} from '../classes/helpers/local-storage-helper';
import {ResetHelper} from '../classes/helpers/reset-helper';
import {ResetKey} from '../classes/enums/reset-key';
import {MilestoneRecord} from '../classes/records/milestones/milestone-record';
import {Multiplier} from '../classes/features/multiplier';
import {MultiplierRecord} from "../classes/records/multipliers/multiplier-record";
import {ChargerRecord} from "../classes/records/charger/charger-record";
import {BlueElement, createBlueElement, ElementCardEffects, ElementCardKind, restoreBlueElement, StoredBlueElement} from '../classes/features/elements/blue-element';
import {StrangeQuarkEffects} from '../classes/features/strange-quark-effects';
import {PrestigeLayersService} from './prestige-layers.service';

export type BlueParticleMode = 'none' | 'protons' | 'electrons';
export type NeutronStarUpgradeKey = 'protons' | 'electrons' | 'neutrons' | 'activeSlots' | 'inventorySlots' | 'elementLevel' | 'rarity';

export interface NeutronStarUpgrade {
  key: NeutronStarUpgradeKey;
  name: string;
  description: string;
  baseCost: number;
  costScale: number;
  maxLevel?: number;
}

export interface NeutronStarMassMilestone {
  goal: Num;
  name: string;
  description: string;
}

export interface ElementDiscovery {
  kind: ElementCardKind;
  unlockIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class BluePhaseService {
  static readonly elementInventorySlots = 12;
  static readonly activeElementSlots = 2;
  static elementsDiscoveredCount = 0;
  static readonly unlockRequirement = new Num(1, 1000);
  static readonly neutronRestorationTarget = new Num(1, 10);
  static readonly minimumMeltdownPower = new Num(1, -1);
  private readonly storage = new LocalStorageHelper('blue-phase', 'state');
  private purchaseStates: {[key: string]: {mantissa: number, exponent: number} | boolean} = {};
  activeParticle: BlueParticleMode = 'none';
  unlocked = false;
  elements: BlueElement[] = [];
  activeElementCardIds: string[] = [];
  showClearActiveElementsWarning = true;
  elementsDiscovered = 0;
  highestNeutrons = Num.ZERO.copy();
  neutronStarMass = Num.ZERO.copy();
  strangeQuarks = Num.ZERO.copy();
  neutronStarUpgrades: Record<NeutronStarUpgradeKey, number> = {
    protons: 0, electrons: 0, neutrons: 0, activeSlots: 0,
    inventorySlots: 0, elementLevel: 0, rarity: 0
  };
  readonly neutronStarUpgradeDefinitions: NeutronStarUpgrade[] = [
    {key: 'protons', name: 'Proton Jet', description: 'Double proton generation per level.', baseCost: 1000, costScale: 5},
    {key: 'electrons', name: 'Electron Aurora', description: 'Double electron generation per level.', baseCost: 1000, costScale: 5},
    {key: 'neutrons', name: 'Neutron Compression', description: 'Double neutron gain per level.', baseCost: 2500, costScale: 6},
    {key: 'activeSlots', name: 'Orbital Harmonics', description: 'Add one active element slot.', baseCost: 25000, costScale: 25, maxLevel: 4},
    {key: 'inventorySlots', name: 'Gravitational Vault', description: 'Add four element inventory slots.', baseCost: 15000, costScale: 12, maxLevel: 8},
    {key: 'elementLevel', name: 'Fusion Pressure', description: 'Generate elements one level higher.', baseCost: 50000, costScale: 10},
    {key: 'rarity', name: 'Exotic Catalysis', description: 'Improve the probability of high-rarity elements.', baseCost: 75000, costScale: 10}
  ];
  readonly neutronStarMassMilestones: NeutronStarMassMilestone[] = [
    {
      goal: new Num(1, 1),
      name: 'Yellow Spark',
      description: 'Start Blue runs with 1 Yellow Prestige, 1 Yellow Particle, and 1 Yellow Key.'
    },
    {
      goal: new Num(2.5, 2),
      name: 'Particle Compression',
      description: 'Square the log10(red particles) multiplier to electron and proton generation.'
    },
    {
      goal: new Num(5, 2),
      name: 'Atomic Compression',
      description: 'Add half the combined proton and electron exponents to generated element levels.'
    },
    {
      goal: new Num(2.5, 3),
      name: 'Elemental Compression',
      description: 'Unlock new elements at powers of 5 Neutrons instead of powers of 10.'
    },
    {
      goal: new Num(5, 3),
      name: 'Solar Compression',
      description: 'Generate Yellow Prestiges and Yellow Keys based on log10(Yellow Particles).'
    }
  ];

  readonly elementDiscoveries: ElementDiscovery[] = (
    ['helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine'] as ElementCardKind[]
  ).map((kind, index) => ({kind, unlockIndex: index + 1}));

  lithiumCardChargeSeconds = Num.ZERO.copy();
  boronCardExtensionProgress = Num.ZERO.copy();
  fluorineBoosterAccelerationProgress = Num.ZERO.copy();

  constructor() {
    ResetHelper.registerResetListener('blue-phase-unlock', resetKey => {
      if (resetKey === ResetKey.BLUE) {
        this.lithiumCardChargeSeconds = Num.ZERO.copy();
        this.boronCardExtensionProgress = Num.ZERO.copy();
        this.fluorineBoosterAccelerationProgress = Num.ZERO.copy();
        this.unlockFromPrestige();
        this.applyElementCardEffects();
        this.save();
      }
    });
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  tick(speed: Num): void {
    if (!this.isUnlocked()) return;

    this.applyStrangeQuarkEffect();
    this.recordHighestNeutrons();
    this.detectPurchases();
    const generation = this.getParticleGeneration().mul(speed);

    if (this.activeParticle === 'protons') {
      HoldingRecord.protons.generate(generation);
    } else if (this.activeParticle === 'electrons') {
      HoldingRecord.electrons.generate(generation);
    }

    this.applyElementCardEffects();
    this.chargeElementCardEffects(speed);
    this.generateStrangeQuarks(speed);
  }

  getStrangeQuarkEffect(): Num {
    if (this.strangeQuarks.lte(Num.ONE)) return Num.ONE.copy();
    return this.strangeQuarks.pow(new Num(5, -1));
  }

  applyStrangeQuarkEffect(): void {
    StrangeQuarkEffects.redGeneratorBuyMultiplier = this.isUnlocked()
      ? this.getStrangeQuarkEffect()
      : Num.ONE.copy();
  }

  applyNeutronMeltdown(): void {
    Multiplier.neutronMeltdownPower = this.isUnlocked()
      ? this.getNeutronMeltdownPower()
      : Num.ONE.copy();
  }

  getTotalNeutronMatter(): Num {
    return HoldingRecord.neutrons.amount.add(HoldingRecord.neutronClump.amount);
  }

  private recordHighestNeutrons(): void {
    if (HoldingRecord.neutrons.amount.gt(this.highestNeutrons)) {
      this.highestNeutrons = HoldingRecord.neutrons.amount.copy();
    }
  }

  getNeutronRestorationTarget(): Num {
    return BluePhaseService.neutronRestorationTarget;
  }

  getNeutronMeltdownProgress(): number {
    this.recordHighestNeutrons();
    const total = Math.max(0, this.highestNeutrons.toNumber());
    const target = BluePhaseService.neutronRestorationTarget.toNumber();
    return Math.min(1, Math.log10(total + 1) / Math.log10(target + 1));
  }

  getNeutronMeltdownProgressPercent(): number {
    return this.getNeutronMeltdownProgress() * 100;
  }

  getNeutronMeltdownPower(): Num {
    const minimum = BluePhaseService.minimumMeltdownPower.toNumber();
    const restored = minimum * Math.pow(1 / minimum, this.getNeutronMeltdownProgress());
    return new Num(restored, 0);
  }

  unlockFromPrestige(): void {
    this.unlocked = true;
    this.resetDarkStarChargers();
    this.startParticleGeneration();
    this.synchronizePurchases();
    this.applyNeutronMeltdown();
    this.applyNeutronStarMassMilestones();
  }

  getParticleGeneration(): Num {
    let generation = new Num(1, -2);
    generation = generation.mul(this.getRedParticleGenerationBoost());
    generation = generation.mul(MultiplierRecord.nucleusGeneration.getNum(false));
    // if (MilestoneRecord.denseParticleCollision.unlocked) generation = new Num(5, 0);
    generation = generation.mul(
      UpgradeRecord.blueBeamIntensity.buffer.pow(UpgradeRecord.blueBeamIntensity.amount)
    ).mul(
      UpgradeRecord.blueParticleResonance.buffer.pow(UpgradeRecord.blueParticleResonance.amount)
    );
    if (this.activeParticle === 'protons') generation = generation.mul(Num.TWO.pow(this.neutronStarUpgrades.protons));
    if (this.activeParticle === 'electrons') generation = generation.mul(Num.TWO.pow(this.neutronStarUpgrades.electrons));
    return generation;
  }

  getRedParticleGenerationBoost(): Num {
    const redParticleOrders = HoldingRecord.redParticles.amount.log10().max(Num.ONE);
    return this.isNeutronStarMassMilestoneUnlocked(this.neutronStarMassMilestones[1])
      ? redParticleOrders.pow(Num.TWO)
      : redParticleOrders;
  }

  getCollisionGain(): Num {
    const pairs = HoldingRecord.protons.amount.lt(HoldingRecord.electrons.amount)
      ? HoldingRecord.protons.amount
      : HoldingRecord.electrons.amount;
    let multiplier = MilestoneRecord.denseParticleCollision.unlocked ? Num.TWO.copy() : Num.ONE.copy();
    multiplier = multiplier.mul(
      UpgradeRecord.blueColliderEfficiency.buffer.pow(UpgradeRecord.blueColliderEfficiency.amount)
    ).mul(
      UpgradeRecord.blueCollisionCalibration.buffer.pow(UpgradeRecord.blueCollisionCalibration.amount)
    );
    return pairs.pow(new Num(2.5, -1))
      .sub(Num.ONE)
      .max(Num.ZERO)
      .floor()
      .mul(multiplier)
      .mul(Num.TWO.pow(this.neutronStarUpgrades.neutrons))
      .floor();
  }

  canCollide(): boolean {
    return this.getCollisionGain().greq(Num.ONE);
  }

  collide(): void {
    const gain = this.getCollisionGain();
    if (gain.lt(Num.ONE)) return;

    ResetHelper.reset(ResetKey.BLUE);
    HoldingRecord.neutrons.add(gain);
    this.recordHighestNeutrons();
    this.startParticleGeneration();
    this.synchronizePurchases();
  }

  mergeLegacyNeutronClump(): void {
    if (HoldingRecord.neutronClump.amount.lt(Num.ONE)) return;
    HoldingRecord.neutrons.add(HoldingRecord.neutronClump.amount);
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
  }

  getNeutronStage(): number {
    if (HoldingRecord.neutrons.amount.lt(new Num(1, 1))) return 0;
    return Math.max(0, Math.floor(HoldingRecord.neutrons.amount.log10().toNumber()));
  }

  getElementGenerationLevel(): number {
    let elementLevel = this.getNeutronStage() + this.neutronStarUpgrades.elementLevel;
    if (this.isNeutronStarMassMilestoneUnlocked(this.neutronStarMassMilestones[2])) {
      elementLevel += (HoldingRecord.protons.amount.exponent + HoldingRecord.electrons.amount.exponent) / 2;
    }
    return Math.floor(elementLevel);
  }

  canFuseElement(): boolean {
    return HoldingRecord.neutrons.amount.greq(new Num(1, 1))
      && this.elements.length < this.getElementInventorySlots();
  }

  getUnlockedCardKinds(): ElementCardKind[] {
    const neutrons = HoldingRecord.neutrons.amount;
    return this.elementDiscoveries
      .filter(discovery => neutrons.greq(this.getElementUnlockRequirement(discovery.unlockIndex)))
      .map(discovery => discovery.kind);
  }

  usesCompressedElementUnlocks(): boolean {
    return this.isNeutronStarMassMilestoneUnlocked(this.neutronStarMassMilestones[3]);
  }

  getElementUnlockRequirement(unlockIndex: number): Num {
    const base = this.usesCompressedElementUnlocks() ? 5 : 10;
    return new Num(base, 0).pow(unlockIndex);
  }

  fuseElement(random: () => number = Math.random): BlueElement | null {
    if (!this.canFuseElement()) return null;
    this.recordHighestNeutrons();
    const kinds = this.getUnlockedCardKinds();
    // Every element in the currently unlocked pool has the same chance to be
    // generated. Clamp the injected random value as well so deterministic
    // callers cannot select past the end of the pool with a value of exactly 1.
    const kindIndex = Math.min(kinds.length - 1, Math.floor(Math.max(0, random()) * kinds.length));
    const kind = kinds[kindIndex];

    const neutronStage = this.getNeutronStage();
    const elementLevel = this.getElementGenerationLevel();
    const rarityCeiling = Math.min(99.99, neutronStage * 10);
    const rarityExponent = 2.5 / (1 + this.neutronStarUpgrades.rarity * .2);
    const rarity = Math.min(rarityCeiling, Math.pow(random(), rarityExponent) * rarityCeiling);
    const element = createBlueElement(kind, `${Date.now()}-${Math.floor(random() * 1e9)}`, elementLevel, rarity);

    ResetHelper.reset(ResetKey.BLUE);
    HoldingRecord.protons.amount = Num.ZERO.copy();
    HoldingRecord.electrons.amount = Num.ZERO.copy();
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
    this.elements.push(element);
    this.elementsDiscovered++;
    BluePhaseService.elementsDiscoveredCount = this.elementsDiscovered;
    this.startParticleGeneration();
    this.synchronizePurchases();
    this.applyElementCardEffects();
    this.save();
    return element;
  }

  equipElementCard(element: BlueElement): void {
    if (this.isElementCardActive(element) || this.activeElementCardIds.length >= this.getActiveElementSlots()) return;
    this.activeElementCardIds.push(element.id);
    this.applyElementCardEffects();
    this.save();
  }

  clearActiveElementCards(): void {
    if (!this.activeElementCardIds.length) return;
    this.activeElementCardIds = [];
    ResetHelper.reset(ResetKey.BLUE);
    this.applyElementCardEffects();
    this.save();
  }

  setClearActiveElementsWarning(enabled: boolean): void {
    this.showClearActiveElementsWarning = enabled;
    this.save();
  }

  /** Kept for saved callers: an equipped coin stays selected until explicitly cleared. */
  toggleElementCard(element: BlueElement): void { this.equipElementCard(element); }

  isElementCardActive(element: BlueElement): boolean { return this.activeElementCardIds.includes(element.id); }
  getRarityTier(element: BlueElement): number { return Math.min(9, Math.floor(element.rarity / 10)); }
  getRarityName(element: BlueElement): string {
    return ['Common', 'Uncommon', 'Notable', 'Rare', 'Epic', 'Mythic', 'Ancient', 'Cosmic', 'Transcendent', 'Impossible'][this.getRarityTier(element)];
  }
  getSecondaryColor(element: BlueElement): string {
    return ['#94a3b8', '#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb7185', '#fb923c', '#facc15'][this.getRarityTier(element)];
  }
  private applyElementCardEffects(): void {
    const activeElements = this.elements.filter(element => this.isElementCardActive(element));
    // Each instance applies its own behavior; the service never branches on an element kind.
    ElementCardEffects.reset();
    activeElements.forEach(element => element.applyEffect());
    ElementCardEffects.lithiumChargeMultiplier = this.getLithiumCardMultiplier();
    ElementCardEffects.boronFreeExtensions = this.boronCardExtensionProgress.floor();
    ElementCardEffects.fluorineFreeBoosterAccelerations = this.fluorineBoosterAccelerationProgress.floor();
  }

  private chargeElementCardEffects(speed: Num): void {
    if (ElementCardEffects.lithiumChargeRate.gt(Num.ZERO)) {
      this.lithiumCardChargeSeconds = this.lithiumCardChargeSeconds.add(speed.mul(ElementCardEffects.lithiumChargeRate));
    }
    if (ElementCardEffects.boronExtensionRate.gt(Num.ZERO)) {
      this.chargeBoronExtensions(speed.mul(ElementCardEffects.boronExtensionRate).toNumber());
    }
    if (ElementCardEffects.fluorineBoosterAccelerationRate.gt(Num.ZERO)) {
      this.chargeFluorineBoosterAccelerations(speed.mul(ElementCardEffects.fluorineBoosterAccelerationRate).toNumber());
    }
    ElementCardEffects.lithiumChargeMultiplier = this.getLithiumCardMultiplier();
    ElementCardEffects.boronFreeExtensions = this.boronCardExtensionProgress.floor();
    ElementCardEffects.fluorineFreeBoosterAccelerations = this.fluorineBoosterAccelerationProgress.floor();
  }

  /**
   * Spend Boron's effective charge time one extension at a time. The first free
   * extension takes one minute, while extension n takes n^1.1 minutes. Besides
   * making the early reward visible quickly, consuming each tier separately
   * prevents a long/offline tick from receiving every extension at tier-one speed.
   */
  private chargeBoronExtensions(effectiveSeconds: number): void {
    let completed = Math.floor(this.boronCardExtensionProgress.toNumber());
    let partial = this.boronCardExtensionProgress.toNumber() - completed;

    while (effectiveSeconds > 0) {
      const secondsForNext = 60 * Math.pow(completed + 1, 1.1);
      const secondsRemaining = (1 - partial) * secondsForNext;
      if (effectiveSeconds < secondsRemaining) {
        partial += effectiveSeconds / secondsForNext;
        effectiveSeconds = 0;
      } else {
        effectiveSeconds -= secondsRemaining;
        completed++;
        partial = 0;
      }
    }

    this.boronCardExtensionProgress = new Num(completed + partial, 0);
  }

  private chargeFluorineBoosterAccelerations(effectiveSeconds: number): void {
    let completed = Math.floor(this.fluorineBoosterAccelerationProgress.toNumber());
    let partial = this.fluorineBoosterAccelerationProgress.toNumber() - completed;

    while (effectiveSeconds > 0) {
      const secondsForNext = 3600 * Math.pow(completed + 1, 1.1);
      const secondsRemaining = (1 - partial) * secondsForNext;
      if (effectiveSeconds < secondsRemaining) {
        partial += effectiveSeconds / secondsForNext;
        effectiveSeconds = 0;
      } else {
        effectiveSeconds -= secondsRemaining;
        completed++;
        partial = 0;
      }
    }
    this.fluorineBoosterAccelerationProgress = new Num(completed + partial, 0);
  }

  getLithiumCardMultiplier(): Num {
    const seconds = Math.max(0, this.lithiumCardChargeSeconds.toNumber());
    if (!seconds) return Num.ONE.copy();
    // Logarithmic charge gain gives rapid exponential growth while tapering over time.
    const exponent = 10 * Math.log1p(seconds) / Math.log1p(3600);
    return new Num(1, exponent);
  }

  getBoronCardProgressPercent(): number {
    return this.boronCardExtensionProgress.sub(this.boronCardExtensionProgress.floor()).toNumber() * 100;
  }

  getFluorineCardProgressPercent(): number {
    return this.fluorineBoosterAccelerationProgress.sub(this.fluorineBoosterAccelerationProgress.floor()).toNumber() * 100;
  }

  getActiveElementSlots(): number { return BluePhaseService.activeElementSlots + this.neutronStarUpgrades.activeSlots; }
  getElementInventorySlots(): number { return BluePhaseService.elementInventorySlots + this.neutronStarUpgrades.inventorySlots * 4; }
  isNeutronStarUnlocked(): boolean { return this.elementsDiscovered >= 10; }

  getElementMass(element: BlueElement): Num {
    const atomicWeight: Record<ElementCardKind, number> = {
      helium: 4, lithium: 7, beryllium: 9, boron: 11, carbon: 12, nitrogen: 14, oxygen: 16, fluorine: 19
    };
    return new Num(atomicWeight[element.kind] * Math.max(1, element.level) * (1 + element.rarity / 100), 0);
  }

  sacrificeElement(element: BlueElement): void {
    if (!this.isNeutronStarUnlocked() || !this.elements.includes(element)) return;
    this.neutronStarMass = this.neutronStarMass.add(this.getElementMass(element));
    this.applyNeutronStarMassMilestones();
    this.elements = this.elements.filter(candidate => candidate.id !== element.id);
    this.activeElementCardIds = this.activeElementCardIds.filter(id => id !== element.id);
    this.applyElementCardEffects();
    this.save();
  }

  isNeutronStarMassMilestoneUnlocked(milestone: NeutronStarMassMilestone): boolean {
    return this.neutronStarMass.greq(milestone.goal);
  }

  private applyNeutronStarMassMilestones(): void {
    const yellowLogarithmicGainUnlocked = this.isNeutronStarMassMilestoneUnlocked(
      this.neutronStarMassMilestones[4]
    );
    PrestigeLayersService.yellowPrestigeLayer.gainHoldings.forEach(gain => {
      if (gain.holding === HoldingRecord.yellowPrestiges || gain.holding === HoldingRecord.yellowKeys) {
        gain.logarithmicBaseHolding = yellowLogarithmicGainUnlocked
          ? HoldingRecord.yellowParticles
          : undefined;
      }
    });

    if (this.isNeutronStarMassMilestoneUnlocked(this.neutronStarMassMilestones[0])) {
      [HoldingRecord.yellowPrestiges, HoldingRecord.yellowParticles, HoldingRecord.yellowKeys]
        .forEach(holding => {
          if (holding.amount.lt(Num.ONE)) holding.amount = Num.ONE.copy();
        });
    }
  }

  getStrangeQuarkGeneration(): Num {
    if (this.neutronStarMass.lte(Num.ZERO)) return Num.ZERO.copy();
    return this.neutronStarMass.sqrt().div(new Num(1, 1));
  }

  private generateStrangeQuarks(speed: Num): void {
    this.strangeQuarks = this.strangeQuarks.add(this.getStrangeQuarkGeneration().mul(speed));
  }

  getNeutronStarUpgradeCost(upgrade: NeutronStarUpgrade): Num {
    return new Num(upgrade.baseCost, 0).mul(new Num(upgrade.costScale, 0).pow(this.neutronStarUpgrades[upgrade.key]));
  }

  isNeutronStarUpgradeMaxed(upgrade: NeutronStarUpgrade): boolean {
    return upgrade.maxLevel !== undefined && this.neutronStarUpgrades[upgrade.key] >= upgrade.maxLevel;
  }

  canBuyNeutronStarUpgrade(upgrade: NeutronStarUpgrade): boolean {
    return !this.isNeutronStarUpgradeMaxed(upgrade) && this.strangeQuarks.greq(this.getNeutronStarUpgradeCost(upgrade));
  }

  buyNeutronStarUpgrade(upgrade: NeutronStarUpgrade): void {
    if (!this.canBuyNeutronStarUpgrade(upgrade)) return;
    this.strangeQuarks = this.strangeQuarks.sub(this.getNeutronStarUpgradeCost(upgrade));
    this.neutronStarUpgrades[upgrade.key]++;
    this.applyStrangeQuarkEffect();
    this.save();
  }

  private getBuyables(): {key: string, buyable: Buyable}[] {
    const generators = GeneratorRecord.list;
    const generatorUpgrades = generators.flatMap(generator => generator.getUpgrades());
    const entries: {key: string, buyable: Buyable}[] = [];

    generators.forEach(generator => entries.push({
      key: `generator:${generator.saveName}`,
      buyable: generator
    }));
    UpgradeRecord.list.forEach(upgrade => entries.push({
      key: `upgrade:${upgrade.saveName}`,
      buyable: upgrade
    }));
    generatorUpgrades.forEach(upgrade => entries.push({
      key: `generator-upgrade:${upgrade.saveName}`,
      buyable: upgrade
    }));

    return entries;
  }

  private detectPurchases(): void {
    this.getBuyables().forEach(({key, buyable}) => {
      const bought = buyable.bought;
      if (bought.gt(this.getStoredPurchaseCount(key))) {
        this.toggleParticle();
      }
      this.setPurchaseState(key, bought);
    });
  }

  private getStoredPurchaseCount(key: string): Num {
    const stored = this.purchaseStates[key];
    if (stored === true) return Num.ONE.copy();
    if (!stored) return Num.ZERO.copy();
    return Num.fromStorage(stored);
  }

  private setPurchaseState(key: string, bought: Num): void {
    this.purchaseStates[key] = bought.saveData();
  }

  private toggleParticle(): void {
    this.activeParticle = this.activeParticle === 'protons' ? 'electrons' : 'protons';
  }

  private startParticleGeneration(): void {
    this.activeParticle = 'protons';
  }

  private resetDarkStarChargers(): void {
    ChargerRecord.darkStarChargerList.forEach(charger => {
      charger.reset();
      charger.save();
    });
  }

  synchronizePurchases(): void {
    this.purchaseStates = {};
    this.getBuyables().forEach(({key, buyable}) => {
      this.setPurchaseState(key, buyable.bought);
    });
  }

  save(): void {
    this.storage.save(this.unlocked, 'unlocked');
    this.storage.save(this.activeParticle, 'activeParticle');
    this.storage.save(this.purchaseStates, 'purchaseStates');
    this.storage.save(this.elements.map(element => element.toStorage()), 'elements');
    this.storage.save(this.activeElementCardIds, 'activeElementCardIds');
    this.storage.save(this.showClearActiveElementsWarning, 'showClearActiveElementsWarning');
    this.storage.save(this.elementsDiscovered, 'elementsDiscovered');
    this.storage.saveNum(this.highestNeutrons, 'highestNeutrons');
    this.storage.saveNum(this.neutronStarMass, 'neutronStarMass');
    this.storage.saveNum(this.strangeQuarks, 'strangeQuarks');
    this.storage.save(this.neutronStarUpgrades, 'neutronStarUpgrades');
    this.storage.saveNum(this.lithiumCardChargeSeconds, 'lithiumCardChargeSeconds');
    this.storage.saveNum(this.boronCardExtensionProgress, 'boronCardExtensionProgress');
    this.storage.saveNum(this.fluorineBoosterAccelerationProgress, 'fluorineBoosterAccelerationProgress');
  }

  load(): void {
    this.unlocked = this.storage.load(this.unlocked, 'unlocked');
    this.activeParticle = this.storage.load(this.activeParticle, 'activeParticle');
    this.purchaseStates = this.storage.load({}, 'purchaseStates');
    const storedElements = this.storage.load(
      this.storage.load([] as StoredBlueElement[], 'elementCards'),
      'elements'
    ) as StoredBlueElement[];
    this.elements = storedElements.map(restoreBlueElement);
    this.elementsDiscovered = this.storage.load(this.elements.length, 'elementsDiscovered');
    BluePhaseService.elementsDiscoveredCount = this.elementsDiscovered;
    this.highestNeutrons = this.storage.loadNum(HoldingRecord.neutrons.amount, 'highestNeutrons')
      .max(HoldingRecord.neutrons.amount);
    this.neutronStarMass = this.storage.loadNum(this.neutronStarMass, 'neutronStarMass');
    this.strangeQuarks = this.storage.loadNum(this.strangeQuarks, 'strangeQuarks');
    this.neutronStarUpgrades = {
      ...this.neutronStarUpgrades,
      ...this.storage.load({}, 'neutronStarUpgrades')
    };
    this.activeElementCardIds = this.storage.load([] as string[], 'activeElementCardIds')
      .filter((id: string) => this.elements.some(element => element.id === id))
      .slice(0, this.getActiveElementSlots());
    this.showClearActiveElementsWarning = this.storage.load(true, 'showClearActiveElementsWarning');
    this.lithiumCardChargeSeconds = this.storage.loadNum(this.lithiumCardChargeSeconds, 'lithiumCardChargeSeconds');
    this.boronCardExtensionProgress = this.storage.loadNum(this.boronCardExtensionProgress, 'boronCardExtensionProgress');
    this.fluorineBoosterAccelerationProgress = this.storage.loadNum(this.fluorineBoosterAccelerationProgress, 'fluorineBoosterAccelerationProgress');
    this.mergeLegacyNeutronClump();
    this.synchronizePurchases();
    this.applyNeutronMeltdown();
    this.applyStrangeQuarkEffect();
    this.applyElementCardEffects();
    this.applyNeutronStarMassMilestones();
  }

  init(): void {
    this.synchronizePurchases();
    this.applyNeutronMeltdown();
    this.applyStrangeQuarkEffect();
    this.applyElementCardEffects();
  }
}
