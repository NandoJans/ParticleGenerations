import { GeneratorRecord } from './generator-record';

describe('GeneratorRecord', () => {
  it('should create an instance', () => {
    expect(new GeneratorRecord()).toBeTruthy();
  });

  it('links each generator to the preceding generator after static initialization', () => {
    const chains = [
      GeneratorRecord.redGenerators,
      GeneratorRecord.yellowGenerators,
      GeneratorRecord.greenGenerators,
    ];

    chains.forEach(generators => {
      generators.slice(1).forEach((generator, index) => {
        expect(generator.generates).toBe(generators[index]);
      });
    });
  });
});
