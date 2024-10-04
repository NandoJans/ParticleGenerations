import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RemoveFusionLimitUpgrade extends LimitedUpgrade {
  name: string = 'remove-fusion-limit';
  displayName: string = 'Remove the Fusion Limit, but Fusion is Slowed Down When Going Beyond its Limit';
  baseCost: Num = new Num(7.5, 1);
  cost: Num = new Num(7.5, 1);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  override action(): Num {
    super.action();
    HoldingRecord.yellowFusion.maxAmount = undefined;
    return new Num(0, 0);
  }

  getDescription(): string {
    return "";
  }
}
