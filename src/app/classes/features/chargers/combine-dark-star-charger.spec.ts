import { CombineDarkStarCharger } from './combine-dark-star-charger';
import {Num} from "../../../num";
import {ChargerRecord} from "../../records/charger/charger-record";

describe('CombineDarkStarCharger', () => {
  it('should create an instance', () => {
    expect(new CombineDarkStarCharger('test-combine-charger')).toBeTruthy();
  });

  it('should have correct display name', () => {
    const charger = new CombineDarkStarCharger('test-combine-charger');
    expect(charger.displayName).toBe('Combine Charger');
  });

  it('should calculate charge based on product of other chargers', () => {
    const charger = new CombineDarkStarCharger('test-combine-charger');
    const charger1 = ChargerRecord.redGeneratorDarkCharger;
    const charger2 = ChargerRecord.redAcceleratorDarkCharger;

    // Manually activate and set charge for other chargers
    charger1.activateNerf();
    charger1.chargeAmount = new Num(2, 0);
    charger2.activateNerf();
    charger2.chargeAmount = new Num(3, 0);

    // productCharge = 2 * 3 = 6
    // formula = 6^0.1 = 1.19623...
    const chargeAmount = charger.getChargeAmount();
    expect(chargeAmount.toNumber()).toBeCloseTo(1.19623, 4);

    // Cleanup
    charger1.deactivateNerf();
    charger2.deactivateNerf();
  });
});
