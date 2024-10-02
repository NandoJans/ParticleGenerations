import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class RedBoosterMultiplierUpgrade extends RedUpgrade {
  name: string = 'red-booster-multiplier-upgrade'
  displayName: string = 'Booster Multiplier Amplifier';

  baseCost: Num = new Num(1, 80);
  cost: Num = new Num(1, 80);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override buffer: Num = new Num(1.1, 0);
  override baseBuffer: Num = new Num(1.1, 0);
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.redGeneratorBooster.buffer.add(this.buffer);
    return undefined
  }

  getDescription(): string {
    return "Increase the multiplier of the red generator booster by " + this.buffer.toString(true) + ".";
  }
}
