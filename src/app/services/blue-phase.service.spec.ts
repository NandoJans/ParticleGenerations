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
import {LithiumHolding} from '../classes/features/holdings/blue-holdings';
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
    service.berylliumLogicSystems = Num.ZERO.copy();
    service.lithiumBatteryTier = Num.ZERO.copy();
    service.lithiumCharge = Num.ZERO.copy();
    service.lithiumBatteries = Num.ZERO.copy();
    service.lithiumChargeGenerators = Num.ZERO.copy();
    service.lithiumCapacityUpgrades = Num.ZERO.copy();
    LithiumHolding.batteryTier = Num.ZERO.copy();
    LithiumHolding.batteryCharge = Num.ZERO.copy();
    service.synchronizePurchases();
    MultiplierRecord.redAcceleratorGenerators.reset();
    MultiplierRecord.redGeneratorExtensionBuffer.reset();
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
    service.berylliumLogicSystems = Num.ZERO.copy();
    service.lithiumBatteryTier = Num.ZERO.copy();
    service.lithiumCharge = Num.ZERO.copy();
    service.lithiumBatteries = Num.ZERO.copy();
    service.lithiumChargeGenerators = Num.ZERO.copy();
    service.lithiumCapacityUpgrades = Num.ZERO.copy();
    LithiumHolding.batteryTier = Num.ZERO.copy();
    LithiumHolding.batteryCharge = Num.ZERO.copy();
    MultiplierRecord.redAcceleratorGenerators.reset();
    MultiplierRecord.redGeneratorExtensionBuffer.reset();
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
    HoldingRecord.neutronClump.amount = new Num(1, 2);
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

  it('advances one clump stage for every power of ten', () => {
    HoldingRecord.neutronClump.amount = new Num(9, 0);
    expect(service.getClumpStage()).toBe(0);

    HoldingRecord.neutronClump.amount = new Num(1, 1);
    expect(service.getClumpStage()).toBe(1);

    HoldingRecord.neutronClump.amount = new Num(1, 3);
    expect(service.getClumpStage()).toBe(3);
  });


  it('generates Beryllium without consuming Lithium at clump stage 2', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 2);

    service.tick(Num.ONE);

    expect(service.getCurrentElementName()).toBe('Lithium, Beryllium');
    expect(HoldingRecord.beryllium.amount.toNumber()).toBeCloseTo(0.01, 8);
    expect(HoldingRecord.lithium.amount.toNumber()).toBeCloseTo(0.1, 8);
  });

  it('generates each unlocked element directly from clump size', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 3);
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

  it('uses Beryllium rockets, Proton fuel, and Electron logic to boost red extensions', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 2);
    HoldingRecord.beryllium.amount = new Num(2, 1);
    HoldingRecord.protons.amount = new Num(1, 2);
    HoldingRecord.electrons.amount = new Num(1, 2);

    service.buyBerylliumRocket();
    service.buyBerylliumFuel();
    service.buyBerylliumLogic();
    service.tick(Num.ZERO);

    expect(service.getBerylliumFuelEffect().toNumber()).toBeCloseTo(1.25, 8);
    expect(service.getBerylliumLogicEffect().toNumber()).toBeCloseTo(1.15, 8);
    expect(service.getBerylliumRocketEffect().toNumber()).toBeCloseTo(2.4375, 8);
    expect(HoldingRecord.beryllium.action().toNumber()).toBeCloseTo(2.4375, 8);
    expect(MultiplierRecord.redGeneratorExtensionBuffer.getNum().toNumber()).toBeCloseTo(2.4375, 8);
    expect(MultiplierRecord.redAcceleratorGenerators.getNum(false).toNumber()).toBe(1);
  });

  it('keeps Beryllium upgrades locked until Beryllium is unlocked', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 1);
    HoldingRecord.beryllium.amount = new Num(1, 3);
    HoldingRecord.protons.amount = new Num(1, 3);
    HoldingRecord.electrons.amount = new Num(1, 3);

    expect(service.isBerylliumUnlocked()).toBeFalse();
    expect(service.canBuyBerylliumRocket()).toBeFalse();
    expect(service.canBuyBerylliumFuel()).toBeFalse();
    expect(service.canBuyBerylliumLogic()).toBeFalse();
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

  it('discharges charged lithium batteries into tiers and resets only lithium battery progress', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 1);
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

    HoldingRecord.neutrons.amount = new Num(4, 3);
    HoldingRecord.neutronClump.amount = new Num(6, 3);

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
