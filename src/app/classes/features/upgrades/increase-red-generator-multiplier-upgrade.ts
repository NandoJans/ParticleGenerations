import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class IncreaseRedGeneratorMultiplierUpgrade extends YellowUpgrade {
  name: string = 'increase-red-generator-multiplier';
  displayName: string = 'Multiplier increaser';

  baseCost: Num = new Num(3, 0);
  cost: Num = new Num(3, 0);

  override baseBuffer: Num = new Num(3, 0);
  override buffer: Num = new Num(3, 0);
  override oneTime: boolean = true;

  override action(): undefined {
    UpgradeRecord.redGeneratorExtension.buffer = this.buffer
    return undefined
  }

  override getDescription(): string {
    return 'Sets the multiplier of red generators to '+this.buffer.toString(true)+'.';
  }
}
