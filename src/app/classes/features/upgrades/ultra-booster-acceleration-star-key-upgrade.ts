import {StarKeyUpgrade} from "./star-key-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UltraBoosterAccelerationStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Ultra Booster Acceleration";

  constructor(saveName: string) {
    super(
      saveName,
      'ultra-booster-acceleration-star-key-upgrade',
    );
  }

  override calculationOrder: number = 1010;

  override buffer: Num = new Num(1, 1);
  override baseBuffer: Num = new Num(1, 1);

  override getDescription(): string {
    return `Multiply the power of booster acceleration by ${this.buffer.toString(2)}x`;
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      UpgradeRecord.boosterAccelerationUpgrade.buffer = UpgradeRecord.boosterAccelerationUpgrade.buffer.mul(this.buffer);
    }
    return;
  }
}
