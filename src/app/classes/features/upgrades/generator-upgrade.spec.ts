import { GeneratorUpgrade } from './generator-upgrade';

class TestGeneratorUpgrade extends GeneratorUpgrade {
  // Implement any abstract methods or properties here if required
}

describe('GeneratorUpgrade', () => {
  it('should create an instance', () => {
    expect(new TestGeneratorUpgrade()).toBeTruthy();
  });
});
