import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class IncreaseRedGeneratorBoosterUpgrade extends YellowUpgrade {
  name: string = 'increase-red-generator-booster';
  displayName: string = 'Red booster extension';

  baseCost: Num = new Num(8, 0);
  cost: Num = new Num(8, 0);

  override baseBuffer: Num = new Num(0.6, 0);
  override buffer: Num = new Num(0.6, 0);
  override oneTime: boolean = true;

  override action(): undefined {
    UpgradeRecord.redGeneratorBooster.buffer.mul(this.buffer)
    return undefined
  }

  override getDescription(): string {
    return 'Increases the multiplier of the red generator booster by '+this.buffer.toString()+'.';
  }
}
