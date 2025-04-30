import { Num } from "src/app/num";
import {YellowUpgrade} from "./yellow-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class MultiplyRedGeneratorExtensionYellowUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'multiply-red-generator-extension-yellow');
  }
  displayName: string = 'Multiply Red Extension';

  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);

  getDescription(): string {
    return "Multiply red extension buffer by " + this.buffer.toString(2) + "x";
  }
  action(): undefined {
    const effect: Num = this.buffer.pow(this.amount);
    UpgradeRecord.redGeneratorExtension.buffer = UpgradeRecord.redGeneratorExtension.buffer.mul(effect)
    return;
  }

  limit: Num = new Num(1, 0);
  baseCost: Num = new Num(4, 0);
  cost: Num = new Num(4, 0);
}
