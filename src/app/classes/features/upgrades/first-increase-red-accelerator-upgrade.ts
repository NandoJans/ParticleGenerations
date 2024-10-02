import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {YellowUpgrade} from "./yellow-upgrade";

export class FirstIncreaseRedAcceleratorUpgrade extends YellowUpgrade {
  name: string = 'increase-red-accelerator-upgrade-1';
  displayName: string = 'Red accelerator buffer 1';

  baseCost: Num = new Num(4, 0);
  cost: Num = new Num(4, 0);

  override baseBuffer: Num = new Num(1, 0);
  override buffer: Num = new Num(1, 0);
  override oneTime: boolean = true;

  override action(): undefined {
    UpgradeRecord.firstRedAcceleratorMultiplier.buffer.add(this.buffer)
    return undefined
  }

  override getDescription(): string {
    return 'Increases the multiplier of the first red accelerator upgrade by '+this.buffer.toString(true)+'.';
  }
}
