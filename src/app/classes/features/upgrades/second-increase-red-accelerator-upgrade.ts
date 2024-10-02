import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {YellowUpgrade} from "./yellow-upgrade";

export class SecondIncreaseRedAcceleratorUpgrade extends YellowUpgrade {
  name: string = 'increase-red-accelerator-upgrade-2';
  displayName: string = 'Red accelerator buffer 2';

  baseCost: Num = new Num(5, 0);
  cost: Num = new Num(5, 0);

  override baseBuffer: Num = new Num(1.5, 0);
  override buffer: Num = new Num(1.5, 0);
  override oneTime: boolean = true;

  override action(): undefined {
    UpgradeRecord.secondRedAcceleratorMultiplier.buffer.add(this.buffer)
    return undefined
  }

  override getDescription(): string {
    return 'Increases the multiplier of the second red accelerator upgrade by '+this.buffer.toString(true)+'.';
  }
}
