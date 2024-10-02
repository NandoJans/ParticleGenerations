import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class YellowBasedAcceleratorMultiplierUpgrade extends YellowUpgrade {
  name: string = 'yellow-based-accelerator-multiplier';
  displayName: string = 'Yellows based accelerator multiplier';

  baseCost: Num = new Num(2, 0);
  cost: Num = new Num(2, 0);

  override baseBuffer: Num = new Num(0.2, 0);
  override buffer: Num = new Num(0.2, 0);
  override oneTime: boolean = true;

  override action(): Num {
    const buff: Num = HoldingRecord.yellows.amount.mul(this.buffer, false);
    buff.add(new Num(1, 0))
    MultiplierRecord.redAcceleratorGenerators.correct(buff);
    return buff
  }

  override getDescription(): string {
    return 'Gain a '+this.buffer.toString(true)+'x multiplier to red accelerator generators for each yellow you have.';
  }

  override effectString(): string {
    return super.effectString()+"x";
  }
}
