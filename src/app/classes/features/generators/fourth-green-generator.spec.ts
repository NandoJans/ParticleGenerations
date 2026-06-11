import {FourthGreenGenerator} from './fourth-green-generator';
import {GeneratorRecord} from '../../records/generators/generator-record';
import {UpgradeRecord} from '../../records/upgrades/upgrade-record';
import {Num} from '../../../num';


describe('FourthGreenGenerator', () => {
  it('is unlocked by the fourth-stage nuclear upgrade', () => {
    const generator = new FourthGreenGenerator('testFourthGreenGenerator');
    generator.init();

    expect(generator.generates).toBe(GeneratorRecord.thirdGreenGenerator);
    expect(generator.requirement[0].requirement).toBe(UpgradeRecord.unlockFourthGreenGeneratorNuclear);
    expect(generator.requirement[0].amount.equals(Num.ONE)).toBeTrue();
  });
});
