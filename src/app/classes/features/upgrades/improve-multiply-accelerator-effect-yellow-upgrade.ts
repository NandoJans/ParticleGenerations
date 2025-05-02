import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ImproveMultiplyAcceleratorEffectYellowUpgrade extends YellowUpgrade {
  displayName: string = 'Improve Multiply Accelerator Effect';
  constructor(saveName: string) {
    super(saveName, 'improve-multiply-accelerator-effect-yellow');
  }

  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);

  getDescription(): string {
    return "Multiply Accelerator Effect effect is multiplied by " + this.buffer.toString(2) + "x";
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.multiplyRedAcceleratorEffectUpgrade.buffer = UpgradeRecord.multiplyRedAcceleratorEffectUpgrade.buffer.mul(this.buffer)
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1.5, 2);
  cost: Num = new Num(1.5, 2);
}
