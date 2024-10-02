import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {RedUpgrade} from "./red-upgrade";

export class SecondRedAcceleratorBoosterUpgrade extends RedUpgrade {
  name: string = 'red-accelerator-booster-2'
  displayName: string = 'Boost accelerator upgrade 2';

  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.firstRedAcceleratorMultiplier.buffer.add(this.buffer);
    return undefined
  }

  getDescription(): string {
    return "Increases the multiplier of the second red accelerator upgrade by " + this.buffer.toString();
  }
}
