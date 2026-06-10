import {GreenNuclearComponent} from './green-nuclear.component';
import {HoldingRecord} from '../../../classes/records/holdings/holding-record';
import {ChargerRecord} from '../../../classes/records/charger/charger-record';
import {Num} from '../../../num';
import {ChallengeService} from '../../../services/interactables/challenge.service';
import {ChallengeRecord} from '../../../classes/records/challenges/challenge-record';
import {GeneratorRecord} from '../../../classes/records/generators/generator-record';

class TestableGreenNuclearComponent extends GreenNuclearComponent {}

describe('GreenNuclearComponent', () => {
  let component: TestableGreenNuclearComponent;

  beforeEach(() => {
    component = new TestableGreenNuclearComponent(new ChallengeService());
    HoldingRecord.darkStarHolding.amount = new Num(0, 0);
    HoldingRecord.nuclearPotential.amount = new Num(0, 0);
    delete ChallengeRecord.currentChallenges['green'];
    ChallengeRecord.darkGalaxy.currentDarkStarGain = new Num(0, 0);
    ChargerRecord.darkStarChargerList.forEach(charger => {
      charger.tier = new Num(1, 0);
      charger.highestTier = new Num(1, 0);
      charger.charge = new Num(0, 0);
    });
  });

  it('requires at least one dark star to gain nuclear potential', () => {
    expect(component.getPotentialGain().equals(Num.ZERO)).toBeTrue();
    expect(component.canScram()).toBeFalse();
  });

  it('calculates potential from dark stars and extra charger tiers', () => {
    HoldingRecord.darkStarHolding.amount = new Num(100, 0);
    ChargerRecord.redGeneratorDarkCharger.highestTier = new Num(3, 0);

    expect(component.getPotentialGain().toNumber()).toBe(12);
  });

  it('awards potential and resets only Dark Galaxy progress, dark stars, and chargers', () => {
    HoldingRecord.darkStarHolding.amount = new Num(100, 0);
    ChargerRecord.redGeneratorDarkCharger.highestTier = new Num(2, 0);
    ChargerRecord.redGeneratorDarkCharger.tier = new Num(2, 0);
    ChargerRecord.redGeneratorDarkCharger.charge = new Num(50, 0);
    ChargerRecord.redGeneratorDarkCharger.charging = true;
    HoldingRecord.greenParticles.amount = new Num(7, 90);
    HoldingRecord.greenPrestiges.amount = new Num(42, 0);
    GeneratorRecord.firstGreenGenerator.amount = new Num(17, 0);
    GeneratorRecord.firstGreenGenerator.bought = new Num(12, 0);
    ChallengeRecord.darkGalaxy.completed = true;
    ChallengeRecord.darkGalaxy.currentDarkStarGain = new Num(25, 0);
    ChallengeRecord.currentChallenges['green'] = ChallengeRecord.darkGalaxy;

    component.scramReactor();

    expect(HoldingRecord.nuclearPotential.amount.toNumber()).toBe(11);
    expect(HoldingRecord.darkStarHolding.amount.equals(Num.ZERO)).toBeTrue();
    expect(ChargerRecord.redGeneratorDarkCharger.tier.equals(Num.ONE)).toBeTrue();
    expect(ChargerRecord.redGeneratorDarkCharger.charge.equals(Num.ZERO)).toBeTrue();
    expect(ChargerRecord.redGeneratorDarkCharger.charging).toBeFalse();
    expect(ChallengeRecord.darkGalaxy.completed).toBeFalse();
    expect(ChallengeRecord.darkGalaxy.currentDarkStarGain.equals(Num.ZERO)).toBeTrue();
    expect(ChallengeRecord.currentChallenges['green']).toBeUndefined();
    expect(HoldingRecord.greenParticles.amount.equals(new Num(7, 90))).toBeTrue();
    expect(HoldingRecord.greenPrestiges.amount.equals(new Num(42, 0))).toBeTrue();
    expect(GeneratorRecord.firstGreenGenerator.amount.equals(new Num(17, 0))).toBeTrue();
    expect(GeneratorRecord.firstGreenGenerator.bought.equals(new Num(12, 0))).toBeTrue();
  });
});
