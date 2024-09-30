import {Holding} from "../features/holding";
import {HoldingDisplay} from "../displays/holding-display";
import {HoldingDisplayLine} from "../../interfaces/holding-display-line";

export class HoldingDisplayFactory {
  lines: HoldingDisplayLine[] = [];
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

  addLine(prefix: string, valueFunction: Function, suffix: string): HoldingDisplayFactory {
    this.lines.push({prefix, valueFunction, suffix});
    return this;
  }

  build(): HoldingDisplay {
    const holdingDisplay = new HoldingDisplay(this.amountPrefix, this.amountSuffix, this.effectPrefix, this.effectSuffix);
    holdingDisplay.setLines(this.lines);
    return holdingDisplay;
  }
}
