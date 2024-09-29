import {Holding} from "../features/holding";
import {HoldingDisplay} from "../displays/holding-display";

export class HoldingDisplayFactory {
  amountPrefix: string = '';
  amountSuffix: string = '';
  effectPrefix: string = '';
  effectSuffix: string = '';
  holding: Holding;

  constructor(holding: Holding) {
    this.holding = holding;
  }

  static start(holding: Holding) {
    return new HoldingDisplayFactory(holding);
  }

  withAmountPrefix(amountPrefix: string): HoldingDisplayFactory {
    this.amountPrefix = amountPrefix;
    return this;
  }

  withAmountSuffix(amountSuffix: string): HoldingDisplayFactory {
    this.amountSuffix = amountSuffix;
    return this;
  }

  withEffectPrefix(effectPrefix: string): HoldingDisplayFactory {
    this.effectPrefix = effectPrefix;
    return this;
  }

  withEffectSuffix(effectSuffix: string): HoldingDisplayFactory {
    this.effectSuffix = effectSuffix;
    return this;
  }

  build(): HoldingDisplay {
    return new HoldingDisplay(this.amountPrefix, this.amountSuffix, this.effectPrefix, this.effectSuffix);
  }
}
