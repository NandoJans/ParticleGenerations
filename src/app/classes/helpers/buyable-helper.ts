import {Num} from "../../num";
import {Buyable} from "../features/buyable";
import {ResetKey} from "../enums/reset-key";
import {ResetHelper} from "./reset-helper";
import {Transaction} from "../features/interfaces/transaction";

export class BuyableHelper {
  constructor(private buyable: Buyable) {
  }

  buyAction () {
    const buyable = this.buyable
    if (buyable.currency.amount.greq(buyable.cost)) {
      if (buyable.amount !== undefined) buyable.amount = buyable.amount.add(new Num(1, 0));
      // @ts-ignore
      buyable.bought = buyable.bought.add(new Num(1, 0));
      this.correct();
    }
  }

  bulkBuyAction (cost: Num, bulk: Num) {
    const buyable = this.buyable
    buyable.currency.amount = buyable.currency.amount.sub(cost);
    buyable.amount = buyable.amount.add(bulk);
    // @ts-ignore
    buyable.bought = buyable.bought.add(bulk);
    this.correct();
  }

  calculateBulk(buyable: Buyable, split: Num = new Num(1, 0)) {
    const a = buyable.increase
    const b = buyable.scaling
    const c = buyable.bought
    let x = buyable.currency.amount.div(split)
    const y = buyable.baseCost
    const two = new Num(2, 0)
    const four = new Num(4, 0)
    let futureBuying: Num;
    let futureCost: Num;
    if (buyable.scalingStart !== undefined) {
      futureBuying = x.div(y).ln().div(a.ln()).floor() as Num
      // @ts-ignore
      futureCost = y.mul(a.pow(futureBuying))
      if (futureCost.greq(buyable.scalingStart)) {
        x = buyable.scalingStart
        let buyUntilScaling = x.div(y).ln().div(a.ln()).floor()
        // @ts-ignore
        futureCost = y.mul(buyable.increase.pow(buyUntilScaling))
        let leftOverCurrency = buyable.currency.amount.div(futureCost)
        // @ts-ignore
        let postScalingBuying = a.ln().sub(a.ln().pow(two).add(four.mul(b.ln()).mul(leftOverCurrency.div(y).ln())).sqrt()).div(two.mul(b.ln()))
        // @ts-ignore
        postScalingBuying = postScalingBuying.negate().floor()
        futureBuying = buyUntilScaling.add(postScalingBuying)
        futureCost = futureCost.mul(a.mul(b.pow(postScalingBuying)).pow(postScalingBuying))
      }
    } else {
      if (b.greq(new Num(1.1, 0))) {
        // @ts-ignore
        futureBuying = a.ln().sub(a.ln().pow(two).add(four.mul(b.ln()).mul(x.div(y).ln())).sqrt()).div(two.mul(b.ln()))
        // @ts-ignore
        futureBuying = futureBuying.negate().floor()
      } else {
        futureBuying = x.div(y).ln().div(a.ln()).floor()
      }
      // @ts-ignore
      futureCost = y.mul(a.mul(b.pow(futureBuying)).pow(futureBuying))
    }
    // @ts-ignore
    futureBuying = futureBuying.sub(c).add(new Num(1, 0))
    return [futureBuying, futureCost]
  }

  buy(): Transaction {
    const buyable = this.buyable
    const transaction = {
      cost: new Num(0, 0),
      amount: new Num(0, 0),
      currency: buyable.currency,
    }
    if (buyable.currency.amount.greq(buyable.cost)) {
      if (buyable.resets !== 'none' || (buyable.noMax !== undefined && buyable.noMax) || buyable.oneTime) {
        this.buyAction();

        transaction.cost = buyable.cost;
        transaction.amount = new Num(1, 0);

        if (buyable.resets !== 'none') ResetHelper.reset(buyable.resets || ResetKey.NONE);
      } else {
        const result = this.calculateBulk(buyable)

        if (result[0].greq(new Num(1, 0)) && buyable.currency.amount.greq(result[1])) {
          if (buyable.limit !== undefined && result[0].greq(buyable.limit)) result[0] = buyable.limit;
          this.bulkBuyAction(result[1], result[0]);

          transaction.cost = result[1];
          transaction.amount = result[0];
        }
      }
    }
    return transaction;
  }

  compare() {
    const buyable = this.buyable
    if (buyable.currency.amount.greq(buyable.cost) && buyable.unlocked && buyable.auto &&
      (buyable.limit === undefined || !buyable.bought.greq(buyable.limit.sub(new Num(1, 0))))) {
      if (buyable.resets !== 'none' || buyable.oneTime) {
        if ((buyable.oneTime && !buyable.bought.greq(new Num(1, 0))) || !buyable.oneTime) this.buyAction();
        if (buyable.resets !== 'none') ResetHelper.reset(buyable.resets || ResetKey.NONE);
      } else {
        const result = this.calculateBulk(buyable)

        if (result[0].greq(new Num(1, 0)) && buyable.currency.amount.greq(result[1])) {
          this.bulkBuyAction(result[1], result[0]);
        }
      }
    }
  }

  correct() {
    const buyable = this.buyable
    if (!buyable.bought.greq(new Num(1, 0))) {
      buyable.cost = buyable.baseCost

    } else {
      if (buyable.scalingStart === undefined) {
        buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought)).pow(buyable.bought))
      } else {
        buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyable.bought))
        if (buyable.cost.greq(buyable.scalingStart)) {
          let buyableAmount = buyable.scalingStart.div(buyable.baseCost).ln().div(buyable.increase.ln()).floor()
          buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyableAmount))

          let postBought = buyable.bought.sub(buyableAmount);
          buyable.cost = buyable.cost.mul(buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(postBought)).pow(postBought)))
        }
      }
    }
  }
}
