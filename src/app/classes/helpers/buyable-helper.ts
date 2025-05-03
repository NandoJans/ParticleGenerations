import { Num } from "../../num";
import { Buyable } from "../features/buyable";
import { ResetKey } from "../enums/reset-key";
import { Transaction } from "../features/interfaces/transaction";
import { ResetHelper } from "./reset-helper";

export class BuyableHelper {
  constructor(private buyable: Buyable) {}

  /* ────────────────────────── PUBLIC ACTIONS ────────────────────────── */

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
   * Returns [extraBuys, totalCost] that fit in `b.currency.amount`.
   */
  calculateBulk(b: Buyable, split: Num = new Num(1, 0)): [Num, Num] {
    const baseCost = b.baseCost.copy();
    const increase = b.increase.copy();
    const scaling  = b.scaling.copy();
    const bought   = b.bought.copy();
    const budget   = b.currency.amount.copy().div(split);

    /* ═════════ 1.  NO delayed scaling ═══════════════════════════════ */
    if (b.scalingStart === undefined) {
      const extra   = this._maxExtra(budget, baseCost, increase, scaling);
      const sumCost = this._sumTriCosts(new Num(0, 0), extra,
        baseCost, increase, scaling);
      return [extra, sumCost];
    }

    /* ═════════ 2.  delayed scaling: split phases ════════════════════ */
    const thresholdCount = b.scalingStart
      .copy()
      .div(baseCost)
      .ln()
      .div(increase.ln())
      .floor();                         // #buys until cost reaches scalingStart

    /* 2a.  cost at the threshold (first triangular‑scaled price) */
    const costAtThresh = baseCost.mul(increase.pow(thresholdCount));

    /* 2b.  geometric‑phase cost already paid, and still to pay         */
    const incToT = increase.pow(thresholdCount);
    const sumTotalToT = baseCost.mul(incToT.sub(new Num(1, 0)))
      .div(increase.sub(new Num(1, 0)));

    const incToB = increase.pow(bought);
    const sumTotalToB = baseCost.mul(incToB.sub(new Num(1, 0)))
      .div(increase.sub(new Num(1, 0)));

    // still needed to finish geometric phase
    let sumPre = sumTotalToT.sub(sumTotalToB);
    if (sumPre.lt(new Num(0, 0))) sumPre = new Num(0, 0);

    /* 3.  budget is not enough even for the remainder of the geo phase */
    if (budget.lt(sumPre)) {
      const k = budget.div(baseCost).ln().div(increase.ln()).floor();
      const sum = baseCost.mul(increase.pow(k).sub(new Num(1, 0)))
        .div(increase.sub(new Num(1, 0)));
      return [k.sub(bought), sum];
    }

    /* 4.  budget left for the triangular phase                         */
    const rem = budget.sub(sumPre);

    /* 5.  already in the triangular phase?  offset ≥ 0                 */
    const offset = bought.gt(thresholdCount)
      ? bought.sub(thresholdCount)
      : new Num(0, 0);

    const preCostExtra = this._triCost(offset,   // cost of *next* purchase
      costAtThresh,
      increase,
      scaling);

    /* 6.  how many triangular buys fit? (exact inverse)                */
    const extra = this._maxExtra(rem, preCostExtra, increase, scaling);

    /* 7.  sum their exact prices                                       */
    const postSum = this._sumTriCosts(offset, extra,
      costAtThresh, increase, scaling);

    /* 8.  final answers                                                */
    const grandTotal = sumPre.add(postSum);
    const extraBuys  = extra;                       // relative extras only
    return [extraBuys, grandTotal];
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
    if (b.oneTime) return;

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

  /* ────────────────────────── HELPERS ─────────────────────────── */

  private _triCost(
    n: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    // triangular scaling: exponent = n*(n+1)/2
    const triExp = n.mul(n.add(new Num(1, 0)))
      .div(new Num(2, 0))
      .floor();
    return preCost.mul(increase.pow(n)).mul(scaling.pow(triExp));
  }

  /**
   * Exact cumulative cost of n items starting at absolute index `start`.
   * Loops k = 0 … n‑1 (inclusive upper bound removed).
   */
  private _sumTriCosts(
    start: Num,
    n: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    let cost = this._triCost(start, preCost, increase, scaling);
    let sum  = cost.copy();

    for (let i = new Num(0, 0); i.lt(n); i = i.add(new Num(1, 0))) {
      const idx   = start.add(i); // k
      cost = cost.mul(increase).mul(scaling.pow(idx.add(new Num(1, 0))));
      sum  = sum.add(cost);
    }
    return sum;
  }

  /* ────────────────── EXACT INVERSE (doubling + binary) ────────────────── */

  /**
   * Returns the largest n such that the total cost of n extras
   * does not exceed `budget`. Guaranteed exact.
   */
  private _maxExtraExact(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    if (budget.lt(preCost)) return new Num(0, 0);           // can't afford 1

    const ONE = new Num(1, 0);

    /* Phase 1 – exponential search to find an upper bound */
    let lo = new Num(1, 0);      // 1 is surely affordable
    let hi = new Num(2, 0);

    while (this._sumTriCosts(new Num(0, 0), hi,
      preCost, increase, scaling).lte(budget)) {
      lo = hi;
      hi = hi.mul(new Num(2, 0)); // 2, 4, 8, 16, ...
    }

    /* Phase 2 – binary search between lo and hi */
    while (hi.sub(lo).gt(ONE.add(new Num(1, -3)))) {
      let mid = lo.add(hi).div(new Num(2, 0)).floor();
      if (mid.equals(lo)) mid = mid.add(ONE);   // guarantee progress

      const sum = this._sumTriCosts(new Num(0, 0), mid,
        preCost, increase, scaling);
      if (sum.lte(budget)) {
        lo = mid;                         // mid is affordable
      } else {
        hi = mid;                         // mid too expensive
      }
    }
    return lo;                   // exact maximum extras
  }

  /** Public wrapper (kept same name). */
  private _maxExtra(
    budget: Num,
    preCost: Num,
    increase: Num,
    scaling: Num
  ): Num {
    return this._maxExtraExact(budget, preCost, increase, scaling);
  }
}
