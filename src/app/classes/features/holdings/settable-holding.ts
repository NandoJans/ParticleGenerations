import {Holding} from "../holding";
import {Num} from "../../../num";

export abstract class SettableHolding extends Holding {
  influences: Num[] = [];

  override action(): undefined {
    this.amount = new Num(0, 0);
    this.influences.forEach((influence: Num) => {
      this.amount = this.amount.add(influence, false);
    });
    return undefined
  }

  addInfluence(num: Num): void {
    this.influences.push(num);
  }
}
