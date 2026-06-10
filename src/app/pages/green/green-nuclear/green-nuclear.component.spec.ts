import {GreenNuclearComponent} from './green-nuclear.component';
import {HoldingRecord} from '../../../classes/records/holdings/holding-record';
import {ChargerRecord} from '../../../classes/records/charger/charger-record';
import {Num} from '../../../num';

class TestableGreenNuclearComponent extends GreenNuclearComponent {}

describe('GreenNuclearComponent', () => {
  let component: TestableGreenNuclearComponent;

  beforeEach(() => {
    component = new TestableGreenNuclearComponent();
    HoldingRecord.darkStarHolding.amount = new Num(0, 0);
    HoldingRecord.nuclearPotential.amount = new Num(0, 0);
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

  it('awards potential and resets dark stars and chargers', () => {
    HoldingRecord.darkStarHolding.amount = new Num(100, 0);
    ChargerRecord.redGeneratorDarkCharger.highestTier = new Num(2, 0);
    ChargerRecord.redGeneratorDarkCharger.tier = new Num(2, 0);
    ChargerRecord.redGeneratorDarkCharger.charge = new Num(50, 0);

    component.scramReactor();

    expect(HoldingRecord.nuclearPotential.amount.toNumber()).toBe(11);
    expect(HoldingRecord.darkStarHolding.amount.equals(Num.ZERO)).toBeTrue();
    expect(ChargerRecord.redGeneratorDarkCharger.tier.equals(Num.ONE)).toBeTrue();
    expect(ChargerRecord.redGeneratorDarkCharger.charge.equals(Num.ZERO)).toBeTrue();
  });
});
