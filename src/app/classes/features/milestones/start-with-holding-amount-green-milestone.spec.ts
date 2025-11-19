import { StartWithHoldingAmountGreenMilestone } from './start-with-holding-amount-green-milestone';

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
});
