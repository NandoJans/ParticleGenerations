import {Num} from "../../num";
import {Holding} from "./holding";
import {GameElement} from "./game-element";
import {BuyableHelper} from "../helpers/buyable-helper";
import {ResetKey} from "../enums/reset-key";

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

  buy(amount: Num): void {
    this.getBuyableHelper().buy()
  }

  correctCost(): void {
    this.getBuyableHelper().correct()
  }
}
