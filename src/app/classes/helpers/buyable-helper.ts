import {Num} from "../../num";
import {ResetService} from "../../services/interactables/reset.service";
import {NavigationsService} from "../../services/navigations.service";
import {Buyable} from "../features/buyable";
import {ResetKey} from "../enums/reset-key";
import {Transaction} from "../features/interfaces/transaction";

export class BuyableHelper {
  constructor(private buyable: Buyable) {
  }

  buyAction (): Transaction {
    const buyable = this.buyable
    buyable.currency.amount.greq(buyable.cost)
    if (buyable.amount !== undefined) buyable.amount.add(new Num(1, 0));
    // @ts-ignore
    buyable.bought.add(new Num(1, 0));
    this.correct();

    return {
      amount: new Num(1, 0),
      cost: buyable.cost,
      currency: buyable.currency
    }
  }

  bulkBuyAction (cost: Num, bulk: Num): Transaction {
    const buyable = this.buyable
    buyable.currency.amount.sub(cost);
    buyable.amount.add(bulk);
    // @ts-ignore
    buyable.bought.add(bulk);
    this.correct();

    return {
      amount: bulk,
      cost: cost,
      currency: buyable.currency
    }
  }

  calculateBulk(buyable: Buyable, split: Num = new Num(1, 0)) {
    const a = buyable.increase
    const b = buyable.scaling
    const c = buyable.bought
    let x = buyable.currency.amount.div(split, false)
    const y = buyable.baseCost
    const two = new Num(2, 0)
    const four = new Num(4, 0)
    let futureBuying: Num;
    let futureCost: Num;
    if (buyable.scalingStart !== undefined) {
      futureBuying = x.div(y, false).ln(false).div(a.ln(false), false).floor(false) as Num
      // @ts-ignore
      futureCost = y.mul(a.pow(futureBuying, false), false)
      if (futureCost.greq(buyable.scalingStart)) {
        x = buyable.scalingStart
        let buyUntilScaling = x.div(y, false).ln(false).div(a.ln(false), false).floor(false)
        // @ts-ignore
        futureCost = y.mul(buyable.increase.pow(buyUntilScaling, false), false)
        let leftOverCurrency = buyable.currency.amount.div(futureCost, false)
        // @ts-ignore
        let postScalingBuying = a.ln(false).sub(a.ln(false).pow(two, false).add(four.mul(b.ln(false), false).mul(leftOverCurrency.div(y, false).ln(false), false), false).sqrt(false), false).div(two.mul(b.ln(false), false), false)
        // @ts-ignore
        postScalingBuying = postScalingBuying.negate(false).floor(false)
        futureBuying = buyUntilScaling.add(postScalingBuying, false)
        futureCost = futureCost.mul(a.mul(b.pow(postScalingBuying, false), false).pow(postScalingBuying, false), false)
      }
    } else {
      if (b.greq(new Num(1.1, 0))) {
        // @ts-ignore
        futureBuying = a.ln(false).sub(a.ln(false).pow(two, false).add(four.mul(b.ln(false), false).mul(x.div(y, false).ln(false), false), false).sqrt(false), false).div(two.mul(b.ln(false), false), false)
        // @ts-ignore
        futureBuying = futureBuying.negate(false).floor(false)
      } else {
        futureBuying = x.div(y, false).ln(false).div(a.ln(false), false).floor(false)
      }
      // @ts-ignore
      futureCost = y.mul(a.mul(b.pow(futureBuying, false), false).pow(futureBuying, false), false)
    }
    // @ts-ignore
    futureBuying = futureBuying.sub(c, false).add(new Num(1, 0), false)
    return [futureBuying, futureCost]
  }

  buy() {
    const buyable = this.buyable
    if (buyable.currency.amount.greq(buyable.cost)) {
      if (buyable.resets !== 'none' || (buyable.noMax !== undefined && buyable.noMax) || buyable.oneTime) {
        const transaction = this.buyAction();
        if (buyable.resets !== 'none') ResetService.reset(buyable.resets || ResetKey.NONE);
        return transaction;
      } else {
        const result = this.calculateBulk(buyable)

        // @ts-ignore
        if (result[0].greq(new Num(1, 0)) && buyable.currency.amount.greq(result[1])) {
          if (buyable.limit !== undefined && result[0].greq(buyable.limit)) result[0] = buyable.limit;
          // @ts-ignore
          return this.bulkBuyAction(result[1], result[0]);
        }
      }
    }

    return {
      amount: new Num(0, 0),
      cost: new Num(0, 0),
      currency: buyable.currency
    }
  }

  compare(): Transaction {
    const buyable = this.buyable

    if (buyable.currency.amount.greq(buyable.cost) && buyable.unlocked && buyable.auto &&
      // @ts-ignore
      (buyable.limit === undefined || !buyable.bought.greq(buyable.limit.sub(new Num(1, 0), false)))) {
      if (buyable.resets !== 'none' || buyable.oneTime) {
        if ((buyable.oneTime && !buyable.bought.greq(new Num(1, 0))) || !buyable.oneTime) return this.buyAction();
        if (buyable.resets !== 'none') ResetService.reset(buyable.resets || ResetKey.NONE);
      } else {
        const result = this.calculateBulk(buyable)

        // @ts-ignore
        if (result[0].greq(new Num(1, 0)) && buyable.currency.amount.greq(result[1])) {
          // @ts-ignore
          return this.bulkBuyAction(buyable, result[1], result[0]);
        }
      }
    }

    return {
      amount: new Num(0, 0),
      cost: new Num(0, 0),
      currency: buyable.currency
    }
  }

  correct() {
    const buyable = this.buyable
    if (!buyable.bought.greq(new Num(1, 0))) {
      buyable.cost = buyable.baseCost

    } else if (buyable.oneTime) {

    } else {
      if (buyable.scalingStart === undefined) {
        // @ts-ignore
        buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought, false), false).pow(buyable.bought, false), false)
      } else {
        // @ts-ignore
        buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyable.bought, false), false)
        if (buyable.cost.greq(buyable.scalingStart)) {
          // @ts-ignore
          let buyableAmount = buyable.scalingStart.div(buyable.baseCost, false).ln(false).div(buyable.increase.ln(false), false).floor(false)
          // @ts-ignore
          buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyableAmount, false), false)

          let postBought = buyable.bought.sub(buyableAmount, false);
          // @ts-ignore
          buyable.cost.mul(buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(postBought, false), false).pow(postBought, false), false))
        }
      }
    }
  }
}
