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
import {BerylliumHolding, BoronHolding, CarbonHolding, LithiumHolding} from '../classes/features/holdings/blue-holdings';
import {BlueElement, ElementBatteryUpgrade, ElementCapacityUpgrade, ElementChargerUpgrade, ElementUpgrade, ElementUpgradeHost, ForgedBlueElement, LithiumElement} from '../classes/features/elements/blue-element';

export type BlueParticleMode = 'none' | 'protons' | 'electrons';

export interface BlueElementDefinition {
  requiredStage: number;
  unlockAmount: Num;
  holding: Holding;
  theme: string;
  element: BlueElement;
}

@Injectable({
  providedIn: 'root'
})
export class BluePhaseService implements ElementUpgradeHost {
  static readonly unlockRequirement = new Num(1, 1000);
  static readonly neutronRestorationTarget = new Num(1, 10);
  static readonly minimumMeltdownPower = new Num(1, -1);
  static readonly lithiumDischargeBaseCharge = new Num(1, 1);
  static readonly berylliumLaunchBaseThrust = new Num(1, 1);
  static readonly boronLaminateBaseStrength = new Num(1, 1);
  static readonly carbonLifeBurnBaseRate = new Num(1, 0);
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
  berylliumFuel = Num.ZERO.copy();
  berylliumLogicSystems = Num.ZERO.copy();
  berylliumRocketTier = Num.ZERO.copy();
  boronFiberSpools = Num.ZERO.copy();
  boronFiberglass = Num.ZERO.copy();
  boronResinInfusers = Num.ZERO.copy();
  boronWeaveLooms = Num.ZERO.copy();
  boronFiberglassTier = Num.ZERO.copy();
  carbonLandPlots = Num.ZERO.copy();
  carbonLandAreaUpgrades = Num.ZERO.copy();
  carbonLife = Num.ZERO.copy();
  carbonBurningLife = false;

  readonly elementDefinitions: BlueElementDefinition[] = [
    this.createElementDefinition(1, new Num(1, 1), HoldingRecord.lithium, 'Lithium-ion batteries', 'battery', true),
    this.createElementDefinition(2, new Num(1, 2), HoldingRecord.beryllium, 'Rocket construction and extension thrust', 'rocket'),
    this.createElementDefinition(3, new Num(1, 3), HoldingRecord.boron, 'Fiberglass accelerator reinforcement', 'composite'),
    this.createElementDefinition(4, new Num(1, 4), HoldingRecord.carbon, 'Life growth and biomass combustion', 'biosphere'),
    this.createElementDefinition(5, new Num(1, 5), HoldingRecord.nitrogen, 'Cryogenic atmospheres', 'cryo')
  ];

  constructor() {
    this.elementDefinitions.forEach(definition => definition.element.initializeUpgrades(this, HoldingRecord.protons, HoldingRecord.electrons));
    ResetHelper.registerResetListener('blue-phase-unlock', resetKey => {
      if (resetKey === ResetKey.BLUE) {
        this.unlockFromPrestige();
      }
    });
  }

  private createElementDefinition(requiredStage: number, unlockAmount: Num, holding: Holding, theme: string, componentName: string, usesSharedUpgrades = false): BlueElementDefinition {
    const element = usesSharedUpgrades
      ? new LithiumElement(holding, theme, componentName)
      : new ForgedBlueElement(holding, theme, componentName);

    return {requiredStage, unlockAmount, holding, theme, element};
  }

  getSelectedElementUpgradeSet(element: BlueElementDefinition): BlueElement {
    return element.element;
  }

  getElementUpgradeCost(upgrade: ElementUpgrade): Num {
    if (upgrade instanceof ElementBatteryUpgrade) return upgrade.baseCost.mul(new Num(1.75, 0).pow(upgrade.bought));
    if (upgrade instanceof ElementChargerUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    if (upgrade instanceof ElementCapacityUpgrade) return upgrade.baseCost.mul(new Num(2.25, 0).pow(upgrade.bought));
    return upgrade.baseCost.copy();
  }

  canBuyElementUpgrade(element: BlueElement, upgrade: ElementUpgrade): boolean {
    const definition = this.elementDefinitions.find(entry => entry.element === element);
    return !!definition && element.hasSharedUpgrades && this.isElementUnlocked(definition) && upgrade.currency.amount.greq(this.getElementUpgradeCost(upgrade));
  }

  buyElementUpgrade(element: BlueElement, upgrade: ElementUpgrade): void {
    if (!this.canBuyElementUpgrade(element, upgrade)) return;
    upgrade.currency.sub(this.getElementUpgradeCost(upgrade));
    upgrade.bought = upgrade.bought.add(Num.ONE);
    upgrade.amount = upgrade.bought.copy();
    this.toggleParticle();
    this.syncLithiumLegacyFromElement(element);
    this.syncLithiumBatteryState();
  }

  private syncLithiumLegacyFromElement(element: BlueElement): void {
    if (element !== this.elementDefinitions[0].element) return;
    this.lithiumBatteries = element.batteryUpgrade.bought.copy();
    this.lithiumChargeGenerators = element.chargerUpgrade.bought.copy();
    this.lithiumCapacityUpgrades = element.capacityUpgrade.bought.copy();
    this.lithiumCharge = element.batteryCharge.amount.copy();
    this.lithiumBatteryTier = element.batteryTier.amount.copy();
  }

  private syncLithiumElementFromLegacy(): void {
    const lithium = this.elementDefinitions[0].element;
    lithium.batteryUpgrade.bought = this.lithiumBatteries.copy();
    lithium.batteryUpgrade.amount = this.lithiumBatteries.copy();
    lithium.chargerUpgrade.bought = this.lithiumChargeGenerators.copy();
    lithium.chargerUpgrade.amount = this.lithiumChargeGenerators.copy();
    lithium.capacityUpgrade.bought = this.lithiumCapacityUpgrades.copy();
    lithium.capacityUpgrade.amount = this.lithiumCapacityUpgrades.copy();
    lithium.batteryCharge.amount = this.lithiumCharge.copy();
    lithium.batteryTier.amount = this.lithiumBatteryTier.copy();
  }

  getElementChargePercent(element: BlueElement): number {
    const capacity = element.getTotalCapacity().toNumber();
    if (!Number.isFinite(capacity) || capacity <= 0) return 0;

    return Math.max(0, Math.min(100, (element.getTotalCharge().toNumber() / capacity) * 100));
  }

  canDischargeElementBattery(element: BlueElement): boolean { return element.hasSharedUpgrades && element.getTotalCharge().greq(element.getDischargeThreshold()); }
  dischargeElementBattery(element: BlueElement): void {
    if (!this.canDischargeElementBattery(element)) return;
    element.batteryTier.amount = element.batteryTier.amount.add(Num.ONE);
    element.holding.amount = Num.ZERO.copy();
    element.batteryUpgrade.bought = Num.ZERO.copy();
    element.batteryUpgrade.amount = Num.ZERO.copy();
    element.chargerUpgrade.bought = Num.ZERO.copy();
    element.chargerUpgrade.amount = Num.ZERO.copy();
    element.capacityUpgrade.bought = Num.ZERO.copy();
    element.capacityUpgrade.amount = Num.ZERO.copy();
    element.batteryCharge.amount = Num.ZERO.copy();
    this.syncLithiumBatteryState();
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
    this.generateElementCharges(speed);
    this.generateCarbonLife(speed);
    this.burnCarbonLife(speed);
    this.generateBerylliumFuel(speed);
    this.generateBoronFiberglass(speed);
    this.syncLithiumBatteryState();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
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
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
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
  getBerylliumFuelCost(): Num { return new Num(1, 3).mul(new Num(2, 0).pow(this.berylliumFuelSystems)); }
  getBerylliumLogicCost(): Num { return new Num(1, 3).mul(new Num(2, 0).pow(this.berylliumLogicSystems)); }
  getBerylliumFuelCapacity(): Num { return new Num(2, 0).pow(this.berylliumRockets).mul(new Num(1, 2)); }
  getBerylliumTotalFuel(): Num { return this.berylliumFuel.lt(this.getBerylliumFuelCapacity()) ? this.berylliumFuel : this.getBerylliumFuelCapacity(); }
  getBerylliumFuelEffect(): Num { return this.getBerylliumTotalFuel().add(Num.ONE); }
  getBerylliumLogicEffect(): Num { return this.berylliumLogicSystems.mul(new Num(1.5, -1)).add(Num.ONE); }
  getBerylliumRocketBaseEffect(): Num {
    return Num.ONE.add(this.getBerylliumTotalFuel().mul(this.getBerylliumLogicEffect()));
  }
  getBerylliumRocketEffect(): Num { return this.getBerylliumRocketBaseEffect().pow(this.getBerylliumRocketTierEffect()); }
  getBerylliumLaunchThreshold(): Num { return BluePhaseService.berylliumLaunchBaseThrust.pow(this.berylliumRocketTier).mul(new Num(1, 4)); }
  getBerylliumRocketTierEffect(): Num { return Num.TWO.pow(this.berylliumRocketTier); }
  canLaunchBerylliumRockets(): boolean { return this.getBerylliumRocketBaseEffect().greq(this.getBerylliumLaunchThreshold()); }
  launchBerylliumRockets(): void {
    if (!this.canLaunchBerylliumRockets()) return;

    this.berylliumRocketTier = this.berylliumRocketTier.add(Num.ONE);
    HoldingRecord.beryllium.amount = Num.ZERO.copy();
    this.berylliumRockets = Num.ZERO.copy();
    this.berylliumFuelSystems = Num.ZERO.copy();
    this.berylliumFuel = Num.ZERO.copy();
    this.berylliumLogicSystems = Num.ZERO.copy();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
  }
  isLithiumUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[0]); }
  isBerylliumUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[1]); }
  isBoronUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[2]); }
  isCarbonUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[3]); }
  getBoronFiberCost(): Num { return new Num(5, 0).mul(new Num(2.1, 0).pow(this.boronFiberSpools)); }
  getBoronResinCost(): Num { return new Num(1, 5).mul(new Num(2, 0).pow(this.boronResinInfusers)); }
  getBoronWeaveCost(): Num { return new Num(1, 5).mul(new Num(2, 0).pow(this.boronWeaveLooms)); }
  getBoronResinEffect(): Num { return this.boronResinInfusers.mul(new Num(2, -1)).add(Num.ONE); }
  getBoronWeaveEffect(): Num { return this.boronWeaveLooms.mul(new Num(1.5, -1)).add(Num.ONE); }
  getBoronFiberglassCapacity(): Num { return new Num(2, 0).pow(this.boronFiberSpools).mul(new Num(1, 2)); }
  getBoronTotalFiberglass(): Num { return this.boronFiberglass.lt(this.getBoronFiberglassCapacity()) ? this.boronFiberglass : this.getBoronFiberglassCapacity(); }
  getBoronFiberglassBaseEffect(): Num {
    return this.getBoronTotalFiberglass()
      .add(Num.ONE)
      .mul(this.getBoronResinEffect())
      .mul(this.getBoronWeaveEffect())
      .pow(new Num(2.5, 0));
  }
  getBoronFiberglassEffect(): Num { return this.getBoronFiberglassBaseEffect().pow(this.getBoronFiberglassTierEffect()); }
  getBoronLaminateThreshold(): Num { return BluePhaseService.boronLaminateBaseStrength.pow(this.boronFiberglassTier).mul(new Num(1, 4)); }
  getBoronFiberglassTierEffect(): Num { return Num.TWO.pow(this.boronFiberglassTier); }
  canLaminateBoronFiberglass(): boolean { return this.getBoronFiberglassBaseEffect().greq(this.getBoronLaminateThreshold()); }
  laminateBoronFiberglass(): void {
    if (!this.canLaminateBoronFiberglass()) return;

    this.boronFiberglassTier = this.boronFiberglassTier.add(Num.ONE);
    HoldingRecord.boron.amount = Num.ZERO.copy();
    this.boronFiberSpools = Num.ZERO.copy();
    this.boronFiberglass = Num.ZERO.copy();
    this.boronResinInfusers = Num.ZERO.copy();
    this.boronWeaveLooms = Num.ZERO.copy();
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
  }
  canBuyBoronFiber(): boolean { return this.isBoronUnlocked() && HoldingRecord.boron.amount.greq(this.getBoronFiberCost()); }
  buyBoronFiber(): void { if (!this.canBuyBoronFiber()) return; HoldingRecord.boron.sub(this.getBoronFiberCost()); this.boronFiberSpools = this.boronFiberSpools.add(Num.ONE); this.toggleParticle(); BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect(); }
  canBuyBoronResin(): boolean { return this.isBoronUnlocked() && HoldingRecord.protons.amount.greq(this.getBoronResinCost()); }
  buyBoronResin(): void { if (!this.canBuyBoronResin()) return; HoldingRecord.protons.sub(this.getBoronResinCost()); this.boronResinInfusers = this.boronResinInfusers.add(Num.ONE); this.toggleParticle(); BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect(); }
  canBuyBoronWeave(): boolean { return this.isBoronUnlocked() && HoldingRecord.electrons.amount.greq(this.getBoronWeaveCost()); }
  buyBoronWeave(): void { if (!this.canBuyBoronWeave()) return; HoldingRecord.electrons.sub(this.getBoronWeaveCost()); this.boronWeaveLooms = this.boronWeaveLooms.add(Num.ONE); this.toggleParticle(); BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect(); }

  getCarbonLandCost(): Num { return new Num(5, 0).mul(new Num(2.4, 0).pow(this.carbonLandPlots)); }
  getCarbonLandAreaCost(): Num { return new Num(2.5, 1).mul(new Num(2.2, 0).pow(this.carbonLandAreaUpgrades)); }
  getCarbonLandArea(): Num { return this.carbonLandPlots.mul(this.carbonLandAreaUpgrades.add(Num.ONE)); }
  getCarbonLifeGeneration(): Num {
    if (!this.isCarbonUnlocked() || this.carbonBurningLife) return Num.ZERO.copy();

    return this.getCarbonLandArea()
      .mul(HoldingRecord.carbon.amount.add(Num.ONE).log10().add(Num.ONE))
      .mul(new Num(1, -1));
  }
  getCarbonLifeEffect(): Num { return this.carbonLife.add(Num.ONE).log10().mul(new Num(2, -2)).add(Num.ONE); }
  getCarbonBurnChargeMultiplier(): Num { return this.getCarbonLifeEffect().mul(new Num(1, 1)); }
  canBuyCarbonLand(): boolean { return this.isCarbonUnlocked() && HoldingRecord.protons.amount.greq(this.getCarbonLandCost()); }
  buyCarbonLand(): void { if (!this.canBuyCarbonLand()) return; HoldingRecord.protons.sub(this.getCarbonLandCost()); this.carbonLandPlots = this.carbonLandPlots.add(Num.ONE); this.toggleParticle(); }
  canBuyCarbonLandArea(): boolean { return this.isCarbonUnlocked() && HoldingRecord.electrons.amount.greq(this.getCarbonLandAreaCost()); }
  buyCarbonLandArea(): void { if (!this.canBuyCarbonLandArea()) return; HoldingRecord.electrons.sub(this.getCarbonLandAreaCost()); this.carbonLandAreaUpgrades = this.carbonLandAreaUpgrades.add(Num.ONE); this.toggleParticle(); }
  canToggleCarbonBurn(): boolean { return this.isCarbonUnlocked() && this.carbonLife.gt(Num.ZERO) && this.getLithiumTotalCharge().lt(this.getLithiumTotalCapacity()); }
  toggleCarbonBurn(): void {
    if (this.carbonBurningLife) {
      this.carbonBurningLife = false;
      return;
    }

    if (this.canToggleCarbonBurn()) this.carbonBurningLife = true;
  }

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

  getLithiumBatteryCost(): Num { return this.getElementUpgradeCost(this.elementDefinitions[0].element.batteryUpgrade); }
  getLithiumChargeGeneratorCost(): Num { return this.getElementUpgradeCost(this.elementDefinitions[0].element.chargerUpgrade); }
  getLithiumCapacityCost(): Num { return this.getElementUpgradeCost(this.elementDefinitions[0].element.capacityUpgrade); }
  getLithiumBatteryCapacity(): Num { return this.elementDefinitions[0].element.getChargeCapacity(); }
  getLithiumTotalCapacity(): Num { return this.elementDefinitions[0].element.getTotalCapacity(); }
  getLithiumTotalCharge(): Num { return this.elementDefinitions[0].element.getTotalCharge(); }
  getLithiumDischargeThreshold(): Num { return this.elementDefinitions[0].element.getDischargeThreshold(); }
  getLithiumBatteryTierEffect(): Num { return this.elementDefinitions[0].element.getTierEffect(); }
  canDischargeLithiumBattery(): boolean { return this.canDischargeElementBattery(this.elementDefinitions[0].element); }
  dischargeLithiumBattery(): void { this.dischargeElementBattery(this.elementDefinitions[0].element); }

  canBuyLithiumBattery(): boolean { return this.canBuyElementUpgrade(this.elementDefinitions[0].element, this.elementDefinitions[0].element.batteryUpgrade); }
  buyLithiumBattery(): void { this.buyElementUpgrade(this.elementDefinitions[0].element, this.elementDefinitions[0].element.batteryUpgrade); }
  canBuyLithiumChargeGenerator(): boolean { return this.canBuyElementUpgrade(this.elementDefinitions[0].element, this.elementDefinitions[0].element.chargerUpgrade); }
  buyLithiumChargeGenerator(): void { this.buyElementUpgrade(this.elementDefinitions[0].element, this.elementDefinitions[0].element.chargerUpgrade); }
  canBuyLithiumCapacityUpgrade(): boolean { return this.canBuyElementUpgrade(this.elementDefinitions[0].element, this.elementDefinitions[0].element.capacityUpgrade); }
  buyLithiumCapacityUpgrade(): void { this.buyElementUpgrade(this.elementDefinitions[0].element, this.elementDefinitions[0].element.capacityUpgrade); }

  private generateElementCharges(speed: Num): void {
    this.elementDefinitions.filter(definition => definition.element.hasSharedUpgrades).forEach(definition => {
      const element = definition.element;
      if (element.chargerUpgrade.bought.lt(Num.ONE) || element.batteryUpgrade.bought.lt(Num.ONE)) return;

      element.batteryCharge.amount = element.batteryCharge.amount.add(element.chargerUpgrade.bought.mul(new Num(5, 0)).mul(speed));
      const capacity = element.getTotalCapacity();
      if (element.batteryCharge.amount.gt(capacity)) element.batteryCharge.amount = capacity.copy();
    });
  }

  private generateLithiumCharge(speed: Num): void {
    if (this.lithiumChargeGenerators.lt(Num.ONE) || this.lithiumBatteries.lt(Num.ONE)) return;
    const gain = this.lithiumChargeGenerators.mul(new Num(5, 0)).mul(speed);
    this.lithiumCharge = this.lithiumCharge.add(gain);
    this.elementDefinitions[0].element.batteryCharge.amount = this.lithiumCharge.copy();
    const capacity = this.getLithiumTotalCapacity();
    if (this.lithiumCharge.gt(capacity)) this.lithiumCharge = capacity.copy();
    this.elementDefinitions[0].element.batteryCharge.amount = this.lithiumCharge.copy();
  }

  private generateCarbonLife(speed: Num): void {
    const gain = this.getCarbonLifeGeneration().mul(speed);
    if (gain.gt(Num.ZERO)) this.carbonLife = this.carbonLife.add(gain);
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
  }

  private burnCarbonLife(speed: Num): void {
    if (!this.carbonBurningLife) return;
    if (this.carbonLife.lte(Num.ZERO) || this.getLithiumTotalCharge().greq(this.getLithiumTotalCapacity())) {
      this.carbonBurningLife = false;
      return;
    }

    const burn = BluePhaseService.carbonLifeBurnBaseRate.mul(speed);
    const spent = this.carbonLife.lt(burn) ? this.carbonLife : burn;
    this.carbonLife = this.carbonLife.sub(spent);
    this.lithiumCharge = this.lithiumCharge.add(spent.mul(this.getCarbonBurnChargeMultiplier()));
    this.elementDefinitions[0].element.batteryCharge.amount = this.lithiumCharge.copy();

    const capacity = this.getLithiumTotalCapacity();
    if (this.lithiumCharge.greq(capacity)) {
      this.lithiumCharge = capacity.copy();
      this.carbonBurningLife = false;
    } else if (this.carbonLife.lte(Num.ZERO)) {
      this.carbonLife = Num.ZERO.copy();
      this.carbonBurningLife = false;
    }
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
  }

  private generateBerylliumFuel(speed: Num): void {
    if (this.berylliumFuelSystems.lt(Num.ONE) || this.berylliumRockets.lt(Num.ONE)) return;
    const gain = this.berylliumFuelSystems.mul(new Num(5, 0)).mul(speed);
    this.berylliumFuel = this.berylliumFuel.add(gain);
    const capacity = this.getBerylliumFuelCapacity();
    if (this.berylliumFuel.gt(capacity)) this.berylliumFuel = capacity.copy();
  }

  private generateBoronFiberglass(speed: Num): void {
    if (this.boronFiberSpools.lt(Num.ONE)) return;
    const gain = this.boronFiberSpools.mul(new Num(5, 0)).mul(speed);
    this.boronFiberglass = this.boronFiberglass.add(gain);
    const capacity = this.getBoronFiberglassCapacity();
    if (this.boronFiberglass.gt(capacity)) this.boronFiberglass = capacity.copy();
  }

  private syncLithiumBatteryState(): void {
    this.syncLithiumElementFromLegacy();
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
    this.storage.saveNum(this.berylliumFuel, 'berylliumFuel');
    this.storage.saveNum(this.berylliumLogicSystems, 'berylliumLogicSystems');
    this.storage.saveNum(this.berylliumRocketTier, 'berylliumRocketTier');
    this.storage.saveNum(this.boronFiberSpools, 'boronFiberSpools');
    this.storage.saveNum(this.boronFiberglass, 'boronFiberglass');
    this.storage.saveNum(this.boronResinInfusers, 'boronResinInfusers');
    this.storage.saveNum(this.boronWeaveLooms, 'boronWeaveLooms');
    this.storage.saveNum(this.boronFiberglassTier, 'boronFiberglassTier');
    this.storage.saveNum(this.carbonLandPlots, 'carbonLandPlots');
    this.storage.saveNum(this.carbonLandAreaUpgrades, 'carbonLandAreaUpgrades');
    this.storage.saveNum(this.carbonLife, 'carbonLife');
    this.storage.save(this.carbonBurningLife, 'carbonBurningLife');
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
    this.berylliumFuel = this.storage.loadNum(this.berylliumFuel, 'berylliumFuel');
    this.berylliumLogicSystems = this.storage.loadNum(this.berylliumLogicSystems, 'berylliumLogicSystems');
    this.berylliumRocketTier = this.storage.loadNum(this.berylliumRocketTier, 'berylliumRocketTier');
    this.boronFiberSpools = this.storage.loadNum(this.boronFiberSpools, 'boronFiberSpools');
    this.boronFiberglass = this.storage.loadNum(this.boronFiberglass, 'boronFiberglass');
    this.boronResinInfusers = this.storage.loadNum(this.boronResinInfusers, 'boronResinInfusers');
    this.boronWeaveLooms = this.storage.loadNum(this.boronWeaveLooms, 'boronWeaveLooms');
    this.boronFiberglassTier = this.storage.loadNum(this.boronFiberglassTier, 'boronFiberglassTier');
    this.carbonLandPlots = this.storage.loadNum(this.carbonLandPlots, 'carbonLandPlots');
    this.carbonLandAreaUpgrades = this.storage.loadNum(this.carbonLandAreaUpgrades, 'carbonLandAreaUpgrades');
    this.carbonLife = this.storage.loadNum(this.carbonLife, 'carbonLife');
    this.carbonBurningLife = this.storage.load(this.carbonBurningLife, 'carbonBurningLife');
    this.synchronizePurchases();
    this.syncLithiumBatteryState();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
    this.applyNeutronMeltdown();
  }

  init(): void {
    this.synchronizePurchases();
    this.syncLithiumBatteryState();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
    this.applyNeutronMeltdown();
  }
}
