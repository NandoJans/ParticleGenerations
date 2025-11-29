import {Num} from "../../num";
import {Holding} from "./holding";
import {GameElement} from "./game-element";
import {BuyableHelper} from "../helpers/buyable-helper";
import {ResetKey} from "../enums/reset-key";
import {Transaction} from "./interfaces/transaction";

export abstract class Buyable extends GameElement {
  abstract amount: Num
  abstract baseCost: Num
  abstract cost: Num
  costMultiplier: Num = new Num(1, 0);
  abstract increase: Num
  abstract startIncrease: Num
  scalingStart: Num | undefined = undefined
  scaling: Num = new Num(1, 0)
  superScalingStart: Num | undefined = undefined
  superScaling: Num = new Num(1, 0)
  limit: Num | undefined = undefined
  abstract bought: Num
  abstract currency: Holding
  resets: ResetKey = ResetKey.NONE
  noMax: boolean = false
  oneTime: boolean = false
  auto: boolean = false

  getBuyableHelper(): BuyableHelper {
    return new BuyableHelper(this)
  }

  buy(amount: Num = new Num(1, 0)): Transaction {
    this.correctCost()
    return this.getBuyableHelper().buy()
  }

  correctCost(): void {
    if (this.limit && this.bought.gt(this.limit)) {
      this.bought = this.limit.copy();
      return;
    }
    this.getBuyableHelper().correct();
  }

  hasBought(): boolean {
    return this.bought.greq(new Num(1, 0))
  }

  compare() {
    return this.getBuyableHelper().compare()
  }

  isBuyable() {
    return !this.isMaxed() && this.currency.amount.greq(this.cost);
  }

  isMaxed() {
    return this.limit !== undefined && this.bought.greq(this.limit);
  }
}
