import {BluePhaseService} from './blue-phase.service';
import {HoldingRecord} from '../classes/records/holdings/holding-record';
import {GeneratorRecord} from '../classes/records/generators/generator-record';
import {MilestoneRecord} from '../classes/records/milestones/milestone-record';
import {UpgradeRecord} from '../classes/records/upgrades/upgrade-record';
import {ResetHelper} from '../classes/helpers/reset-helper';
import {ResetKey} from '../classes/enums/reset-key';
import {Num} from '../num';
import {Multiplier} from '../classes/features/multiplier';
import {Automator} from '../classes/features/automator';
import {PrestigeLayersService} from './prestige-layers.service';
import {ChargerRecord} from '../classes/records/charger/charger-record';
import {CarbonHolding, LithiumHolding} from '../classes/features/holdings/blue-holdings';
import {MultiplierRecord} from '../classes/records/multipliers/multiplier-record';

describe('BluePhaseService', () => {
  let service: BluePhaseService;

  beforeEach(() => {
    service = new BluePhaseService();
    service.unlocked = true;
    service.activeParticle = 'none';

    HoldingRecord.protons.amount = Num.ZERO.copy();
    HoldingRecord.electrons.amount = Num.ZERO.copy();
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
    HoldingRecord.lithium.amount = Num.ZERO.copy();
    HoldingRecord.beryllium.amount = Num.ZERO.copy();
    HoldingRecord.boron.amount = Num.ZERO.copy();
    HoldingRecord.carbon.amount = Num.ZERO.copy();
    HoldingRecord.nitrogen.amount = Num.ZERO.copy();
    HoldingRecord.greenParticles.amount = Num.ZERO.copy();
    HoldingRecord.redParticles.amount = Num.ONE.copy();

    GeneratorRecord.firstRedGenerator.bought = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.amount = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.bought = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.amount = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.bought = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.amount = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.bought = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.amount = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.bought = Num.ZERO.copy();
    MilestoneRecord.stableParticleBeam.unlocked = false;
    MilestoneRecord.denseParticleCollision.unlocked = false;
    service.berylliumRockets = Num.ZERO.copy();
    service.berylliumFuelSystems = Num.ZERO.copy();
    service.berylliumFuel = Num.ZERO.copy();
    service.berylliumLogicSystems = Num.ZERO.copy();
    service.lithiumBatteryTier = Num.ZERO.copy();
    service.lithiumCharge = Num.ZERO.copy();
    service.lithiumBatteries = Num.ZERO.copy();
    service.lithiumChargeGenerators = Num.ZERO.copy();
    service.lithiumCapacityUpgrades = Num.ZERO.copy();
    service.boronFiberSpools = Num.ZERO.copy();
    service.boronFiberglass = Num.ZERO.copy();
    service.boronResinInfusers = Num.ZERO.copy();
    service.boronWeaveLooms = Num.ZERO.copy();
    service.carbonLandPlots = Num.ZERO.copy();
    service.carbonLandAreaUpgrades = Num.ZERO.copy();
    service.carbonLifeUpgrades = Num.ZERO.copy();
    service.carbonLife = Num.ZERO.copy();
    service.carbonLifeTier = Num.ZERO.copy();
    service.carbonBurningLife = false;
    LithiumHolding.batteryTier = Num.ZERO.copy();
    LithiumHolding.batteryCharge = Num.ZERO.copy();
    CarbonHolding.lifeBoost = Num.ONE.copy();
    service.synchronizePurchases();
    MultiplierRecord.redAcceleratorGenerators.reset();
    MultiplierRecord.redGeneratorExtensionBuffer.reset();
    MultiplierRecord.nucleusGeneration.reset();
  });

  afterEach(() => {
    Automator.keepOnReset = false;
    PrestigeLayersService.yellowPrestigeLayer.passivePrestige = false;
    PrestigeLayersService.greenPrestigeLayer.passivePrestige = false;
    PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = true;
    PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow = true;
    Multiplier.neutronMeltdownPower = Num.ONE.copy();
    HoldingRecord.protons.amount = Num.ZERO.copy();
    HoldingRecord.electrons.amount = Num.ZERO.copy();
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
    HoldingRecord.lithium.amount = Num.ZERO.copy();
    HoldingRecord.beryllium.amount = Num.ZERO.copy();
    HoldingRecord.boron.amount = Num.ZERO.copy();
    HoldingRecord.carbon.amount = Num.ZERO.copy();
    HoldingRecord.nitrogen.amount = Num.ZERO.copy();
    HoldingRecord.greenParticles.amount = Num.ZERO.copy();
    HoldingRecord.redParticles.amount = Num.ONE.copy();
    GeneratorRecord.firstRedGenerator.bought = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.amount = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.bought = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.amount = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.bought = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.amount = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.bought = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.amount = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.bought = Num.ZERO.copy();
    service.berylliumRockets = Num.ZERO.copy();
    service.berylliumFuelSystems = Num.ZERO.copy();
    service.berylliumFuel = Num.ZERO.copy();
    service.berylliumLogicSystems = Num.ZERO.copy();
    service.lithiumBatteryTier = Num.ZERO.copy();
    service.lithiumCharge = Num.ZERO.copy();
    service.lithiumBatteries = Num.ZERO.copy();
    service.lithiumChargeGenerators = Num.ZERO.copy();
    service.lithiumCapacityUpgrades = Num.ZERO.copy();
    service.boronFiberSpools = Num.ZERO.copy();
    service.boronFiberglass = Num.ZERO.copy();
    service.boronResinInfusers = Num.ZERO.copy();
    service.boronWeaveLooms = Num.ZERO.copy();
    service.carbonLandPlots = Num.ZERO.copy();
    service.carbonLandAreaUpgrades = Num.ZERO.copy();
    service.carbonLifeUpgrades = Num.ZERO.copy();
    service.carbonLife = Num.ZERO.copy();
    service.carbonLifeTier = Num.ZERO.copy();
    service.carbonBurningLife = false;
    LithiumHolding.batteryTier = Num.ZERO.copy();
    LithiumHolding.batteryCharge = Num.ZERO.copy();
    CarbonHolding.lifeBoost = Num.ONE.copy();
    MultiplierRecord.redAcceleratorGenerators.reset();
    MultiplierRecord.redGeneratorExtensionBuffer.reset();
    MultiplierRecord.nucleusGeneration.reset();
  });

  it('does not automatically enter Blue when the unlock threshold is reached', () => {
    service.unlocked = false;
    HoldingRecord.greenParticles.amount = BluePhaseService.unlockRequirement.copy();
    spyOn(ResetHelper, 'reset');

    service.tick(Num.ONE);

    expect(service.unlocked).toBeFalse();
    expect(ResetHelper.reset).not.toHaveBeenCalled();
  });

  it('enters Blue only after an explicit prestige', () => {
    service.unlocked = false;

    service.unlockFromPrestige();

    expect(service.unlocked).toBeTrue();
    expect(service.activeParticle).toBe('protons');
  });

  it('starts generating protons immediately and alternates the active particle on every generator and upgrade purchase', () => {
    service.unlockFromPrestige();
    service.tick(Num.ONE);
    expect(HoldingRecord.protons.amount.toNumber()).toBeGreaterThan(0);

    GeneratorRecord.firstRedGenerator.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');

    GeneratorRecord.firstRedGenerator.bought = Num.TWO.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('protons');

    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');

    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');
  });

  it('alternates the active particle on successful blue element purchases', () => {
    service.unlockFromPrestige();
    HoldingRecord.neutrons.amount = new Num(1, 2);
    HoldingRecord.lithium.amount = new Num(1, 3);
    HoldingRecord.protons.amount = new Num(1, 3);
    HoldingRecord.electrons.amount = new Num(1, 3);
    HoldingRecord.beryllium.amount = new Num(1, 3);

    service.buyLithiumBattery();
    expect(service.activeParticle).toBe('electrons');

    service.buyLithiumCapacityUpgrade();
    expect(service.activeParticle).toBe('protons');

    service.buyLithiumChargeGenerator();
    expect(service.activeParticle).toBe('electrons');

    service.buyBerylliumRocket();
    expect(service.activeParticle).toBe('protons');

    service.buyBerylliumFuel();
    expect(service.activeParticle).toBe('electrons');

    service.buyBerylliumLogic();
    expect(service.activeParticle).toBe('protons');
  });

  it('collides matched pairs into persistent neutrons', () => {
    HoldingRecord.protons.amount = new Num(8, 0);
    HoldingRecord.electrons.amount = new Num(5, 0);
    spyOn(ResetHelper, 'reset');

    service.collide();

    expect(ResetHelper.reset).toHaveBeenCalledWith(ResetKey.BLUE);
    expect(HoldingRecord.neutrons.amount.toNumber()).toBe(5);
    expect(service.activeParticle).toBe('protons');
  });

  it('resets dark star chargers when Blue is unlocked from prestige', () => {
    const charger = ChargerRecord.redGeneratorDarkCharger;
    charger.unlocked = true;
    charger.charge = new Num(5, 0);
    charger.tier = new Num(3, 0);
    charger.highestTier = new Num(3, 0);
    charger.startCharging();

    service.unlockFromPrestige();

    expect(charger.charge.equals(charger.startCharge)).toBeTrue();
    expect(charger.tier.equals(charger.startTier)).toBeTrue();
    expect(charger.highestTier.equals(charger.startTier)).toBeTrue();
    expect(charger.isUnlocked()).toBeFalse();
  });

  it('uses Blue Particles for Blue Particle research upgrades', () => {
    expect(UpgradeRecord.blueParticleResonance.currency).toBe(HoldingRecord.blueParticles);
    expect(UpgradeRecord.blueCollisionCalibration.currency).toBe(HoldingRecord.blueParticles);
    expect(UpgradeRecord.blueBeamIntensity.currency).toBe(HoldingRecord.neutrons);
  });

  it('boosts beam generation by red particle orders of magnitude from a lower base rate', () => {
    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.001, 8);

    HoldingRecord.redParticles.amount = new Num(1, 6);

    expect(service.getRedParticleGenerationBoost().toNumber()).toBe(6);
    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.006, 8);
  });

  it('applies Blue Particle research to beam generation and collision gain', () => {
    UpgradeRecord.blueParticleResonance.amount = Num.ONE.copy();
    UpgradeRecord.blueCollisionCalibration.amount = Num.ONE.copy();
    HoldingRecord.redParticles.amount = new Num(1, 3);
    HoldingRecord.protons.amount = new Num(8, 0);
    HoldingRecord.electrons.amount = new Num(5, 0);

    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.009, 8);
    expect(service.getCollisionGain().toNumber()).toBe(2);
  });
  it('merges legacy neutron clump matter back into persistent neutrons', () => {
    HoldingRecord.neutrons.amount = new Num(4, 0);
    HoldingRecord.neutronClump.amount = new Num(6, 0);

    service.mergeLegacyNeutronClump();

    expect(HoldingRecord.neutrons.amount.toNumber()).toBe(10);
    expect(HoldingRecord.neutronClump.amount.toNumber()).toBe(0);
    expect(service.isElementUnlocked(service.elementDefinitions[0])).toBeTrue();
  });


  it('advances one neutron stage for every power of ten', () => {
    HoldingRecord.neutrons.amount = new Num(9, 0);
    expect(service.getNeutronStage()).toBe(0);

    HoldingRecord.neutrons.amount = new Num(1, 1);
    expect(service.getNeutronStage()).toBe(1);

    HoldingRecord.neutrons.amount = new Num(1, 3);
    expect(service.getNeutronStage()).toBe(3);
  });


  it('generates Beryllium without consuming Lithium at neutron stage 2', () => {
    HoldingRecord.neutrons.amount = new Num(1, 2);

    service.tick(Num.ONE);

    expect(service.getCurrentElementName()).toBe('Lithium, Beryllium');
    expect(HoldingRecord.beryllium.amount.toNumber()).toBeCloseTo(0.01, 8);
    expect(HoldingRecord.lithium.amount.toNumber()).toBeCloseTo(0.1, 8);
  });

  it('generates each unlocked element directly from persistent neutron count', () => {
    HoldingRecord.neutrons.amount = new Num(1, 3);
    HoldingRecord.lithium.amount = new Num(1, 2);
    HoldingRecord.beryllium.amount = new Num(1, 1);

    expect(service.getElementGeneration(service.elementDefinitions[1]).toNumber()).toBe(0.1);
    expect(service.getElementGeneration(service.elementDefinitions[2]).toNumber()).toBe(0.01);

    service.tick(Num.ONE);

    expect(HoldingRecord.lithium.amount.toNumber()).toBe(101);
    expect(HoldingRecord.beryllium.amount.toNumber()).toBe(10.1);
    expect(HoldingRecord.boron.amount.toNumber()).toBe(0.01);
    expect(HoldingRecord.carbon.amount.toNumber()).toBe(0);
    expect(service.getCurrentElementName()).toBe('Lithium, Beryllium, Boron');
  });

  it('fills Beryllium rockets with fuel to boost red extensions', () => {
    HoldingRecord.neutrons.amount = new Num(1, 2);
    HoldingRecord.beryllium.amount = new Num(2, 1);
    HoldingRecord.protons.amount = new Num(1, 2);
    HoldingRecord.electrons.amount = new Num(1, 2);

    service.buyBerylliumRocket();
    service.buyBerylliumFuel();
    service.buyBerylliumLogic();

    expect(service.getBerylliumFuelEffect().toNumber()).toBe(1);

    service.tick(Num.ONE);

    expect(service.berylliumFuel.toNumber()).toBeCloseTo(5, 8);
    expect(service.getBerylliumFuelEffect().toNumber()).toBeCloseTo(6, 8);
    expect(service.getBerylliumLogicEffect().toNumber()).toBeCloseTo(1.15, 8);
    expect(service.getBerylliumRocketEffect().toNumber()).toBeCloseTo(6.75, 8);
    expect(HoldingRecord.beryllium.action().toNumber()).toBeCloseTo(6.75, 8);
    expect(UpgradeRecord.redGeneratorExtension.getEffectiveBuffer().toNumber()).toBeCloseTo(13.5, 8);
    expect(MultiplierRecord.redGeneratorExtensionBuffer.getNum().toNumber()).toBe(1);
    expect(MultiplierRecord.redAcceleratorGenerators.getNum(false).toNumber()).toBe(1);
  });

  it('caps Beryllium fuel at rocket capacity', () => {
    HoldingRecord.neutrons.amount = new Num(1, 2);
    HoldingRecord.beryllium.amount = new Num(2, 1);
    HoldingRecord.protons.amount = new Num(1, 2);

    service.buyBerylliumRocket();
    service.buyBerylliumFuel();
    service.tick(new Num(1, 3));

    expect(service.getBerylliumTotalFuel().toNumber()).toBe(100);
    expect(service.getBerylliumFuelEffect().toNumber()).toBe(101);
  });

  it('keeps Beryllium upgrades locked until Beryllium is unlocked', () => {
    HoldingRecord.neutrons.amount = new Num(1, 1);
    HoldingRecord.beryllium.amount = new Num(1, 3);
    HoldingRecord.protons.amount = new Num(1, 3);
    HoldingRecord.electrons.amount = new Num(1, 3);

    expect(service.isBerylliumUnlocked()).toBeFalse();
    expect(service.canBuyBerylliumRocket()).toBeFalse();
    expect(service.canBuyBerylliumFuel()).toBeFalse();
    expect(service.canBuyBerylliumLogic()).toBeFalse();
  });


  it('generates Boron fiberglass from fiber spools to boost red accelerators', () => {
    HoldingRecord.neutrons.amount = new Num(1, 3);
    HoldingRecord.boron.amount = new Num(2, 1);
    HoldingRecord.protons.amount = new Num(1, 2);
    HoldingRecord.electrons.amount = new Num(1, 2);

    service.buyBoronFiber();
    service.buyBoronResin();
    service.buyBoronWeave();

    expect(service.getBoronFiberglassBaseEffect().toNumber()).toBeCloseTo(1.38, 8);

    service.tick(Num.ONE);

    expect(service.boronFiberglass.toNumber()).toBeCloseTo(2, 8);
    expect(service.getBoronTotalFiberglass().toNumber()).toBeCloseTo(2, 8);
    expect(service.getBoronFiberglassBaseEffect().toNumber()).toBeCloseTo(4.14, 8);
    expect(HoldingRecord.boron.action().toNumber()).toBeCloseTo(4.14, 8);
  });

  it('requires enough Boron fiber spools, not fiberglass effect, to laminate', () => {
    const threshold = service.getBoronLaminateThreshold();
    service.boronFiberSpools = threshold.sub(Num.ONE);
    service.boronFiberglass = new Num(1, 100);
    service.boronResinInfusers = new Num(1, 6);
    service.boronWeaveLooms = new Num(1, 6);

    expect(service.getBoronFiberglassBaseEffect().greq(threshold)).toBeTrue();
    expect(service.canLaminateBoronFiberglass()).toBeFalse();

    service.boronFiberSpools = threshold.copy();
    service.boronFiberglass = Num.ZERO.copy();
    service.boronResinInfusers = Num.ZERO.copy();
    service.boronWeaveLooms = Num.ZERO.copy();

    expect(service.getBoronFiberglassBaseEffect().lt(threshold)).toBeTrue();
    expect(service.canLaminateBoronFiberglass()).toBeTrue();

    service.laminateBoronFiberglass();

    expect(service.boronFiberglassTier.toNumber()).toBe(1);
  });

  it('boosts red generators with lithium battery charge but not raw Lithium', () => {
    HoldingRecord.lithium.amount = new Num(1, 6);
    service.lithiumCharge = Num.ZERO.copy();

    expect(HoldingRecord.lithium.getEffect().toNumber()).toBe(1);

    service.lithiumBatteries = Num.ONE.copy();
    service.lithiumChargeGenerators = Num.ONE.copy();
    service.tick(Num.ONE);

    expect(HoldingRecord.lithium.getEffect().toNumber()).toBeGreaterThan(1);
  });

  it('boosts proton and electron generation from every forged element', () => {
    HoldingRecord.lithium.amount = new Num(1, 2);
    HoldingRecord.beryllium.amount = new Num(1, 3);
    HoldingRecord.boron.amount = new Num(1, 4);
    HoldingRecord.carbon.amount = new Num(1, 5);
    HoldingRecord.nitrogen.amount = new Num(1, 6);

    HoldingRecord.lithium.action();
    HoldingRecord.beryllium.action();
    HoldingRecord.boron.action();
    HoldingRecord.carbon.action();
    HoldingRecord.nitrogen.action();

    expect(MultiplierRecord.nucleusGeneration.getNum(false).toNumber()).toBeCloseTo(2520, 8);
  });

  it('discharges charged lithium batteries into tiers and resets only lithium battery progress', () => {
    HoldingRecord.neutrons.amount = new Num(1, 1);
    HoldingRecord.lithium.amount = new Num(4, 2);
    HoldingRecord.protons.amount = new Num(7, 0);
    HoldingRecord.electrons.amount = new Num(8, 0);
    HoldingRecord.beryllium.amount = new Num(9, 0);
    service.lithiumBatteries = new Num(1, 3);
    service.lithiumChargeGenerators = new Num(3, 0);
    service.lithiumCapacityUpgrades = new Num(20, 0);
    service.lithiumCharge = BluePhaseService.lithiumDischargeBaseCharge.copy();

    expect(service.canDischargeLithiumBattery()).toBeTrue();

    service.dischargeLithiumBattery();

    expect(service.lithiumBatteryTier.toNumber()).toBe(1);
    expect(HoldingRecord.lithium.amount.equals(Num.ZERO)).toBeTrue();
    expect(service.lithiumBatteries.equals(Num.ZERO)).toBeTrue();
    expect(service.lithiumChargeGenerators.equals(Num.ZERO)).toBeTrue();
    expect(service.lithiumCapacityUpgrades.equals(Num.ZERO)).toBeTrue();
    expect(service.lithiumCharge.equals(Num.ZERO)).toBeTrue();
    expect(HoldingRecord.protons.amount.toNumber()).toBe(7);
    expect(HoldingRecord.electrons.amount.toNumber()).toBe(8);
    expect(HoldingRecord.beryllium.amount.toNumber()).toBe(9);
    expect(service.getLithiumDischargeThreshold().toNumber()).toBe(200000);
  });

  it('scales proton and electron element upgrade costs by each element neutron unlock amount', () => {
    expect(service.getLithiumChargeGeneratorCost().toNumber()).toBe(100);
    expect(service.getLithiumCapacityCost().toNumber()).toBe(100);
    expect(service.getBerylliumFuelCost().toNumber()).toBe(100000);
    expect(service.getBerylliumLogicCost().toNumber()).toBe(100000);
    expect(service.getBoronResinCost().toNumber()).toBe(100000000);
    expect(service.getBoronWeaveCost().toNumber()).toBe(100000000);
    expect(service.getCarbonLandCost().toNumber()).toBe(50000);
    expect(service.getCarbonLandAreaCost().toNumber()).toBe(250000);
  });

  it('grows carbon life from land and pauses growth while burning into lithium charge', () => {
    HoldingRecord.neutrons.amount = new Num(1, 4);
    HoldingRecord.carbon.amount = new Num(1, 2);
    HoldingRecord.lithium.amount = new Num(1, 2);
    service.lithiumBatteries = Num.ONE.copy();
    service.carbonLandPlots = Num.TWO.copy();
    service.carbonLandAreaUpgrades = Num.ONE.copy();

    service.tick(Num.ONE);

    expect(service.carbonLife.toNumber()).toBeCloseTo(1.2, 8);
    expect(service.getCarbonLifeEffect().toNumber()).toBeGreaterThan(1);

    service.toggleCarbonBurn();
    service.tick(Num.ONE);

    expect(service.carbonBurningLife).toBeFalse();
    expect(service.carbonLife.toNumber()).toBeCloseTo(0.2, 8);
    expect(service.lithiumCharge.toNumber()).toBeGreaterThan(10);
  });

  it('spends carbon on life cultivation upgrades that improve life growth', () => {
    HoldingRecord.neutrons.amount = new Num(1, 4);
    HoldingRecord.carbon.amount = new Num(2, 1);
    service.carbonLandPlots = Num.TWO.copy();
    service.carbonLandAreaUpgrades = Num.ONE.copy();

    expect(service.canBuyCarbonLifeUpgrade()).toBeTrue();
    service.buyCarbonLifeUpgrade();

    expect(service.carbonLifeUpgrades.toNumber()).toBe(1);
    expect(HoldingRecord.carbon.amount.toNumber()).toBe(10);
    expect(service.getCarbonLifeUpgradeEffect().toNumber()).toBe(1.25);

    service.tick(Num.ONE);

    expect(service.carbonLife.toNumber()).toBeGreaterThan(1.2);
  });



  it('prestiges Carbon life into life tiers and resets only Carbon biosphere progress', () => {
    HoldingRecord.carbon.amount = new Num(5, 2);
    HoldingRecord.protons.amount = new Num(7, 0);
    HoldingRecord.electrons.amount = new Num(8, 0);
    HoldingRecord.lithium.amount = new Num(9, 0);
    service.carbonLandPlots = new Num(4, 0);
    service.carbonLandAreaUpgrades = new Num(3, 0);
    service.carbonLifeUpgrades = new Num(2, 0);
    service.carbonLife = BluePhaseService.carbonLifePrestigeBaseBiomass.copy();
    service.carbonBurningLife = true;

    expect(service.canPrestigeCarbonLife()).toBeTrue();

    service.prestigeCarbonLife();

    expect(service.carbonLifeTier.toNumber()).toBe(1);
    expect(HoldingRecord.carbon.amount.equals(Num.ZERO)).toBeTrue();
    expect(service.carbonLandPlots.equals(Num.ZERO)).toBeTrue();
    expect(service.carbonLandAreaUpgrades.equals(Num.ZERO)).toBeTrue();
    expect(service.carbonLifeUpgrades.equals(Num.ZERO)).toBeTrue();
    expect(service.carbonLife.equals(Num.ZERO)).toBeTrue();
    expect(service.carbonBurningLife).toBeFalse();
    expect(HoldingRecord.protons.amount.toNumber()).toBe(7);
    expect(HoldingRecord.electrons.amount.toNumber()).toBe(8);
    expect(HoldingRecord.lithium.amount.toNumber()).toBe(9);
    expect(service.getCarbonLifeTierEffect().toNumber()).toBe(2);
    expect(service.getCarbonLifePrestigeThreshold().toNumber()).toBe(100000000);
  });

  it('uses carbon life to boost booster acceleration effect without changing its base buffer', () => {
    service.carbonLife = new Num(1, 4);
    CarbonHolding.lifeBoost = service.getCarbonLifeEffect();
    UpgradeRecord.boosterAccelerationUpgrade.amount = Num.TWO.copy();
    UpgradeRecord.boosterAccelerationUpgrade.buffer = UpgradeRecord.boosterAccelerationUpgrade.baseBuffer.copy();

    const effect = UpgradeRecord.boosterAccelerationUpgrade.action();

    expect(effect.toNumber()).toBeCloseTo(0.07, 8);
    expect(UpgradeRecord.boosterAccelerationUpgrade.buffer.toNumber()).toBeCloseTo(0.025, 8);
  });

  it('increases lithium red generator boost from battery tiers', () => {
    const baseEffect = HoldingRecord.lithium.getEffect();
    service.lithiumBatteries = new Num(1, 3);
    service.lithiumCharge = BluePhaseService.lithiumDischargeBaseCharge.copy();

    service.dischargeLithiumBattery();
    service.tick(Num.ZERO);

    expect(service.getLithiumBatteryTierEffect().toNumber()).toBe(2);
    expect(HoldingRecord.lithium.getEffect().toNumber()).toBeGreaterThan(baseEffect.toNumber());
  });

  it('starts the neutron meltdown at ^0.001 and fully restores at 10,000 neutron matter', () => {
    expect(service.getNeutronMeltdownPower().toNumber()).toBeCloseTo(0.001, 8);

    HoldingRecord.neutrons.amount = new Num(1, 4);

    expect(service.getTotalNeutronMatter().toNumber()).toBe(10000);
    expect(service.getNeutronMeltdownPower().toNumber()).toBeCloseTo(1, 8);
  });

  it('raises non-Blue multipliers to the meltdown power while Blue multipliers remain immune', () => {
    service.applyNeutronMeltdown();
    const normal = new Multiplier('normal', new Num(1, 3));
    const blue = new Multiplier('blue', new Num(1, 3), 1150, true);

    expect(normal.getNum().toNumber()).toBeCloseTo(Math.pow(1000, 0.001), 8);
    expect(normal.getNum(false).toNumber()).toBe(1000);
    expect(blue.getNum().toNumber()).toBe(1000);
  });

  it('applies the meltdown once to a generator local and global multiplier combined', () => {
    service.applyNeutronMeltdown();
    const localMultiplier = new Num(1, 2);
    const globalMultiplier = new Multiplier('generator-global', new Num(1, 3));
    const combined = localMultiplier.mul(globalMultiplier.getNum(false));

    expect(Multiplier.applyNeutronMeltdown(combined).toNumber())
      .toBeCloseTo(Math.pow(100000, 0.001), 8);
  });

  it('turns the first Blue milestone into permanent automation and passive earlier prestiges', () => {
    MilestoneRecord.stableParticleBeam.action();

    expect(Automator.keepOnReset).toBeTrue();
    expect(PrestigeLayersService.yellowPrestigeLayer.passivePrestige).toBeTrue();
    expect(PrestigeLayersService.greenPrestigeLayer.passivePrestige).toBeTrue();
    expect(PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow).toBeFalse();
    expect(PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow).toBeFalse();
  });
});
