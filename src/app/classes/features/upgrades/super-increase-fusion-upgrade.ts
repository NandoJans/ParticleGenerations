import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class SuperIncreaseFusionUpgrade extends LimitedUpgrade {
  name: string = 'super-increase-fusion';
  displayName: string = 'Increase Yellow Fusion by 1e5x';
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  override buffer: Num = new Num(1, 5);
  override baseBuffer: Num = new Num(1, 5);

  override action(): Num {
    super.action();
    MultiplierRecord.yellowFusion.correct(this.buffer); // Correct yellowFusion multiplier with a large value
    return new Num(0, 0);
  }

  getDescription(): string {
    return "";
  }
}
