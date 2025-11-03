import {StarKeyUpgrade} from "./star-key-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class UltraYellowPowerStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Ultra Yellow Power";

  constructor(saveName: string) {
    super(
      saveName,
      'ultra-yellow-power-star-key-upgrade',
    );
  }

  override calculationOrder: number = 500;

  override buffer: Num = new Num(1.2, 0);
  override baseBuffer: Num = new Num(1.2, 0);

  override getDescription(): string {
    return `Multiply the power of yellow power by ${this.buffer.toString(2)}x`;
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      HoldingRecord.yellowPower.yellowPower = HoldingRecord.yellowPower.yellowPower.mul(this.buffer);
    }
    return;
  }
}
