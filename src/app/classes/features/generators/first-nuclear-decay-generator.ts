import {NuclearGenerator} from "../../../features/generators/nuclear-generator";
import {Num} from "../../../num";
import {Generatable} from "../interfaces/generatable";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class FirstNuclearDecayGenerator extends NuclearGenerator {
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  displayName: string = 'Nuclear Decay Generator 1';
  generates: Generatable = HoldingRecord.nuclearDecay;
  increase: Num = new Num(2, 0);
  name: string = 'nuclear-decay-generator-1';
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
}
