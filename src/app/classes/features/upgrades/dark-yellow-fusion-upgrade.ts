import {DarkUpgrade} from "./dark-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class DarkYellowFusionUpgrade extends DarkUpgrade {
  name: string = 'dark-yellow-fusion';
  displayName: string = 'Dark Yellow Fusion';

  override buffer = new Num(1, 5);
  override baseBuffer = new Num(1, 5);

  getDescription(): string {
    return "Increase maximum yellow fusion by " + this.buffer + ".";
  }

  override action(): Num {
    super.action();
    const buff: Num = HoldingRecord.yellowFusion.startMaxAmount
      .mul(this.buffer.pow(this.bought, false), false)
    HoldingRecord.yellowFusion.maxAmount = buff;

    return buff;
  }
}
