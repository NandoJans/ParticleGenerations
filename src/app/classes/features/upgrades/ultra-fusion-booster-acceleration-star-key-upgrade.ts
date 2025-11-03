import {StarKeyUpgrade} from "./star-key-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UltraFusionBoosterAccelerationStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Ultra Fusion Booster Acceleration";
  constructor(saveName: string) {
    super(
      saveName,
      'ultra-fusion-booster-acceleration-star-key-upgrade',
    );
  }

  override calculationOrder: number = 1000;

  override buffer: Num = new Num(1, 1);
  override baseBuffer: Num = new Num(1, 1);

  override getDescription(): string {
    return `Multiply the power of fusion booster accelerations by ${this.buffer.toString(2)}x`;
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      UpgradeRecord.fusionBoosterAcceleration.buffer = UpgradeRecord.fusionBoosterAcceleration.buffer.mul(this.buffer);
    }
    return;
  }
}
