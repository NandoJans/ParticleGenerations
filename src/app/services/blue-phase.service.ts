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
import {BerylliumElement, BerylliumFuelUpgrade, BerylliumLogicUpgrade, BerylliumRocketUpgrade, BlueElement, BoronElement, BoronFiberUpgrade, BoronResinUpgrade, BoronWeaveUpgrade, CarbonElement, CarbonLandAreaUpgrade, CarbonLandUpgrade, ElementBatteryUpgrade, ElementCapacityUpgrade, ElementChargerUpgrade, ElementUpgrade, ElementUpgradeHost, ForgedBlueElement, LithiumElement, OxygenCombustionUpgrade, OxygenElement} from '../classes/features/elements/blue-element';

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
  oxygenCombustionUpgrades = Num.ZERO.copy();
  oxygenBurningLife = false;

  readonly elementDefinitions: BlueElementDefinition[] = [
    this.createElementDefinition(1, new Num(1, 1), HoldingRecord.lithium, 'Lithium-ion batteries', 'battery'),
    this.createElementDefinition(2, new Num(1, 2), HoldingRecord.beryllium, 'Rocket construction and extension thrust', 'rocket'),
    this.createElementDefinition(3, new Num(1, 3), HoldingRecord.boron, 'Fiberglass accelerator reinforcement', 'composite'),
    this.createElementDefinition(4, new Num(1, 4), HoldingRecord.carbon, 'Life growth and biomass accumulation', 'biosphere'),
    this.createElementDefinition(5, new Num(1, 5), HoldingRecord.nitrogen, 'Cryogenic atmospheres', 'cryo'),
    this.createElementDefinition(6, new Num(1, 6), HoldingRecord.oxygen, 'Life combustion and stored charge', 'combustion')
  ];

  constructor() {
    this.elementDefinitions.forEach(definition => definition.element.initializeUpgrades(this, HoldingRecord.protons, HoldingRecord.electrons));
    ResetHelper.registerResetListener('blue-phase-unlock', resetKey => {
      if (resetKey === ResetKey.BLUE) {
        this.unlockFromPrestige();
      }
    });
  }

  private createElementDefinition(requiredStage: number, unlockAmount: Num, holding: Holding, theme: string, componentName: string): BlueElementDefinition {
    let element: BlueElement;
    switch (holding) {
      case HoldingRecord.lithium:
        element = new LithiumElement(holding, theme, componentName);
        break;
      case HoldingRecord.beryllium:
        element = new BerylliumElement(holding, theme, componentName);
        break;
      case HoldingRecord.boron:
        element = new BoronElement(holding, theme, componentName);
        break;
      case HoldingRecord.carbon:
        element = new CarbonElement(holding, theme, componentName);
        break;
      case HoldingRecord.oxygen:
        element = new OxygenElement(holding, theme, componentName);
        break;
      default:
        element = new ForgedBlueElement(holding, theme, componentName);
        break;
    }

    return {requiredStage, unlockAmount, holding, theme, element};
  }

  getSelectedElementUpgradeSet(element: BlueElementDefinition): BlueElement {
    return element.element;
  }

  private get lithiumElement(): LithiumElement { return this.elementDefinitions[0].element as LithiumElement; }
  private get berylliumElement(): BerylliumElement { return this.elementDefinitions[1].element as BerylliumElement; }
  private get boronElement(): BoronElement { return this.elementDefinitions[2].element as BoronElement; }
  private get carbonElement(): CarbonElement { return this.elementDefinitions[3].element as CarbonElement; }
  private get oxygenElement(): OxygenElement { return this.elementDefinitions[5].element as OxygenElement; }

  getElementUpgradeCost(upgrade: ElementUpgrade): Num {
    if (upgrade instanceof ElementBatteryUpgrade) return upgrade.baseCost.mul(new Num(1.75, 0).pow(upgrade.bought));
    if (upgrade instanceof ElementChargerUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    if (upgrade instanceof ElementCapacityUpgrade) return upgrade.baseCost.mul(new Num(2.25, 0).pow(upgrade.bought));
    if (upgrade instanceof BerylliumRocketUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    if (upgrade instanceof BerylliumFuelUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    if (upgrade instanceof BerylliumLogicUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    if (upgrade instanceof BoronFiberUpgrade) return upgrade.baseCost.mul(new Num(2.1, 0).pow(upgrade.bought));
    if (upgrade instanceof BoronResinUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    if (upgrade instanceof BoronWeaveUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    if (upgrade instanceof CarbonLandUpgrade) return upgrade.baseCost.mul(new Num(2.4, 0).pow(upgrade.bought));
    if (upgrade instanceof CarbonLandAreaUpgrade) return upgrade.baseCost.mul(new Num(2.2, 0).pow(upgrade.bought));
    if (upgrade instanceof OxygenCombustionUpgrade) return upgrade.baseCost.mul(new Num(2, 0).pow(upgrade.bought));
    return upgrade.baseCost.copy();
  }

  canBuyElementUpgrade(element: BlueElement, upgrade: ElementUpgrade): boolean {
    const definition = this.elementDefinitions.find(entry => entry.element === element);
    return !!definition && element.getUpgrades().includes(upgrade) && this.isElementUnlocked(definition) && upgrade.currency.amount.greq(this.getElementUpgradeCost(upgrade));
  }

  buyElementUpgrade(element: BlueElement, upgrade: ElementUpgrade): void {
    if (!this.canBuyElementUpgrade(element, upgrade)) return;
    upgrade.currency.sub(this.getElementUpgradeCost(upgrade));
    upgrade.bought = upgrade.bought.add(Num.ONE);
    upgrade.amount = upgrade.bought.copy();
    this.toggleParticle();
    this.syncElementLegacyFromUpgrade(element, upgrade);
    this.syncLithiumBatteryState();
  }

  private syncLithiumLegacyFromElement(element: BlueElement): void {
    if (element !== this.lithiumElement) return;
    this.lithiumBatteries = this.lithiumElement.batteryUpgrade.bought.copy();
    this.lithiumChargeGenerators = this.lithiumElement.chargerUpgrade.bought.copy();
    this.lithiumCapacityUpgrades = this.lithiumElement.capacityUpgrade.bought.copy();
    this.lithiumCharge = this.lithiumElement.batteryCharge.amount.copy();
    this.lithiumBatteryTier = this.lithiumElement.batteryTier.amount.copy();
  }
  private syncElementLegacyFromUpgrade(element: BlueElement, upgrade: ElementUpgrade): void {
    this.syncLithiumLegacyFromElement(element);

    if (element instanceof BerylliumElement) {
      if (upgrade === element.rocketUpgrade) this.berylliumRockets = upgrade.bought.copy();
      if (upgrade === element.fuelUpgrade) this.berylliumFuelSystems = upgrade.bought.copy();
      if (upgrade === element.logicUpgrade) this.berylliumLogicSystems = upgrade.bought.copy();
      BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    } else if (element instanceof BoronElement) {
      if (upgrade === element.fiberUpgrade) this.boronFiberSpools = upgrade.bought.copy();
      if (upgrade === element.resinUpgrade) this.boronResinInfusers = upgrade.bought.copy();
      if (upgrade === element.weaveUpgrade) this.boronWeaveLooms = upgrade.bought.copy();
      BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    } else if (element instanceof CarbonElement) {
      if (upgrade === element.landUpgrade) this.carbonLandPlots = upgrade.bought.copy();
      if (upgrade === element.landAreaUpgrade) this.carbonLandAreaUpgrades = upgrade.bought.copy();
    } else if (element instanceof OxygenElement) {
      if (upgrade === element.combustionUpgrade) this.oxygenCombustionUpgrades = upgrade.bought.copy();
    }
  }

  private syncElementUpgradesFromLegacy(): void {
    this.setElementUpgradeAmount(this.berylliumElement.rocketUpgrade, this.berylliumRockets);
    this.setElementUpgradeAmount(this.berylliumElement.fuelUpgrade, this.berylliumFuelSystems);
    this.setElementUpgradeAmount(this.berylliumElement.logicUpgrade, this.berylliumLogicSystems);
    this.setElementUpgradeAmount(this.boronElement.fiberUpgrade, this.boronFiberSpools);
    this.setElementUpgradeAmount(this.boronElement.resinUpgrade, this.boronResinInfusers);
    this.setElementUpgradeAmount(this.boronElement.weaveUpgrade, this.boronWeaveLooms);
    this.setElementUpgradeAmount(this.carbonElement.landUpgrade, this.carbonLandPlots);
    this.setElementUpgradeAmount(this.carbonElement.landAreaUpgrade, this.carbonLandAreaUpgrades);
    this.setElementUpgradeAmount(this.oxygenElement.combustionUpgrade, this.oxygenCombustionUpgrades);
  }

  private setElementUpgradeAmount(upgrade: ElementUpgrade, amount: Num): void {
    upgrade.bought = amount.copy();
    upgrade.amount = amount.copy();
  }


  private syncLithiumElementFromLegacy(): void {
    const lithium = this.lithiumElement;
    lithium.batteryUpgrade.bought = this.lithiumBatteries.copy();
    lithium.batteryUpgrade.amount = this.lithiumBatteries.copy();
    lithium.chargerUpgrade.bought = this.lithiumChargeGenerators.copy();
    lithium.chargerUpgrade.amount = this.lithiumChargeGenerators.copy();
    lithium.capacityUpgrade.bought = this.lithiumCapacityUpgrades.copy();
    lithium.capacityUpgrade.amount = this.lithiumCapacityUpgrades.copy();
    lithium.batteryCharge.amount = this.lithiumCharge.copy();
    lithium.batteryTier.amount = this.lithiumBatteryTier.copy();
  }

  getElementChargePercent(element: LithiumElement): number {
    const capacity = element.getTotalCapacity().toNumber();
    if (!Number.isFinite(capacity) || capacity <= 0) return 0;

    return Math.max(0, Math.min(100, (element.getTotalCharge().toNumber() / capacity) * 100));
  }

  canDischargeElementBattery(element: BlueElement): boolean { return element instanceof LithiumElement && element.getTotalCharge().greq(element.getDischargeThreshold()); }
  dischargeElementBattery(element: BlueElement): void {
    if (!this.canDischargeElementBattery(element) || !(element instanceof LithiumElement)) return;
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
    this.burnLifeWithOxygen(speed);
    this.generateBerylliumFuel(speed);
    this.generateBoronFiberglass(speed);
    this.syncLithiumBatteryState();
    this.syncElementUpgradesFromLegacy();
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
    this.syncElementUpgradesFromLegacy();
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

  mergeLegacyNeutronClump(): void {
    if (HoldingRecord.neutronClump.amount.lt(Num.ONE)) return;
    HoldingRecord.neutrons.add(HoldingRecord.neutronClump.amount);
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
  }

  getNeutronStage(): number {
    if (HoldingRecord.neutrons.amount.lt(new Num(1, 1))) return 0;
    return Math.max(0, Math.floor(HoldingRecord.neutrons.amount.log10().toNumber()));
  }

  getActiveElementDefinitions(): BlueElementDefinition[] {
    return this.elementDefinitions.filter(element => this.isElementUnlocked(element));
  }

  isElementUnlocked(element: BlueElementDefinition): boolean {
    return HoldingRecord.neutrons.amount.greq(element.unlockAmount);
  }

  getCurrentElementName(): string {
    const activeElements = this.getActiveElementDefinitions();
    return activeElements.length > 0
      ? activeElements.map(element => element.holding.displayName).join(', ')
      : 'No element';
  }

  getNextStageRequirement(): Num {
    return new Num(1, this.getNeutronStage() + 1);
  }

  getElementGeneration(element: BlueElementDefinition): Num {
    if (!this.isElementUnlocked(element)) return Num.ZERO.copy();
    return HoldingRecord.neutrons.amount
      .div(element.unlockAmount)
      .mul(new Num(1, -2));
  }

  getLithiumGeneration(): Num {
    return this.getElementGeneration(this.elementDefinitions[0]);
  }

  getBerylliumRocketCost(): Num { return this.getElementUpgradeCost(this.berylliumElement.rocketUpgrade); }
  getBerylliumFuelCost(): Num { return this.getElementUpgradeCost(this.berylliumElement.fuelUpgrade); }
  getBerylliumLogicCost(): Num { return this.getElementUpgradeCost(this.berylliumElement.logicUpgrade); }
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
    this.syncElementUpgradesFromLegacy();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
  }
  isLithiumUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[0]); }
  isBerylliumUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[1]); }
  isBoronUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[2]); }
  isCarbonUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[3]); }
  isOxygenUnlocked(): boolean { return this.isElementUnlocked(this.elementDefinitions[5]); }
  getBoronFiberCost(): Num { return this.getElementUpgradeCost(this.boronElement.fiberUpgrade); }
  getBoronResinCost(): Num { return this.getElementUpgradeCost(this.boronElement.resinUpgrade); }
  getBoronWeaveCost(): Num { return this.getElementUpgradeCost(this.boronElement.weaveUpgrade); }
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
  canLaminateBoronFiberglass(): boolean { return this.boronFiberSpools.greq(this.getBoronLaminateThreshold()); }
  laminateBoronFiberglass(): void {
    if (!this.canLaminateBoronFiberglass()) return;

    this.boronFiberglassTier = this.boronFiberglassTier.add(Num.ONE);
    HoldingRecord.boron.amount = Num.ZERO.copy();
    this.boronFiberSpools = Num.ZERO.copy();
    this.boronFiberglass = Num.ZERO.copy();
    this.boronResinInfusers = Num.ZERO.copy();
    this.boronWeaveLooms = Num.ZERO.copy();
    this.syncElementUpgradesFromLegacy();
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
  }
  canBuyBoronFiber(): boolean { return this.canBuyElementUpgrade(this.boronElement, this.boronElement.fiberUpgrade); }
  buyBoronFiber(): void { this.buyElementUpgrade(this.boronElement, this.boronElement.fiberUpgrade); }
  canBuyBoronResin(): boolean { return this.canBuyElementUpgrade(this.boronElement, this.boronElement.resinUpgrade); }
  buyBoronResin(): void { this.buyElementUpgrade(this.boronElement, this.boronElement.resinUpgrade); }
  canBuyBoronWeave(): boolean { return this.canBuyElementUpgrade(this.boronElement, this.boronElement.weaveUpgrade); }
  buyBoronWeave(): void { this.buyElementUpgrade(this.boronElement, this.boronElement.weaveUpgrade); }

  getCarbonLandCost(): Num { return this.getElementUpgradeCost(this.carbonElement.landUpgrade); }
  getCarbonLandAreaCost(): Num { return this.getElementUpgradeCost(this.carbonElement.landAreaUpgrade); }
  getCarbonLandArea(): Num { return this.carbonLandPlots.mul(this.carbonLandAreaUpgrades.add(Num.ONE)); }
  getCarbonLifeGeneration(): Num {
    if (!this.isCarbonUnlocked() || this.oxygenBurningLife) return Num.ZERO.copy();

    return this.getCarbonLandArea()
      .mul(HoldingRecord.carbon.amount.add(Num.ONE).log10().add(Num.ONE))
      .mul(new Num(1, -1));
  }
  getCarbonLifeEffect(): Num { return this.carbonLife.add(Num.ONE).log10().mul(new Num(2, -2)).add(Num.ONE); }
  get carbonBurningLife(): boolean { return this.oxygenBurningLife; }
  set carbonBurningLife(value: boolean) { this.oxygenBurningLife = value; }
  getCarbonBurnChargeMultiplier(): Num { return this.getOxygenBurnChargeMultiplier(); }

  getOxygenCombustionCost(): Num { return this.getElementUpgradeCost(this.oxygenElement.combustionUpgrade); }
  getOxygenCombustionEffect(): Num { return this.oxygenCombustionUpgrades.add(Num.ONE).mul(HoldingRecord.oxygen.amount.add(Num.ONE).log10().add(Num.ONE)); }
  getOxygenBurnChargeMultiplier(): Num { return this.getCarbonLifeEffect().mul(new Num(1, 1)).mul(this.getOxygenCombustionEffect()); }
  canBuyCarbonLand(): boolean { return this.canBuyElementUpgrade(this.carbonElement, this.carbonElement.landUpgrade); }
  buyCarbonLand(): void { this.buyElementUpgrade(this.carbonElement, this.carbonElement.landUpgrade); }
  canBuyCarbonLandArea(): boolean { return this.canBuyElementUpgrade(this.carbonElement, this.carbonElement.landAreaUpgrade); }
  buyCarbonLandArea(): void { this.buyElementUpgrade(this.carbonElement, this.carbonElement.landAreaUpgrade); }
  canToggleCarbonBurn(): boolean { return this.canToggleOxygenBurn(); }
  toggleCarbonBurn(): void { this.toggleOxygenBurn(); }

  canBuyOxygenCombustion(): boolean { return this.canBuyElementUpgrade(this.oxygenElement, this.oxygenElement.combustionUpgrade); }
  buyOxygenCombustion(): void { this.buyElementUpgrade(this.oxygenElement, this.oxygenElement.combustionUpgrade); }
  canToggleOxygenBurn(): boolean { return this.isOxygenUnlocked() && this.oxygenCombustionUpgrades.gt(Num.ZERO) && this.carbonLife.gt(Num.ZERO) && this.getLithiumTotalCharge().lt(this.getLithiumTotalCapacity()); }
  toggleOxygenBurn(): void {
    if (this.oxygenBurningLife) {
      this.oxygenBurningLife = false;
      return;
    }

    if (this.canToggleOxygenBurn()) this.oxygenBurningLife = true;
  }

  canBuyBerylliumRocket(): boolean { return this.canBuyElementUpgrade(this.berylliumElement, this.berylliumElement.rocketUpgrade); }
  buyBerylliumRocket(): void { this.buyElementUpgrade(this.berylliumElement, this.berylliumElement.rocketUpgrade); }
  canBuyBerylliumFuel(): boolean { return this.canBuyElementUpgrade(this.berylliumElement, this.berylliumElement.fuelUpgrade); }
  buyBerylliumFuel(): void { this.buyElementUpgrade(this.berylliumElement, this.berylliumElement.fuelUpgrade); }
  canBuyBerylliumLogic(): boolean { return this.canBuyElementUpgrade(this.berylliumElement, this.berylliumElement.logicUpgrade); }
  buyBerylliumLogic(): void { this.buyElementUpgrade(this.berylliumElement, this.berylliumElement.logicUpgrade); }

  private generateForgedElements(speed: Num): void {
    this.getActiveElementDefinitions()
      .forEach(element => element.holding.generate(this.getElementGeneration(element).mul(speed)));
  }

  getLithiumBatteryCost(): Num { return this.getElementUpgradeCost(this.lithiumElement.batteryUpgrade); }
  getLithiumChargeGeneratorCost(): Num { return this.getElementUpgradeCost(this.lithiumElement.chargerUpgrade); }
  getLithiumCapacityCost(): Num { return this.getElementUpgradeCost(this.lithiumElement.capacityUpgrade); }
  getLithiumBatteryCapacity(): Num { return this.lithiumElement.getChargeCapacity(); }
  getLithiumTotalCapacity(): Num { return this.lithiumElement.getTotalCapacity(); }
  getLithiumTotalCharge(): Num { return this.lithiumElement.getTotalCharge(); }
  getLithiumDischargeThreshold(): Num { return this.lithiumElement.getDischargeThreshold(); }
  getLithiumBatteryTierEffect(): Num { return this.lithiumElement.getTierEffect(); }
  canDischargeLithiumBattery(): boolean { return this.canDischargeElementBattery(this.lithiumElement); }
  dischargeLithiumBattery(): void { this.dischargeElementBattery(this.lithiumElement); }

  canBuyLithiumBattery(): boolean { return this.canBuyElementUpgrade(this.lithiumElement, this.lithiumElement.batteryUpgrade); }
  buyLithiumBattery(): void { this.buyElementUpgrade(this.lithiumElement, this.lithiumElement.batteryUpgrade); }
  canBuyLithiumChargeGenerator(): boolean { return this.canBuyElementUpgrade(this.lithiumElement, this.lithiumElement.chargerUpgrade); }
  buyLithiumChargeGenerator(): void { this.buyElementUpgrade(this.lithiumElement, this.lithiumElement.chargerUpgrade); }
  canBuyLithiumCapacityUpgrade(): boolean { return this.canBuyElementUpgrade(this.lithiumElement, this.lithiumElement.capacityUpgrade); }
  buyLithiumCapacityUpgrade(): void { this.buyElementUpgrade(this.lithiumElement, this.lithiumElement.capacityUpgrade); }

  private generateElementCharges(speed: Num): void {
    const element = this.lithiumElement;
    if (element.chargerUpgrade.bought.lt(Num.ONE) || element.batteryUpgrade.bought.lt(Num.ONE)) return;

    element.batteryCharge.amount = element.batteryCharge.amount.add(element.chargerUpgrade.bought.mul(new Num(5, 0)).mul(speed));
    const capacity = element.getTotalCapacity();
    if (element.batteryCharge.amount.gt(capacity)) element.batteryCharge.amount = capacity.copy();
  }

  private generateLithiumCharge(speed: Num): void {
    if (this.lithiumChargeGenerators.lt(Num.ONE) || this.lithiumBatteries.lt(Num.ONE)) return;
    const gain = this.lithiumChargeGenerators.mul(new Num(5, 0)).mul(speed);
    this.lithiumCharge = this.lithiumCharge.add(gain);
    this.lithiumElement.batteryCharge.amount = this.lithiumCharge.copy();
    const capacity = this.getLithiumTotalCapacity();
    if (this.lithiumCharge.gt(capacity)) this.lithiumCharge = capacity.copy();
    this.lithiumElement.batteryCharge.amount = this.lithiumCharge.copy();
  }

  private generateCarbonLife(speed: Num): void {
    const gain = this.getCarbonLifeGeneration().mul(speed);
    if (gain.gt(Num.ZERO)) this.carbonLife = this.carbonLife.add(gain);
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
  }

  private burnLifeWithOxygen(speed: Num): void {
    if (!this.oxygenBurningLife) return;
    if (this.carbonLife.lte(Num.ZERO) || this.getLithiumTotalCharge().greq(this.getLithiumTotalCapacity())) {
      this.oxygenBurningLife = false;
      return;
    }

    const burn = BluePhaseService.carbonLifeBurnBaseRate.mul(speed);
    const spent = this.carbonLife.lt(burn) ? this.carbonLife : burn;
    this.carbonLife = this.carbonLife.sub(spent);
    this.lithiumCharge = this.lithiumCharge.add(spent.mul(this.getOxygenBurnChargeMultiplier()));
    this.lithiumElement.batteryCharge.amount = this.lithiumCharge.copy();

    const capacity = this.getLithiumTotalCapacity();
    if (this.lithiumCharge.greq(capacity)) {
      this.lithiumCharge = capacity.copy();
      this.oxygenBurningLife = false;
    } else if (this.carbonLife.lte(Num.ZERO)) {
      this.carbonLife = Num.ZERO.copy();
      this.oxygenBurningLife = false;
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
    this.storage.saveNum(this.oxygenCombustionUpgrades, 'oxygenCombustionUpgrades');
    this.storage.save(this.oxygenBurningLife, 'oxygenBurningLife');
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
    this.oxygenCombustionUpgrades = this.storage.loadNum(this.oxygenCombustionUpgrades, 'oxygenCombustionUpgrades');
    this.oxygenBurningLife = this.storage.load(this.oxygenBurningLife, 'oxygenBurningLife');
    this.mergeLegacyNeutronClump();
    this.synchronizePurchases();
    this.syncLithiumBatteryState();
    this.syncElementUpgradesFromLegacy();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
    this.applyNeutronMeltdown();
  }

  init(): void {
    this.synchronizePurchases();
    this.syncLithiumBatteryState();
    this.syncElementUpgradesFromLegacy();
    BerylliumHolding.rocketBoost = this.getBerylliumRocketEffect();
    BoronHolding.fiberglassBoost = this.getBoronFiberglassEffect();
    CarbonHolding.lifeBoost = this.getCarbonLifeEffect();
    this.applyNeutronMeltdown();
  }
}
