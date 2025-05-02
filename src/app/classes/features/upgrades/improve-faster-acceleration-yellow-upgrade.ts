import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class ImproveFasterAccelerationYellowUpgrade extends YellowUpgrade {
  displayName: string = 'Improve Faster Acceleration';
  constructor(saveName: string) {
    super(saveName, 'improve-faster-acceleration-yellow');
  }

  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);

  getDescription(): string {
    return "Improve Faster Acceleration by " + this.buffer.toString(2) + "x";
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.multiplyRedAcceleratorGeneration.buffer = UpgradeRecord.multiplyRedAcceleratorGeneration.buffer.mul(this.buffer)
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
}
