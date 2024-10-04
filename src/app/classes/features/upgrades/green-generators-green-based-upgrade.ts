import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class GreenGeneratorsGreenBasedUpgrade extends LimitedUpgrade {
  name: string = 'green-generator-greens-based';
  displayName: string = 'Give Green Generators a Multiplier Based on Greens';
  baseCost: Num = new Num(7, 0);
  cost: Num = new Num(7, 0);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  override action(): Num {
    super.action();
    const buff: Num = HoldingRecord.greens.amount.add(new Num(1, 0), false); // Using greens from UpgradeRecord
    MultiplierRecord.greenParticleGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return "";
  }
}
