import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ImproveRedGeneratorExtensionUpgrade extends RedUpgrade {
  name: string = 'red-generator-extension-upgrade'
  displayName: string = 'Extension Upgrade';

  baseCost: Num = new Num(1, 45);
  cost: Num = new Num(1, 45);
  bought: Num = new Num(0, 0);
  increase: Num = new Num(1, 0);
  override oneTime: boolean = true;

  action(): undefined {
    UpgradeRecord.redGeneratorExtension.buffer.mul(new Num(2, 0));
    return undefined
  }

  getDescription(): string {
    return "Red generator extension give a multiplier to red generators.";
  }
}
