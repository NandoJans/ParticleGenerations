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
    // spend one
    b.currency.amount = b.currency.amount.sub(b.cost);
    b.amount = b.amount.add(new Num(1, 0));
    b.bought = b.bought.add(new Num(1, 0));
    this.correct();
    return { amount: new Num(1, 0), cost: b.cost.copy(), currency: b.currency };
  }

  bulkBuyAction(cost: Num, bulk: Num): Transaction {
    const b = this.buyable;
    // spend total
    b.currency.amount = b.currency.amount.sub(cost);
    b.amount = b.amount.add(bulk);
    b.bought = b.bought.add(bulk);
    this.correct();
    return { amount: bulk.copy(), cost: cost.copy(), currency: b.currency };
  }

  /**
   * Returns [howMany extra buys, totalCost] you can afford.
   */
  calculateBulk(b: Buyable, split: Num = new Num(1, 0)): [Num, Num] {
    const baseCost = b.baseCost.copy();
    const increase = b.increase.copy();
    const scaling  = b.scaling.copy();
    const bought   = b.bought.copy();
    const budget   = b.currency.amount.copy().div(split);

    // 1) No delayed scaling → full triangular series
    if (b.scalingStart === undefined) {
      const extra   = this._maxExtra(budget, baseCost, increase, scaling);
      const sumCost = this._sumTriCosts(bought, extra, baseCost, increase, scaling);
      return [extra, sumCost];
    }

    // 2) Delayed scaling: split pre- and post-threshold
    const thresholdCount = b.scalingStart
      .copy()
      .div(baseCost)
      .ln()
      .div(increase.ln())
      .floor();

    // 2a) Price at threshold
    const costAtThresh = baseCost.mul(increase.pow(thresholdCount));

    // 2b) Sum cost from 0 → thresholdCount-1
    const incToT = increase.pow(thresholdCount);
    const sumTotalToT = baseCost
      .mul(incToT.sub(new Num(1, 0)))
      .div(increase.sub(new Num(1, 0)));

    // 2c) Sum spent so far from 0 → bought-1
    const incToB = increase.pow(bought);
    const sumTotalToB = baseCost
      .mul(incToB.sub(new Num(1, 0)))
      .div(increase.sub(new Num(1, 0)));

    // 2d) Remaining pre-threshold cost
    const sumPre = sumTotalToT.sub(sumTotalToB);

    // 3) If budget can't cover pre-threshold
    if (budget.lt(sumPre)) {
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

    // 4) Budget after pre-threshold
    const rem   = budget.sub(sumPre);

    // 5) Compute post-threshold extras
    const extra     = this._maxExtra(rem, costAtThresh, increase, scaling);
    const totalBuys = thresholdCount.add(extra);

    // 6) Sum post-threshold costs
    const postSum    = this._sumTriCosts(thresholdCount, extra, costAtThresh, increase, scaling);

    // 7) Grand total
    const grandTotal = sumPre.add(postSum);

    return [totalBuys.sub(bought), grandTotal];
  }

  buy(): Transaction {
    const b = this.buyable;
    if (!b.currency.amount.greq(b.cost)) {
      return { amount: new Num(0, 0), cost: new Num(0, 0), currency: b.currency };
    }
    if (b.resets !== ResetKey.NONE || b.oneTime || b.noMax) {
      const tx = this.buyAction();
      if (b.resets !== ResetKey.NONE) ResetHelper.reset(b.resets);
      return tx;
    }
    let [count, cost] = this.calculateBulk(b);
    if (count.greq(new Num(1, 0)) && b.currency.amount.greq(cost)) {
      if (b.limit && count.greq(b.limit)) {
        count = b.limit.copy();
      }
      return this.bulkBuyAction(cost, count);
    }
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
        if (!b.oneTime) return this.buyAction();
        if (b.resets !== ResetKey.NONE) ResetHelper.reset(b.resets);
      } else {
        const [c, cost] = this.calculateBulk(b);
        if (c.greq(new Num(1, 0)) && b.currency.amount.greq(cost)) {
          return this.bulkBuyAction(cost, c);
        }
      }
    }
    return { amount: new Num(0, 0), cost: new Num(0, 0), currency: b.currency };
  }

  correct(): void {
    const b = this.buyable;
    if (!b.bought.greq(new Num(1, 0))) {
      b.cost = b.baseCost.copy();
      return;
    }
    if (b.oneTime) {
      return;
    }
    const baseCost = b.baseCost.copy();
    const increase = b.increase.copy();
    const scaling  = b.scaling.copy();
    const bought   = b.bought.copy();

    if (b.scalingStart === undefined) {
      b.cost = this._triCost(bought, baseCost, increase, scaling);
      return;
    }

    const thresholdCount = b.scalingStart
      .copy()
      .div(baseCost)
      .ln()
      .div(increase.ln())
      .floor();
    const costAtThresh = baseCost.mul(increase.pow(thresholdCount));

    if (bought.lt(thresholdCount.add(new Num(1, 0)))) {
      b.cost = baseCost.mul(increase.pow(bought));
      return;
    }

    const post = bought.sub(thresholdCount);
    b.cost = this._triCost(post, costAtThresh, increase, scaling);
  }

  private _triCost(
    n: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    // triangular scaling: exponent = n*(n+1)/2
    const triExp = n
      .mul(n.add(new Num(1, 0)))
      .div(new Num(2, 0))
      .floor();
    const incPow   = increase.pow(n);
    const scalePow = scaling.pow(triExp);
    return preCost.mul(incPow).mul(scalePow);
  }

  private _sumTriCosts(
    start: Num,
    n: Num,
    baseCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    let sum = new Num(0, 0);
    for (let i = new Num(1, 0); i.lte(n); i = i.add(new Num(1, 0))) {
      sum = sum.add(this._triCost(start.add(i), baseCost, increase, scaling));
    }
    return sum;
  }

  private _maxExtra(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    // closed-form quadratic solve for triangular scaling
    const ONE = new Num(1, 0);
    const lnB = scaling.ln();
    const lnA = increase.ln();
    const lnPre = preCost.ln();
    const lnBud = budget.ln();

    const Acoef = lnB.toNumber() / 2;
    const Bcoef = (lnB.toNumber() / 2) + lnA.toNumber();
    const C = lnBud.toNumber() - lnPre.toNumber();
    const disc = Bcoef * Bcoef + 4 * Acoef * C;

    if (Acoef !== 0 && disc >= 0) {
      const root = (-Bcoef + Math.sqrt(disc)) / (2 * Acoef);
      if (root >= 0 && isFinite(root)) {
        return new Num(Math.floor(root), 0);
      }
    }

    // fallback binary search
    return this._maxExtraBinary(budget, preCost, increase, scaling);
  }

  private _maxExtraBinary(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    let lo = new Num(0, 0), hi = new Num(1, 0);
    while (this._triCost(hi, preCost, increase, scaling).lte(budget)) {
      hi = hi.mul(new Num(2, 0));
    }
    const ONE = new Num(1, 0);
    while (hi.sub(lo).gt(ONE)) {
      const mid = lo.add(hi).div(new Num(2, 0)).floor();
      if (this._triCost(mid, preCost, increase, scaling).lte(budget)) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return lo;
  }
}
