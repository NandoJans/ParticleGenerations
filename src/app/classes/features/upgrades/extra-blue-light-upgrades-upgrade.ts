import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ExtraBlueLightUpgradesUpgrade extends BlueUpgrade {
  baseCost: Num = new Num(1, 26);
  cost: Num = new Num(1, 26);
  override buffer: Num = new Num(1.1, 1);
  override baseBuffer: Num = new Num(1.1, 1);
  increase: Num = new Num(1, 1);
  displayName: string = "More Fusion Effect";
  name: string = "extra-blue-light-upgrades";
  override oneTime: boolean = true;

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    UpgradeRecord.yellowFusionEffectIncreaser.limit.setValue(buff);
    return buff;
  }

  getDescription(): string {
    return `Multiply yellow fusion effect increaser by ${this.buffer.toString(true)}x`;
  }

}
