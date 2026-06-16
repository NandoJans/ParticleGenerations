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
import {LithiumHolding} from '../classes/features/holdings/blue-holdings';

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
  private readonly storage = new LocalStorageHelper('blue-phase', 'state');
  private purchaseStates: {[key: string]: boolean} = {};
  activeParticle: BlueParticleMode = 'none';
  unlocked = false;

  lithiumBatteries = Num.ZERO.copy();
  lithiumChargeGenerators = Num.ZERO.copy();
  lithiumCapacityUpgrades = Num.ZERO.copy();
  lithiumCharge = Num.ZERO.copy();
  berylliumModerators = Num.ZERO.copy();
  berylliumReflectors = Num.ZERO.copy();

  readonly elementDefinitions: BlueElementDefinition[] = [
    {requiredStage: 1, unlockAmount: new Num(1, 1), holding: HoldingRecord.lithium, theme: 'Lithium-ion batteries'},
    {requiredStage: 2, unlockAmount: new Num(1, 2), holding: HoldingRecord.beryllium, theme: 'Neutron moderators and reflectors'},
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

    this.detectFirstPurchases();
    const generation = this.getParticleGeneration().mul(speed);

    if (this.activeParticle === 'protons') {
      HoldingRecord.protons.generate(generation);
    } else if (this.activeParticle === 'electrons') {
      HoldingRecord.electrons.generate(generation);
    }

    this.generateForgedElements(speed);
    this.generateLithiumCharge(speed);
    LithiumHolding.batteryCharge = this.getLithiumTotalCharge();
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
    LithiumHolding.batteryCharge = this.getLithiumTotalCharge();
    this.applyNeutronMeltdown();
  }

  getParticleGeneration(): Num {
    let generation = new Num(1, -3);
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
      .mul(this.getBerylliumReflectorEffect())
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
    if (element.requiredStage === 1) return this.getLithiumGeneration();

    const previousElement = this.getPreviousElementDefinition(element);
    if (!previousElement) return Num.ZERO.copy();

    return previousElement.holding.amount.div(this.getElementCompressionRatio());
  }

  getElementCompressionRatio(): Num { return new Num(1, 1); }

  getLithiumGeneration(): Num {
    return HoldingRecord.neutronClump.amount
      .div(this.elementDefinitions[0].unlockAmount)
      .mul(new Num(1, -2))
      .mul(this.getBerylliumModeratorEffect());
  }

  getBerylliumModeratorCost(): Num { return new Num(5, 0).mul(new Num(2, 0).pow(this.berylliumModerators)); }
  getBerylliumReflectorCost(): Num { return new Num(1, 1).mul(new Num(2.5, 0).pow(this.berylliumReflectors)); }
  getBerylliumModeratorEffect(): Num { return this.berylliumModerators.mul(new Num(2.5, -1)).add(Num.ONE); }
  getBerylliumReflectorEffect(): Num { return this.berylliumReflectors.mul(new Num(5, -1)).add(Num.ONE); }
  canBuyBerylliumModerator(): boolean { return HoldingRecord.beryllium.amount.greq(this.getBerylliumModeratorCost()); }
  buyBerylliumModerator(): void { if (!this.canBuyBerylliumModerator()) return; HoldingRecord.beryllium.sub(this.getBerylliumModeratorCost()); this.berylliumModerators = this.berylliumModerators.add(Num.ONE); }
  canBuyBerylliumReflector(): boolean { return HoldingRecord.beryllium.amount.greq(this.getBerylliumReflectorCost()); }
  buyBerylliumReflector(): void { if (!this.canBuyBerylliumReflector()) return; HoldingRecord.beryllium.sub(this.getBerylliumReflectorCost()); this.berylliumReflectors = this.berylliumReflectors.add(Num.ONE); }

  private generateForgedElements(speed: Num): void {
    const lithiumDefinition = this.elementDefinitions[0];
    if (this.isElementUnlocked(lithiumDefinition)) {
      lithiumDefinition.holding.generate(this.getLithiumGeneration().mul(speed));
    }

    this.getActiveElementDefinitions()
      .filter(element => element.requiredStage > 1)
      .forEach(element => this.compressElement(element, speed));
  }

  private compressElement(element: BlueElementDefinition, speed: Num): void {
    const previousElement = this.getPreviousElementDefinition(element);
    if (!previousElement) return;

    const requestedOutput = this.getElementGeneration(element).mul(speed);
    const availableOutput = previousElement.holding.amount.div(this.getElementCompressionRatio());
    const output = requestedOutput.lt(availableOutput) ? requestedOutput : availableOutput;
    if (output.lt(Num.ZERO) || output.equals(Num.ZERO)) return;

    previousElement.holding.sub(output.mul(this.getElementCompressionRatio()));
    element.holding.generate(output);
  }

  private getPreviousElementDefinition(element: BlueElementDefinition): BlueElementDefinition | undefined {
    const index = this.elementDefinitions.indexOf(element);
    return index > 0 ? this.elementDefinitions[index - 1] : undefined;
  }

  getLithiumBatteryCost(): Num { return new Num(5, 0).mul(new Num(1.75, 0).pow(this.lithiumBatteries)); }
  getLithiumChargeGeneratorCost(): Num { return new Num(1, 1).mul(new Num(2, 0).pow(this.lithiumChargeGenerators)); }
  getLithiumCapacityCost(): Num { return new Num(1, 1).mul(new Num(2.25, 0).pow(this.lithiumCapacityUpgrades)); }
  getLithiumBatteryCapacity(): Num { return new Num(1, 2).mul(new Num(1.6, 0).pow(this.lithiumCapacityUpgrades)); }
  getLithiumTotalCapacity(): Num { return this.lithiumBatteries.mul(this.getLithiumBatteryCapacity()); }
  getLithiumTotalCharge(): Num { return this.lithiumCharge.lt(this.getLithiumTotalCapacity()) ? this.lithiumCharge : this.getLithiumTotalCapacity(); }

  canBuyLithiumBattery(): boolean { return HoldingRecord.lithium.amount.greq(this.getLithiumBatteryCost()); }
  buyLithiumBattery(): void { if (!this.canBuyLithiumBattery()) return; HoldingRecord.lithium.sub(this.getLithiumBatteryCost()); this.lithiumBatteries = this.lithiumBatteries.add(Num.ONE); }
  canBuyLithiumChargeGenerator(): boolean { return HoldingRecord.electrons.amount.greq(this.getLithiumChargeGeneratorCost()); }
  buyLithiumChargeGenerator(): void { if (!this.canBuyLithiumChargeGenerator()) return; HoldingRecord.electrons.sub(this.getLithiumChargeGeneratorCost()); this.lithiumChargeGenerators = this.lithiumChargeGenerators.add(Num.ONE); }
  canBuyLithiumCapacityUpgrade(): boolean { return HoldingRecord.protons.amount.greq(this.getLithiumCapacityCost()); }
  buyLithiumCapacityUpgrade(): void { if (!this.canBuyLithiumCapacityUpgrade()) return; HoldingRecord.protons.sub(this.getLithiumCapacityCost()); this.lithiumCapacityUpgrades = this.lithiumCapacityUpgrades.add(Num.ONE); }

  private generateLithiumCharge(speed: Num): void {
    if (this.lithiumChargeGenerators.lt(Num.ONE) || this.lithiumBatteries.lt(Num.ONE)) return;
    const gain = this.lithiumChargeGenerators.mul(new Num(5, 0)).mul(speed);
    this.lithiumCharge = this.lithiumCharge.add(gain);
    const capacity = this.getLithiumTotalCapacity();
    if (this.lithiumCharge.gt(capacity)) this.lithiumCharge = capacity.copy();
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

  private detectFirstPurchases(): void {
    this.getBuyables().forEach(({key, buyable}) => {
      const bought = buyable.hasBought();
      if (bought && !this.purchaseStates[key]) {
        this.toggleParticle();
      }
      this.purchaseStates[key] = bought;
    });
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
      this.purchaseStates[key] = buyable.hasBought();
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
    this.storage.saveNum(this.berylliumModerators, 'berylliumModerators');
    this.storage.saveNum(this.berylliumReflectors, 'berylliumReflectors');
  }

  load(): void {
    this.unlocked = this.storage.load(this.unlocked, 'unlocked');
    this.activeParticle = this.storage.load(this.activeParticle, 'activeParticle');
    this.purchaseStates = this.storage.load({}, 'purchaseStates');
    this.lithiumBatteries = this.storage.loadNum(this.lithiumBatteries, 'lithiumBatteries');
    this.lithiumChargeGenerators = this.storage.loadNum(this.lithiumChargeGenerators, 'lithiumChargeGenerators');
    this.lithiumCapacityUpgrades = this.storage.loadNum(this.lithiumCapacityUpgrades, 'lithiumCapacityUpgrades');
    this.lithiumCharge = this.storage.loadNum(this.lithiumCharge, 'lithiumCharge');
    this.berylliumModerators = this.storage.loadNum(this.berylliumModerators, 'berylliumModerators');
    this.berylliumReflectors = this.storage.loadNum(this.berylliumReflectors, 'berylliumReflectors');
    this.synchronizePurchases();
    LithiumHolding.batteryCharge = this.getLithiumTotalCharge();
    this.applyNeutronMeltdown();
  }

  init(): void {
    this.synchronizePurchases();
    LithiumHolding.batteryCharge = this.getLithiumTotalCharge();
    this.applyNeutronMeltdown();
  }
}
