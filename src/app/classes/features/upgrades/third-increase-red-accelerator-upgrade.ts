import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ThirdIncreaseRedAcceleratorUpgrade extends YellowUpgrade {
  name: string = 'increase-red-accelerator-upgrade-3';
  displayName: string = 'Red accelerator buffer 3';

  baseCost: Num = new Num(6, 0);
  cost: Num = new Num(6, 0);

  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);
  override oneTime: boolean = true;

  override action(): undefined {
    UpgradeRecord.secondRedAcceleratorMultiplier.buffer.add(this.buffer)
    return undefined
  }

  override getDescription(): string {
    return 'Increases the multiplier of the third red accelerator upgrade by '+this.buffer.toString(true)+'.';
  }
}
