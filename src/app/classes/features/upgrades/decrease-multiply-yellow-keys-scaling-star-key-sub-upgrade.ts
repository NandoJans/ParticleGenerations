import {StarKeySubUpgrade} from "./star-key-sub-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class DecreaseMultiplyYellowKeysScalingStarKeySubUpgrade extends StarKeySubUpgrade {
  override displayName: string = "Decrease Multiply Yellow Keys Scaling";

  constructor(saveName: string) {
    super(
      saveName,
      'decrease-multiply-yellow-keys-scaling-star-key-sub-upgrade',
    );
  }

  override getDescription(): string {
    return `Multiply YK scaling / ${this.buffer.toString(2)}`
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      const effect = this.buffer.pow(this.amount);
      UpgradeRecord.multiplyYellowKeyGain.scaling = (new Num(9, 0)).div(effect).add(new Num(1, 0));
      return effect;
    }
    return;
  }

  override effectString(): string {
    if (this.effect === undefined) return "";
    return "/ " + this.effect?.toString(2);
  }

  override buffer: Num = new Num(1.3, 0);
  override baseBuffer: Num = new Num(1.3, 0);

  override baseCost: Num = new Num(1, 9);
  override cost: Num = new Num(1, 9);
  override increase: Num = new Num(1, 3);
  override startIncrease: Num = new Num(1, 3);
}
