import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {StarKeyUpgrade} from "./star-key-upgrade";

export class DelayedBoosterScalingStarKeyUpgrade extends StarKeyUpgrade {
  override displayName: string = "Delayed Booster Scaling";

  constructor(saveName: string) {
    super(
      saveName,
      'delayed-booster-scaling-star-key-upgrade',
    );
  }

  override calculationOrder: number = 1010;

  override buffer: Num = new Num(1, 5000);
  override baseBuffer: Num = new Num(1, 5000);

  override getDescription(): string {
    return `Delay scaling start of boosters to ${this.buffer.toString(2)}`;
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      UpgradeRecord.redGeneratorBooster.scalingStart = this.buffer.copy();
    }
    return;
  }
}
