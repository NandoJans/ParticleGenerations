import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {RedUpgrade} from "./red-upgrade";

export class FirstRedAcceleratorBoosterUpgrade extends RedUpgrade {
  name: string = 'red-accelerator-booster-1'
  displayName: string = 'Boost accelerator upgrade 1';

  baseCost: Num = new Num(1, 95);
  cost: Num = new Num(1, 95);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override buffer: Num = new Num(0.5, 0);
  override baseBuffer: Num = new Num(0.5, 0);
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.firstRedAcceleratorMultiplier.buffer.add(this.buffer);
    return undefined
  }

  getDescription(): string {
    return "Increases the multiplier of the first red accelerator upgrade by " + this.buffer.toString();
  }
}
