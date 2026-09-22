import {Num} from '../../num';

/** Effects supplied by the current strange-quark balance. */
export class StrangeQuarkEffects {
  static redGeneratorBuyMultiplier = Num.ONE.copy();

  static reset(): void {
    this.redGeneratorBuyMultiplier = Num.ONE.copy();
  }
}
