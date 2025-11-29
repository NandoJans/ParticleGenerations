import {Num} from "../../num";
import {Buyable} from "../features/buyable";
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

    // Apply super-scaling adjustment if configured and threshold would be crossed
    if (buyable.superScalingStart !== undefined && 
        buyable.superScaling.gt(new Num(1, 0))) {
      const finalBought = c.add(futureBuying);
      
      // If the bulk purchase would cross or exceed super-scaling threshold
      if (finalBought.greq(buyable.superScalingStart)) {
        // Iteratively reduce bulk amount and recalculate cost with super-scaling
        // until we find an affordable amount or reach single purchase
        let adjustedBulk = futureBuying.copy();
        
        while (adjustedBulk.gt(new Num(0, 0))) {
          const testFinalBought = c.add(adjustedBulk);
          
          // Calculate base cost for this bulk amount (without super-scaling)
          let baseCostForBulk: Num;
          if (buyable.scalingStart === undefined) {
            // Standard scaling formula: baseCost * (increase * scaling^finalBought)^bulk
            baseCostForBulk = y.mul(a.mul(b.pow(testFinalBought)).pow(adjustedBulk));
          } else {
            // With scaling start: simplified to baseCost * increase^bulk
            baseCostForBulk = y.mul(a.pow(adjustedBulk));
          }
          
          // Apply super-scaling multiplier if above threshold
          let totalCost = baseCostForBulk;
          if (testFinalBought.greq(buyable.superScalingStart)) {
            const superScalingPurchases = testFinalBought.sub(buyable.superScalingStart);
            const superScalingMultiplier = buyable.superScaling.pow(superScalingPurchases.mul(superScalingPurchases));
            totalCost = baseCostForBulk.mul(superScalingMultiplier);
          }
          
          // Check if this is affordable
          if (buyable.currency.amount.greq(totalCost)) {
            futureBuying = adjustedBulk;
            futureCost = totalCost;
            break;
          }
          
          // Reduce bulk amount
          adjustedBulk = adjustedBulk.sub(new Num(1, 0));
        }
        
        // If we reduced to 0, set to minimum of 1 purchase
        if (adjustedBulk.lte(new Num(0, 0))) {
          futureBuying = new Num(1, 0);
          // Recalculate cost for single purchase
          const singleFinalBought = c.add(new Num(1, 0));
          let singleBaseCost = y.mul(a);
          if (singleFinalBought.greq(buyable.superScalingStart)) {
            const superScalingPurchases = singleFinalBought.sub(buyable.superScalingStart);
            const superScalingMultiplier = buyable.superScaling.pow(superScalingPurchases.mul(superScalingPurchases));
            singleBaseCost = singleBaseCost.mul(superScalingMultiplier);
          }
          futureCost = singleBaseCost;
        }
      }
    }

    return [futureBuying, futureCost]
  }

  buy(): Transaction {
    const buyable = this.buyable;
    const transaction: Transaction = {
      cost: new Num(0, 0),
      amount: new Num(0, 0),
      currency: buyable.currency,
    };

    // Not enough currency → nothing happens
    if (!buyable.currency.amount.greq(buyable.cost)) {
      return transaction;
    }

    // Single-buy path (one-time only)
    if (buyable.oneTime) {
      this.buyAction();

      transaction.cost = buyable.cost;
      transaction.amount = new Num(1, 0);

      return transaction;
    }

    // Bulk-buy path with fallback to single-buy
    let [bulk, bulkCost] = this.calculateBulk(buyable);

    // Respect limit if present
    if (buyable.limit !== undefined && bulk.greq(buyable.limit)) {
      bulk = buyable.limit.copy();
      // bulkCost still from calculateBulk; if that makes it unaffordable,
      // we fall back to single-buy below.
    }

    if (bulk.greq(new Num(1, 0)) && buyable.currency.amount.greq(bulkCost)) {
      this.bulkBuyAction(bulkCost, bulk);

      transaction.cost = bulkCost.mul(buyable.costMultiplier);
      transaction.amount = bulk;
    } else {
      // Fallback: we already know at least one buy is affordable
      this.buyAction();

      transaction.cost = buyable.cost;
      transaction.amount = new Num(1, 0);
    }

    // Trigger reset after buying if needed
    if (buyable.resets !== 'none') {
      ResetHelper.reset(buyable.resets);
    }

    return transaction;
  }


  compare() {
    const buyable = this.buyable
    if (buyable.currency.amount.greq(buyable.cost) && buyable.unlocked && buyable.auto &&
      (buyable.limit === undefined || !buyable.bought.greq(buyable.limit.sub(new Num(1, 0))))) {
      if (buyable.oneTime) {
        if (!buyable.bought.greq(new Num(1, 0))) this.buyAction();
      } else {
        const result = this.calculateBulk(buyable)

        if (result[0].greq(new Num(1, 0)) && buyable.currency.amount.greq(result[1])) {
          this.bulkBuyAction(result[1], result[0]);
        }
        // Trigger reset after bulk buying if needed
        if (buyable.resets !== 'none') ResetHelper.reset(buyable.resets);
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

    // Apply super-scaling if the threshold is reached and super-scaling is configured
    if (buyable.superScalingStart !== undefined && 
        buyable.superScaling.gt(new Num(1, 0)) &&
        buyable.bought.greq(buyable.superScalingStart)) {
      const superScalingPurchases = buyable.bought.sub(buyable.superScalingStart);
      // Super-scaling adds an additional exponential cost multiplier
      buyable.cost = buyable.cost.mul(buyable.superScaling.pow(superScalingPurchases.mul(superScalingPurchases)));
    }

    buyable.cost = buyable.cost.mul(buyable.costMultiplier);
    buyable.costMultiplier = new Num(1, 0);
  }
}
