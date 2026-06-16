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
    service.synchronizePurchases();
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

  it('starts generating protons immediately and alternates the active particle on first generator and upgrade purchases', () => {
    service.unlockFromPrestige();
    service.tick(Num.ONE);
    expect(HoldingRecord.protons.amount.toNumber()).toBeGreaterThan(0);

    GeneratorRecord.firstRedGenerator.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');

    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('protons');

    service.tick(Num.ZERO);
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

  it('applies Blue Particle research to beam generation and collision gain', () => {
    UpgradeRecord.blueParticleResonance.amount = Num.ONE.copy();
    UpgradeRecord.blueCollisionCalibration.amount = Num.ONE.copy();
    HoldingRecord.protons.amount = new Num(8, 0);
    HoldingRecord.electrons.amount = new Num(5, 0);

    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.03, 8);
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


  it('generates more forged elements as the neutron clump reaches higher stages', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 3);

    service.tick(Num.ONE);

    expect(HoldingRecord.lithium.amount.gt(Num.ZERO)).toBeTrue();
    expect(HoldingRecord.beryllium.amount.gt(Num.ZERO)).toBeTrue();
    expect(HoldingRecord.boron.amount.gt(Num.ZERO)).toBeTrue();
    expect(HoldingRecord.carbon.amount.toNumber()).toBe(0);
    expect(service.getCurrentElementName()).toBe('Lithium, Beryllium, Boron');
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
