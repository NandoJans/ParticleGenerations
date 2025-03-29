import {NuclearGenerator} from "../../../features/generators/nuclear-generator";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Generatable} from "../interfaces/generatable";

export class ThirdNuclearDecayGenerator extends NuclearGenerator {
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  displayName: string = 'Nuclear Decay Generator 3';
  generates: Generatable = GeneratorRecord.secondNuclearDecayGenerator;
  increase: Num = new Num(2, 0);
  name: string = 'nuclear-decay-generator-3';
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
}
