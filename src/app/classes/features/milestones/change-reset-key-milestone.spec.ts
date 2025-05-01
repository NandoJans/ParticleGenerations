import { ChangeResetKeyYellowMilestone } from './change-reset-key-yellow-milestone';

describe('ChangeResetKeyMilestone', () => {
  it('should create an instance', () => {
    const milestone = new ChangeResetKeyYellowMilestone(
      'testName', 
      'Test Display Name', 
      100, 
      true
    );
    expect(milestone).toBeTruthy();
  });
});
