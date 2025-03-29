import {NuclearGenerator} from "../../../features/generators/nuclear-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SecondNuclearDecayGenerator extends NuclearGenerator {
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Nuclear Decay Generator 2';
  generates: Generatable = GeneratorRecord.firstNuclearDecayGenerator;
  increase: Num = new Num(2, 0);
  name: string = 'nuclear-decay-generator-2';
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
}
