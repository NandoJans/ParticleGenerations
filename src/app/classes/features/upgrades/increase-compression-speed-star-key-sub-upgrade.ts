import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {StarKeySubUpgrade} from "./star-key-sub-upgrade";

export class IncreaseCompressionSpeedStarKeySubUpgrade extends StarKeySubUpgrade {
  override displayName: string = "Increase Compression Speed";

  constructor(saveName: string) {
    super(
      saveName,
      'increase-compression-speed-star-key-sub-upgrade',
    );
  }

  override getDescription(): string {
    return `${this.buffer.toString(2)}x Compression Speed`
  }

  override action(): Num | undefined {
    if (this.hasBought()) {
      const effect = this.buffer.pow(this.amount);
      MultiplierRecord.starKeyCompressionSpeed.correct(effect)
      return effect;
    }
    return;
  }

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  override baseCost: Num = new Num(5, 8);
  override cost: Num = new Num(5, 8);
  override increase: Num = new Num(2, 2);
  override startIncrease: Num = new Num(2, 2);
}
