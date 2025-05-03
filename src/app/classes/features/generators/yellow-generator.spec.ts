import { YellowGenerator } from './yellow-generator';

describe('YellowGenerator', () => {
  class TestYellowGenerator extends YellowGenerator {
    // Implement any abstract methods or properties here
  }

  it('should create an instance', () => {
    expect(new TestYellowGenerator()).toBeTruthy();
  });
});
