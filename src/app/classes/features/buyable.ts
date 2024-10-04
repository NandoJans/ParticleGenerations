import {Num} from "../../num";
import {Holding} from "./holding";
import {GameElement} from "./game-element";
import {BuyableHelper} from "../helpers/buyable-helper";
import {ResetKey} from "../enums/reset-key";
import {Transaction} from "./interfaces/transaction";
import {ResetHelper} from "../helpers/reset-helper";

export abstract class Buyable extends GameElement {
  abstract amount: Num
  abstract baseCost: Num
  abstract cost: Num
  abstract increase: Num
  scalingStart: Num = new Num(1, 0)
  scaling: Num = new Num(1, 0)
  limit: Num | undefined = undefined
  abstract bought: Num
  abstract currency: Holding
  resets: ResetKey | undefined = undefined
  noMax: boolean = true
  oneTime: boolean = false
  auto: boolean = false
  // TODO: add the methods from buyable service

  getBuyableHelper(): BuyableHelper {
    return new BuyableHelper(this)
  }

  buy(amount: Num): Transaction {
    if (this.resets) {
      ResetHelper.reset(this.resets)
    }
    return this.getBuyableHelper().buy()
  }

  correctCost(): void {
    this.getBuyableHelper().correct()
  }

  hasBought(): boolean {
    return this.bought.greq(new Num(1, 0))
  }
}
