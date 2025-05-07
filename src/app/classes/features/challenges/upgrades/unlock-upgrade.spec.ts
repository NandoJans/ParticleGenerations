import { UnlockUpgrade } from './unlock-upgrade';

describe('UnlockUpgrade', () => {
  class TestUnlockUpgrade extends UnlockUpgrade {}
  it('should create an instance', () => {
    expect(new TestUnlockUpgrade()).toBeTruthy();
  });
});
