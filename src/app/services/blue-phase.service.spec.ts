import {BluePhaseService} from './blue-phase.service';
import {HoldingRecord} from '../classes/records/holdings/holding-record';
import {GeneratorRecord} from '../classes/records/generators/generator-record';
import {MilestoneRecord} from '../classes/records/milestones/milestone-record';
import {UpgradeRecord} from '../classes/records/upgrades/upgrade-record';
import {ResetHelper} from '../classes/helpers/reset-helper';
import {ResetKey} from '../classes/enums/reset-key';
import {Num} from '../num';

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
    HoldingRecord.greenParticles.amount = Num.ZERO.copy();

    GeneratorRecord.firstRedGenerator.bought = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.amount = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.bought = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.amount = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.bought = Num.ZERO.copy();
    MilestoneRecord.stableParticleBeam.unlocked = false;
    MilestoneRecord.denseParticleCollision.unlocked = false;
    service.synchronizePurchases();
  });

  afterEach(() => {
    HoldingRecord.protons.amount = Num.ZERO.copy();
    HoldingRecord.electrons.amount = Num.ZERO.copy();
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
    HoldingRecord.greenParticles.amount = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.bought = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.amount = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.bought = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.amount = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.bought = Num.ZERO.copy();
  });

  it('starts Blue with a fresh lower-phase run when the unlock threshold is reached', () => {
    service.unlocked = false;
    HoldingRecord.greenParticles.amount = BluePhaseService.unlockRequirement.copy();
    spyOn(ResetHelper, 'reset');

    service.tick(Num.ONE);

    expect(service.unlocked).toBeTrue();
    expect(ResetHelper.reset).toHaveBeenCalledWith(ResetKey.BLUE);
    expect(service.activeParticle).toBe('none');
  });

  it('alternates the active particle on first generator and upgrade purchases', () => {
    GeneratorRecord.firstRedGenerator.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('protons');

    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');

    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');
  });

  it('collides matched pairs into persistent neutrons', () => {
    HoldingRecord.protons.amount = new Num(8, 0);
    HoldingRecord.electrons.amount = new Num(5, 0);
    spyOn(ResetHelper, 'reset');

    service.collide();

    expect(ResetHelper.reset).toHaveBeenCalledWith(ResetKey.BLUE);
    expect(HoldingRecord.neutrons.amount.toNumber()).toBe(5);
    expect(service.activeParticle).toBe('none');
  });

  it('advances one clump stage for every power of ten', () => {
    HoldingRecord.neutronClump.amount = new Num(9, 0);
    expect(service.getClumpStage()).toBe(0);

    HoldingRecord.neutronClump.amount = new Num(1, 1);
    expect(service.getClumpStage()).toBe(1);

    HoldingRecord.neutronClump.amount = new Num(1, 3);
    expect(service.getClumpStage()).toBe(3);
  });
});
