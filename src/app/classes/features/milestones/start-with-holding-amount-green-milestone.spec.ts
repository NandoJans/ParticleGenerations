import { StartWithHoldingAmountGreenMilestone } from './start-with-holding-amount-green-milestone';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {Num} from '../../../num';

describe('StartWithHoldingAmountGreenMilestone', () => {
  it('should create an instance', () => {
    expect(new StartWithHoldingAmountGreenMilestone(
      'testName',
      'Test Display Name',
      100,
      50,
     10,
     'Test Group'
   )).toBeTruthy();
  });

  it('removes its starting resource boost when the milestone resets', () => {
    const milestone = new StartWithHoldingAmountGreenMilestone(
      'testReset',
      'Test reset',
      Num.ONE,
      HoldingRecord.yellowParticles,
      new Num(1, 3),
      'yellow particles'
    );

    milestone.tick();
    expect(HoldingRecord.yellowParticles.startAmount.equals(new Num(1, 3))).toBeTrue();

    milestone.reset();

    expect(HoldingRecord.yellowParticles.startAmount.equals(Num.ZERO)).toBeTrue();
    expect(HoldingRecord.yellowParticles.amount.equals(Num.ZERO)).toBeTrue();
  });
});
