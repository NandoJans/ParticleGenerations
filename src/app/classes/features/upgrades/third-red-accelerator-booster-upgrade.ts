import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ThirdRedAcceleratorBoosterUpgrade extends RedUpgrade {
  name: string = 'red-accelerator-booster-3'
  displayName: string = 'Boost accelerator upgrade 3';

  baseCost: Num = new Num(1, 105);
  cost: Num = new Num(1, 105);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.firstRedAcceleratorMultiplier.buffer.add(this.buffer);
    return undefined
  }

  getDescription(): string {
    return "Increases the multiplier of the third red accelerator upgrade by " + this.buffer.toString();
  }
}
