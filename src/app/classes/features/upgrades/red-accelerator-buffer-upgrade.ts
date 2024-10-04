import {LimitedUpgrade} from "../generators/limited-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class RedAcceleratorBufferUpgrade extends LimitedUpgrade {
  name: string = 'red-accelerator-buffer';
  displayName: string = 'Red Accelerator Buffer';
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);

  override action(): undefined {
    HoldingRecord.redAccelerators.buffed = true;
    return super.action();
  }

  getDescription(): string {
    return "Increases the buy multiplier of the red generators and the Increase Multiplier upgrade.";
  }
}
