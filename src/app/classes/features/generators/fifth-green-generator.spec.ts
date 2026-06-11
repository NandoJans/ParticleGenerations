import {FifthGreenGenerator} from './fifth-green-generator';
import {GeneratorRecord} from '../../records/generators/generator-record';
import {UpgradeRecord} from '../../records/upgrades/upgrade-record';
import {Num} from '../../../num';


describe('FifthGreenGenerator', () => {
  it('is unlocked by the fifth-stage nuclear upgrade', () => {
    const generator = new FifthGreenGenerator('testFifthGreenGenerator');
    generator.init();

    expect(generator.generates).toBe(GeneratorRecord.fourthGreenGenerator);
    expect(generator.requirement[0].requirement).toBe(UpgradeRecord.unlockFifthGreenGeneratorNuclear);
    expect(generator.requirement[0].amount.equals(Num.ONE)).toBeTrue();
  });
});
