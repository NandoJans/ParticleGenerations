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
   * Returns [howMany, totalCost] you can buy with currency.amount/split.
   */
  calculateBulk(b: Buyable, split: Num = new Num(1, 0)): [Num, Num] {
    const budget = b.currency.amount.copy().div(split);
    let lo = new Num(0, 0), hi = new Num(1, 0);
    // find an upper‐bound
    while (this._sumTriCosts(b.bought, hi, b.baseCost, b.increase, b.scaling).greq(budget)) {
      hi = hi.mul(new Num(2, 0));
    }
    // binary search between lo and hi
    const ONE = new Num(1, 0);
    while (hi.sub(lo).gt(ONE)) {
      const mid = lo.add(hi).div(new Num(2, 0)).floor();
      if (this._sumTriCosts(b.bought, mid, b.baseCost, b.increase, b.scaling).greq(budget)) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
    const extra    = lo;
    const totalCost = this._sumTriCosts(b.bought, extra, b.baseCost, b.increase, b.scaling);
    return [extra, totalCost];
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

  /**
   * Recalculates the current cost based on how many have been bought,
   * taking into account a possible delayed‐scaling start.
   */
  correct(): void {
    const b = this.buyable;

    // 0) nothing bought yet → baseCost
    if (!b.bought.greq(new Num(1, 0))) {
      b.cost = b.baseCost.copy();
      return;
    }

    // 1) one-time stays at baseCost indefinitely
    if (b.oneTime) {
      return;
    }

    // grab immutable copies
    const baseCost = b.baseCost.copy();
    const increase = b.increase.copy();
    const scaling  = b.scaling.copy();
    const bought   = b.bought.copy();

    // 2) no delayed scaling → full triangular from the start
    if (b.scalingStart === undefined) {
      b.cost = this._triCost(bought, baseCost, increase, scaling);
      return;
    }

    // 3) compute how many buys hit the scalingStart “price point”
    const thresholdCount = b.scalingStart!
      .copy()
      .div(baseCost)
      .ln()
      .div(increase.ln())
      .floor();

    // 4) price of that threshold-th buy
    const costAtThresh = baseCost.mul(increase.pow(thresholdCount));

    // 5) if we haven’t yet bought up to that point, do simple pre-scaling growth:
    //    cost = baseCost × increase^(bought)
    if (bought.lt(thresholdCount.add(new Num(1, 0)))) {
      b.cost = baseCost.mul(increase.pow(bought));
      return;
    }

    // 6) once we’re past threshold, do the triangular scaling off costAtThresh
    const post = bought.sub(thresholdCount);
    b.cost = this._triCost(post, costAtThresh, increase, scaling);
  }


  // ——— private helpers ———

  private _maxExtra(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    // try closed-form if scaling > 1
    if (scaling.greq(new Num(1, 0))) {
      const lnBud = budget.ln().toNumber();
      const lnPre = preCost.ln().toNumber();
      const lnA   = increase.ln().toNumber();
      const lnB   = scaling.ln().toNumber();
      if (isFinite(lnBud) && isFinite(lnPre) && isFinite(lnA) && isFinite(lnB)) {
        const C     = lnBud - lnPre;
        const Acoef = lnB / 2;
        const Bcoef = lnB / 2 + lnA;
        const disc  = Bcoef * Bcoef + 4 * Acoef * C;
        if (disc >= 0 && isFinite(disc) && Acoef !== 0) {
          const root = (-Bcoef + Math.sqrt(disc)) / (2 * Acoef);
          if (isFinite(root) && root >= 0) {
            return new Num(Math.floor(root), 0);
          }
        }
      }
    }
    return this._maxExtraBinary(budget, preCost, increase, scaling);
  }

  private _maxExtraBinary(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    let lo = new Num(0, 0), hi = new Num(1, 0);
    while (!this._triCost(hi, preCost, increase, scaling).greq(budget)) {
      hi = hi.mul(new Num(2, 0));
    }
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

  private _sumTriCosts(
    start: Num,
    n: Num,
    baseCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    let sum = new Num(0, 0);
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
