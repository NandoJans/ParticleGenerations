import { Num } from "src/app/num";
import {StarKeySubUpgrade} from "./star-key-sub-upgrade";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class IncreaseKeyAmountStarKeySubUpgrade extends StarKeySubUpgrade {
  override displayName: string = "Increase Key Amount";

  constructor(saveName: string) {
    super(
      saveName,
      'increase-key-amount-star-key-sub-upgrade',
    );
  }

  override getDescription(): string {
    return `${this.buffer.toString(2)}x Key Amount`
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      const effect = this.buffer.pow(this.amount);
      MultiplierRecord.yellowKeyGain.correct(effect);
      return effect;
    }
    return;
  }

  override buffer: Num = new Num(3, 0);
  override baseBuffer: Num = new Num(3, 0);

  override scaling: Num = new Num(3, 0);
  override scalingStart: Num = new Num(1, 20);

  override baseCost: Num = new Num(1, 8);
  override cost: Num = new Num(1, 8);
  override increase: Num = new Num(1, 2);
  override startIncrease: Num = new Num(1, 2);
}
