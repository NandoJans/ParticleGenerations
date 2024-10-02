import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {RedUpgrade} from "./red-upgrade";

export class RedBoosterScalingUpgrade extends RedUpgrade {
  name: string = 'red-booster-scaling-upgrade'
  displayName: string = 'Booster Cost Decreaser';

  baseCost: Num = new Num(1, 80);
  cost: Num = new Num(1, 80);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.redGeneratorBooster.scaling.div(this.buffer);
    return undefined
  }

  getDescription(): string {
    return "Set the cost scaling of the red generator booster to " + this.buffer.toString();
  }
}
