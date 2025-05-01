import { ChangeHoldingGeneratePercentage } from './change-holding-generate-percentage';

describe('ChangeHoldingGenerationMultiplierMilestone', () => {
  it('should create an instance', () => {
    const instance = new ChangeHoldingGeneratePercentage(
      'testName',          // name
      'Test Display Name', // displayName
      100,                 // goal
      1.5,                 // multiplier
     20                   // percentage
    );
    expect(instance).toBeTruthy();
  });
});
