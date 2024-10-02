import { YellowUpgrade } from "./yellow-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class YellowBasedMultiplierUpgrade extends YellowUpgrade {
  name: string = 'yellow-based-multiplier';
  displayName: string = 'Yellows based multiplier';

  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);

  override baseBuffer: Num = new Num(0.2, 0);
  override buffer: Num = new Num(0.2, 0);
  override oneTime: boolean = true;

  override action(): Num {
    const buff: Num = HoldingRecord.yellows.amount.mul(this.buffer, false);
    buff.add(new Num(1, 0))
    MultiplierRecord.redParticleGenerators.correct(buff);
    return buff
  }

  override getDescription(): string {
    return 'Gain a '+this.buffer.toString(true)+'x multiplier to red particle generators for each yellow you have.';
  }

  override effectString(): string {
    return super.effectString()+"x";
  }
}
