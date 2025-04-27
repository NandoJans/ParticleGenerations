import { Num } from "../../num";
import { Buyable } from "../features/buyable";
import { ResetKey } from "../enums/reset-key";
import { Transaction } from "../features/interfaces/transaction";
import { ResetHelper } from "./reset-helper";

export class BuyableHelper {
  constructor(private buyable: Buyable) {}

  buyAction(): Transaction {
    const b = this.buyable;
    if (!b.currency.amount.greq(b.cost)) {
      return { amount: new Num(0, 0), cost: new Num(0, 0), currency: b.currency };
    }
    // spend
    b.currency.amount = b.currency.amount.sub(b.cost);
    // record one buy
    b.amount = b.amount.add(new Num(1, 0));
    b.bought = b.bought.add(new Num(1, 0));
    this.correct();
    return { amount: new Num(1, 0), cost: b.cost.copy(), currency: b.currency };
  }

  bulkBuyAction(cost: Num, bulk: Num): Transaction {
    const b = this.buyable;
    // spend total cost
    b.currency.amount = b.currency.amount.sub(cost);
    // record all buys
    b.amount = b.amount.add(bulk);
    b.bought = b.bought.add(bulk);
    this.correct();
    return { amount: bulk.copy(), cost: cost.copy(), currency: b.currency };
  }

  /**
   * Returns [howMany, totalCost] you can buy with `currency.amount/split`.
   */
  calculateBulk(b: Buyable, split: Num = new Num(1, 0)): [Num, Num] {
    const baseCost = b.baseCost.copy();
    const increase = b.increase.copy();
    const scaling  = b.scaling.copy();
    const bought   = b.bought.copy();
    const budget   = b.currency.amount.copy().div(split);

    if (b.scalingStart === undefined) {
      // no delayed scaling
      const extra    = this._maxExtra(budget, baseCost, increase, scaling);
      const sumCost  = this._sumTriCosts(bought, extra, baseCost, increase, scaling);
      return [extra, sumCost];
    }

    // delayed scaling: compute threshold
    const thresholdCount = b.scalingStart
      .copy()
      .div(baseCost)
      .ln()
      .div(increase.ln())
      .floor();
    const preCost = baseCost.mul(increase.pow(thresholdCount));

    if (budget.lt(preCost)) {
      // can't hit threshold: simple geometric series
      const k = budget
        .div(baseCost)
        .ln()
        .div(increase.ln())
        .floor();
      const sum = baseCost
        .mul(increase.pow(k).sub(new Num(1, 0)))
        .div(increase.sub(new Num(1, 0)));
      return [k.sub(bought), sum];
    }

    // we can hit threshold
    const rem       = budget.sub(preCost);
    const extra     = this._maxExtra(rem, preCost, increase, scaling);
    const totalBuys = thresholdCount.add(extra);
    const postSum   = this._sumTriCosts(thresholdCount, extra, baseCost, increase, scaling);
    const grandTotal = preCost.add(postSum);

    return [totalBuys.sub(bought), grandTotal];
  }

  buy(): Transaction {
    const b = this.buyable;
    // can't afford single?
    if (!b.currency.amount.greq(b.cost)) {
      return { amount: new Num(0,0), cost: new Num(0,0), currency: b.currency };
    }
    // special buys
    if (b.resets !== ResetKey.NONE || b.oneTime || b.noMax) {
      const tx = this.buyAction();
      if (b.resets !== ResetKey.NONE) ResetHelper.reset(b.resets);
      return tx;
    }
    // try bulk
    let [count, cost] = this.calculateBulk(b);
    if (count.greq(new Num(1, 0)) && b.currency.amount.greq(cost)) {
      if (b.limit && count.greq(b.limit)) {
        count = b.limit.copy();
      }
      return this.bulkBuyAction(cost, count);
    }
    // fallback to single
    return this.buyAction();
  }

  compare(): Transaction {
    const b = this.buyable;
    if (
      b.auto &&
      b.unlocked &&
      b.currency.amount.greq(b.cost) &&
      (!b.limit || b.bought.lt(b.limit.sub(new Num(1, 0))))
    ) {
      if (b.resets !== ResetKey.NONE || b.oneTime) {
        if (b.oneTime && b.bought.lt(new Num(1, 0))) return this.buyAction();
        if (!b.oneTime)                           return this.buyAction();
        if (b.resets !== ResetKey.NONE)           ResetHelper.reset(b.resets);
      } else {
        const [bulk, cost] = this.calculateBulk(b);
        if (bulk.greq(new Num(1, 0)) && b.currency.amount.greq(cost)) {
          return this.bulkBuyAction(cost, bulk);
        }
      }
    }
    return { amount: new Num(0,0), cost: new Num(0,0), currency: b.currency };
  }

  /**
   * Recalculate cost based on how many bought, with optional delayed scaling.
   */
  correct(): void {
    const b = this.buyable;
    // nothing bought?
    if (!b.bought.greq(new Num(1, 0))) {
      b.cost = b.baseCost.copy();
      return;
    }
    // one-time stays baseCost
    if (b.oneTime) return;

    const baseCost = b.baseCost.copy();
    const increase = b.increase.copy();
    const scaling  = b.scaling.copy();

    // no delayed scaling
    if (b.scalingStart === undefined) {
      b.cost = this._triCost(b.bought.copy(), baseCost, increase, scaling);
      return;
    }

    // compute threshold
    const thresholdCount = b.scalingStart
      .copy()
      .div(baseCost)
      .ln()
      .div(increase.ln())
      .floor();
    const preCost = baseCost.mul(increase.pow(thresholdCount));

    // if still below threshold
    if (b.bought.lt(thresholdCount.add(new Num(1, 0)))) {
      b.cost = baseCost.mul(increase.pow(b.bought.copy()));
    } else {
      // post-threshold triangular
      const post = b.bought.copy().sub(thresholdCount);
      b.cost = this._triCost(post, preCost, increase, scaling);
    }
  }

  // ——— private helpers ———

  /** Unified “how many extra” that picks closed-form vs. binary */
  private _maxExtra(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    // 1) Try closed-form if scaling > 1
    if (scaling.greq(new Num(1, 0))) {
      // grab all logs as JS numbers
      const lnBud = budget.ln().toNumber();
      const lnPre = preCost.ln().toNumber();
      const lnA   = increase.ln().toNumber();
      const lnB   = scaling.ln().toNumber();

      // check finiteness
      if (
        isFinite(lnBud) &&
        isFinite(lnPre) &&
        isFinite(lnA)   &&
        isFinite(lnB)
      ) {
        // build quadratic: A n^2 + B n – C = 0
        const C    = lnBud - lnPre;
        const Acoef = lnB / 2;
        const Bcoef = lnB / 2 + lnA;
        // discriminant
        const disc = Bcoef * Bcoef + 4 * Acoef * C;
        if (disc >= 0 && isFinite(disc) && Acoef !== 0) {
          const root = (-Bcoef + Math.sqrt(disc)) / (2 * Acoef);
          if (isFinite(root) && root >= 0) {
            return new Num(Math.floor(root), 0);
          }
        }
      }
    }

    // 2) Fallback to binary search
    return this._maxExtraBinary(budget, preCost, increase, scaling);
  }

  /** Original exponential+binary search for the max extra buys */
  private _maxExtraBinary(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    let lo = new Num(0, 0),
      hi = new Num(1, 0);

    // find an upper bound
    while (!this._triCost(hi, preCost, increase, scaling).greq(budget)) {
      hi = hi.mul(new Num(2, 0));
    }

    // binary search down to hi–lo < 1
    const ONE = new Num(1, 0);
    while (hi.sub(lo).greq(ONE)) {
      const mid = lo.add(hi).div(new Num(2, 0)).floor();
      if (this._triCost(mid, preCost, increase, scaling).greq(budget)) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
    return lo;
  }

  /** Price of the (threshold + n)th item given preCost at threshold */
  private _triCost(
    n: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    const incPow = increase.pow(n);
    const triExp = n
      .mul(n.add(new Num(1, 0)))
      .div(new Num(2, 0))
      .floor();
    const scalePow = scaling.pow(triExp);
    return preCost.mul(incPow).mul(scalePow);
  }

  /** Sum of the next n triangular-scaled prices after start */
  private _sumTriCosts(
    start: Num,
    n: Num,
    baseCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    let sum = new Num(0, 0);
    // naïve O(n), but n here is “extra buys” which is usually small
    for (
      let i = new Num(1, 0);
      i.sub(n).lt(new Num(0, 0));
      i = i.add(new Num(1, 0))
    ) {
      sum = sum.add(this._triCost(start.add(i), baseCost, increase, scaling));
    }
    return sum;
  }
}
