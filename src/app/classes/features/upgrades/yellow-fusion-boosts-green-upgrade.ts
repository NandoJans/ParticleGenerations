import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class YellowFusionBoostsGreenUpgrade extends BlueUpgrade {
  baseCost: Num = new Num(1, 4);
  cost: Num = new Num(1, 4);
  override buffer: Num = new Num(1, -3);
  override baseBuffer: Num = new Num(1, -3);
  increase: Num = new Num(1, 0);
  displayName: string = "Yellow Fusion Boosts Green";
  name: string = "yellow-fusion-boosts-green";
  override oneTime: boolean = true;

  action(): Num {
      const buff: Num = HoldingRecord.yellowFusion.amount.pow(this.buffer, false);
      MultiplierRecord.greenParticleGenerators.correct(buff);
      return buff;
  }

  getDescription(): string {
    return `Multiply green particle generators by ${this.buffer.toString(true)}x`;
  }

}
