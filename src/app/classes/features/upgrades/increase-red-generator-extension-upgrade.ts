import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class IncreaseRedGeneratorExtensionUpgrade extends YellowUpgrade {
  name: string = 'increase-red-generator-extension';
  displayName: string = 'Red extension booster';

  baseCost: Num = new Num(7, 0);
  cost: Num = new Num(7, 0);

  override baseBuffer: Num = new Num(2, 0);
  override buffer: Num = new Num(2, 0);
  override oneTime: boolean = true;

  override action(): undefined {
    UpgradeRecord.redGeneratorExtension.buffer.mul(this.buffer)
    return undefined
  }

  override getDescription(): string {
    return 'Increase the multiplier of the red generator extension by '+this.buffer.toString()+'.';
  }
}
