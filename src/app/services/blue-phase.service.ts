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
import {Holding} from '../classes/features/holding';
import {BerylliumHolding, LithiumHolding} from '../classes/features/holdings/blue-holdings';

export type BlueParticleMode = 'none' | 'protons' | 'electrons';

export interface BlueElementDefinition {
  requiredStage: number;
  unlockAmount: Num;
  holding: Holding;
  theme: string;
}

@Injectable({
  providedIn: 'root'
})
export class BluePhaseService {
  static readonly unlockRequirement = new Num(1, 1000);
  static readonly neutronRestorationTarget = new Num(1, 6);
  static readonly minimumMeltdownPower = new Num(1, -1);
  static readonly lithiumDischargeBaseCharge = new Num(1, 1);
  private readonly storage = new LocalStorageHelper('blue-phase', 'state');
  private purchaseStates: {[key: string]: {mantissa: number, exponent: number} | boolean} = {};
  activeParticle: BlueParticleMode = 'none';
  unlocked = false;

  lithiumBatteries = Num.ZERO.copy();
  lithiumChargeGenerators = Num.ZERO.copy();
  lithiumCapacityUpgrades = Num.ZERO.copy();
  lithiumCharge = Num.ZERO.copy();
  lithiumBatteryTier = Num.ZERO.copy();
  berylliumRockets = Num.ZERO.copy();
  berylliumFuelSystems = Num.ZERO.copy();
  berylliumLogicSystems = Num.ZERO.copy();

  readonly elementDefinitions: BlueElementDefinition[] = [
    {requiredStage: 1, unlockAmount: new Num(1, 1), holding: HoldingRecord.lithium, theme: 'Lithium-ion batteries'},
    {requiredStage: 2, unlockAmount: new Num(1, 2), holding: HoldingRecord.beryllium, theme: 'Rocket construction and extension thrust'},
    {requiredStage: 3, unlockAmount: new Num(1, 3), holding: HoldingRecord.boron, theme: 'Neutron shielding'},
    {requiredStage: 4, unlockAmount: new Num(1, 4), holding: HoldingRecord.carbon, theme: 'Carbon lattice computing'},
    {requiredStage: 5, unlockAmount: new Num(1, 5), holding: HoldingRecord.nitrogen, theme: 'Cryogenic atmospheres'}
  ];

  constructor() {
    ResetHelper.registerResetListener('blue-phase-unlock', resetKey => {
      if (resetKey === ResetKey.BLUE) {
        this.unlockFromPrestige();
      }
    });
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  tick(speed: Num): void {
    if (!this.isUnlocked()) return;

    this.detectPurchases();
    const generation = this.getParticleGeneration().mul(speed);

    if (this.activeParticle === 'protons') {
      HoldingRecord.protons.generate(generation);
    } else if (this.activeParticle === 'electrons') {
      HoldingRecord.electrons.generate(generation);
    }

    this.generateForgedElements(speed);
    this.generateLithiumCharge(speed);
    this.syncLithiumBatteryState();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
  }

  applyNeutronMeltdown(): void {
    Multiplier.neutronMeltdownPower = this.isUnlocked()
      ? this.getNeutronMeltdownPower()
      : Num.ONE.copy();
  }

  getTotalNeutronMatter(): Num {
    return HoldingRecord.neutrons.amount.add(HoldingRecord.neutronClump.amount);
  }

  getNeutronRestorationTarget(): Num {
    return BluePhaseService.neutronRestorationTarget;
  }

  getNeutronMeltdownProgress(): number {
    const total = Math.max(0, this.getTotalNeutronMatter().toNumber());
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
    this.syncLithiumBatteryState();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    this.applyNeutronMeltdown();
  }

  getParticleGeneration(): Num {
    let generation = new Num(1, -2);
    generation = generation.mul(this.getRedParticleGenerationBoost());
    generation = generation.mul(MultiplierRecord.nucleusGeneration.getNum(false));
    // if (MilestoneRecord.denseParticleCollision.unlocked) generation = new Num(5, 0);
    return generation.mul(
      UpgradeRecord.blueBeamIntensity.buffer.pow(UpgradeRecord.blueBeamIntensity.amount)
    ).mul(
      UpgradeRecord.blueParticleResonance.buffer.pow(UpgradeRecord.blueParticleResonance.amount)
    );
  }

  getRedParticleGenerationBoost(): Num {
    return HoldingRecord.redParticles.amount.log10().max(Num.ONE);
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
    this.startParticleGeneration();
    this.synchronizePurchases();
  }

  depositAllNeutrons(): void {
    if (HoldingRecord.neutrons.amount.lt(Num.ONE)) return;
    HoldingRecord.neutronClump.add(HoldingRecord.neutrons.amount);
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
  }

  canDepositNeutrons(): boolean {
    return HoldingRecord.neutrons.amount.greq(Num.ONE);
  }

  getClumpStage(): number {
    if (HoldingRecord.neutronClump.amount.lt(new Num(1, 1))) return 0;
    return Math.max(0, Math.floor(HoldingRecord.neutronClump.amount.log10().toNumber()));
  }

  getActiveElementDefinitions(): BlueElementDefinition[] {
    return this.elementDefinitions.filter(element => this.isElementUnlocked(element));
  }

  isElementUnlocked(element: BlueElementDefinition): boolean {
    return HoldingRecord.neutronClump.amount.greq(element.unlockAmount);
  }

  getCurrentElementName(): string {
    const activeElements = this.getActiveElementDefinitions();
    return activeElements.length > 0
      ? activeElements.map(element => element.holding.displayName).join(', ')
      : 'No element';
  }

  getNextStageRequirement(): Num {
    return new Num(1, this.getClumpStage() + 1);
  }

  getElementGeneration(element: BlueElementDefinition): Num {
    if (!this.isElementUnlocked(element)) return Num.ZERO.copy();
    return HoldingRecord.neutronClump.amount
      .div(element.unlockAmount)
      .mul(new Num(1, -2));
  }

  getLithiumGeneration(): Num {
    return this.getElementGeneration(this.elementDefinitions[0]);
  }

  getBerylliumRocketCost(): Num { return new Num(5, 0).mul(new Num(2, 0).pow(this.berylliumRockets)); }
  getBerylliumFuelCost(): Num { return new Num(1, 1).mul(new Num(2, 0).pow(this.berylliumFuelSystems)); }
  getBerylliumLogicCost(): Num { return new Num(1, 1).mul(new Num(2, 0).pow(this.berylliumLogicSystems)); }
  getBerylliumFuelEffect(): Num { return this.berylliumFuelSystems.mul(new Num(2.5, -1)).add(Num.ONE); }
  getBerylliumLogicEffect(): Num { return this.berylliumLogicSystems.mul(new Num(1.5, -1)).add(Num.ONE); }
  getBerylliumRocketEffect(): Num {
    return this.berylliumRockets
      .mul(this.getBerylliumFuelEffect())
      .mul(this.getBerylliumLogicEffect())
      .add(Num.ONE);
  }
  isLithiumUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[0]); }
  isBerylliumUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[1]); }
  canBuyBerylliumRocket(): boolean { return this.isBerylliumUnlocked() && HoldingRecord.beryllium.amount.greq(this.getBerylliumRocketCost()); }
  buyBerylliumRocket(): void { if (!this.canBuyBerylliumRocket()) return; HoldingRecord.beryllium.sub(this.getBerylliumRocketCost()); this.berylliumRockets = this.berylliumRockets.add(Num.ONE); this.toggleParticle(); BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect(); }
  canBuyBerylliumFuel(): boolean { return this.isBerylliumUnlocked() && HoldingRecord.protons.amount.greq(this.getBerylliumFuelCost()); }
  buyBerylliumFuel(): void { if (!this.canBuyBerylliumFuel()) return; HoldingRecord.protons.sub(this.getBerylliumFuelCost()); this.berylliumFuelSystems = this.berylliumFuelSystems.add(Num.ONE); this.toggleParticle(); BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect(); }
  canBuyBerylliumLogic(): boolean { return this.isBerylliumUnlocked() && HoldingRecord.electrons.amount.greq(this.getBerylliumLogicCost()); }
  buyBerylliumLogic(): void { if (!this.canBuyBerylliumLogic()) return; HoldingRecord.electrons.sub(this.getBerylliumLogicCost()); this.berylliumLogicSystems = this.berylliumLogicSystems.add(Num.ONE); this.toggleParticle(); BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect(); }

  private generateForgedElements(speed: Num): void {
    this.getActiveElementDefinitions()
      .forEach(element => element.holding.generate(this.getElementGeneration(element).mul(speed)));
  }

  getLithiumBatteryCost(): Num { return new Num(5, 0).mul(new Num(1.75, 0).pow(this.lithiumBatteries)); }
  getLithiumChargeGeneratorCost(): Num { return new Num(1, 1).mul(new Num(2, 0).pow(this.lithiumChargeGenerators)); }
  getLithiumCapacityCost(): Num { return new Num(1, 1).mul(new Num(2.25, 0).pow(this.lithiumCapacityUpgrades)); }
  getLithiumBatteryCapacity(): Num { return new Num(1, 2).mul(new Num(1.6, 0).pow(this.lithiumCapacityUpgrades)); }
  getLithiumTotalCapacity(): Num { return this.lithiumBatteries.mul(this.getLithiumBatteryCapacity()); }
  getLithiumTotalCharge(): Num { return this.lithiumCharge.lt(this.getLithiumTotalCapacity()) ? this.lithiumCharge : this.getLithiumTotalCapacity(); }
  getLithiumDischargeThreshold(): Num { return BluePhaseService.lithiumDischargeBaseCharge.pow(this.lithiumBatteryTier).mul(new Num(1, 4)); }
  getLithiumBatteryTierEffect(): Num { return Num.TWO.pow(this.lithiumBatteryTier); }
  canDischargeLithiumBattery(): boolean { return this.getLithiumTotalCharge().greq(this.getLithiumDischargeThreshold()); }
  dischargeLithiumBattery(): void {
    if (!this.canDischargeLithiumBattery()) return;

    this.lithiumBatteryTier = this.lithiumBatteryTier.add(Num.ONE);
    HoldingRecord.lithium.amount = Num.ZERO.copy();
    this.lithiumBatteries = Num.ZERO.copy();
    this.lithiumChargeGenerators = Num.ZERO.copy();
    this.lithiumCapacityUpgrades = Num.ZERO.copy();
    this.lithiumCharge = Num.ZERO.copy();
    this.syncLithiumBatteryState();
  }

  canBuyLithiumBattery(): boolean { return this.isLithiumUnlocked() && HoldingRecord.lithium.amount.greq(this.getLithiumBatteryCost()); }
  buyLithiumBattery(): void { if (!this.canBuyLithiumBattery()) return; HoldingRecord.lithium.sub(this.getLithiumBatteryCost()); this.lithiumBatteries = this.lithiumBatteries.add(Num.ONE); this.toggleParticle(); }
  canBuyLithiumChargeGenerator(): boolean { return this.isLithiumUnlocked() && HoldingRecord.electrons.amount.greq(this.getLithiumChargeGeneratorCost()); }
  buyLithiumChargeGenerator(): void { if (!this.canBuyLithiumChargeGenerator()) return; HoldingRecord.electrons.sub(this.getLithiumChargeGeneratorCost()); this.lithiumChargeGenerators = this.lithiumChargeGenerators.add(Num.ONE); this.toggleParticle(); }
  canBuyLithiumCapacityUpgrade(): boolean { return this.isLithiumUnlocked() && HoldingRecord.protons.amount.greq(this.getLithiumCapacityCost()); }
  buyLithiumCapacityUpgrade(): void { if (!this.canBuyLithiumCapacityUpgrade()) return; HoldingRecord.protons.sub(this.getLithiumCapacityCost()); this.lithiumCapacityUpgrades = this.lithiumCapacityUpgrades.add(Num.ONE); this.toggleParticle(); }

  private generateLithiumCharge(speed: Num): void {
    if (this.lithiumChargeGenerators.lt(Num.ONE) || this.lithiumBatteries.lt(Num.ONE)) return;
    const gain = this.lithiumChargeGenerators.mul(new Num(5, 0)).mul(speed);
    this.lithiumCharge = this.lithiumCharge.add(gain);
    const capacity = this.getLithiumTotalCapacity();
    if (this.lithiumCharge.gt(capacity)) this.lithiumCharge = capacity.copy();
  }

  private syncLithiumBatteryState(): void {
    LithiumHolding.batteryCharge = this.getLithiumTotalCharge();
    LithiumHolding.batteryTier = this.lithiumBatteryTier.copy();
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
    this.storage.saveNum(this.lithiumBatteries, 'lithiumBatteries');
    this.storage.saveNum(this.lithiumChargeGenerators, 'lithiumChargeGenerators');
    this.storage.saveNum(this.lithiumCapacityUpgrades, 'lithiumCapacityUpgrades');
    this.storage.saveNum(this.lithiumCharge, 'lithiumCharge');
    this.storage.saveNum(this.lithiumBatteryTier, 'lithiumBatteryTier');
    this.storage.saveNum(this.berylliumRockets, 'berylliumRockets');
    this.storage.saveNum(this.berylliumFuelSystems, 'berylliumFuelSystems');
    this.storage.saveNum(this.berylliumLogicSystems, 'berylliumLogicSystems');
  }

  load(): void {
    this.unlocked = this.storage.load(this.unlocked, 'unlocked');
    this.activeParticle = this.storage.load(this.activeParticle, 'activeParticle');
    this.purchaseStates = this.storage.load({}, 'purchaseStates');
    this.lithiumBatteries = this.storage.loadNum(this.lithiumBatteries, 'lithiumBatteries');
    this.lithiumChargeGenerators = this.storage.loadNum(this.lithiumChargeGenerators, 'lithiumChargeGenerators');
    this.lithiumCapacityUpgrades = this.storage.loadNum(this.lithiumCapacityUpgrades, 'lithiumCapacityUpgrades');
    this.lithiumCharge = this.storage.loadNum(this.lithiumCharge, 'lithiumCharge');
    this.lithiumBatteryTier = this.storage.loadNum(this.lithiumBatteryTier, 'lithiumBatteryTier');
    this.berylliumRockets = this.storage.loadNum(this.berylliumRockets, 'berylliumRockets');
    this.berylliumFuelSystems = this.storage.loadNum(this.berylliumFuelSystems, 'berylliumFuelSystems');
    this.berylliumLogicSystems = this.storage.loadNum(this.berylliumLogicSystems, 'berylliumLogicSystems');
    this.synchronizePurchases();
    this.syncLithiumBatteryState();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    this.applyNeutronMeltdown();
  }

  init(): void {
    this.synchronizePurchases();
    this.syncLithiumBatteryState();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    this.applyNeutronMeltdown();
  }
}
