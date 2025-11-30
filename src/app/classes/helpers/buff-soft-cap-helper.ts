import {Num} from "../../num";

export class BuffSoftCapHelper {
  static applyPowerSoftCap(effect: Num, softCap: Num, power: Num = new Num(0.5, 0)): Num {
    if (effect.gt(softCap)) {
      const cappedEffect = effect.div(softCap);
      effect = softCap.mul(cappedEffect.pow(power));
    }
    return effect;
  }

  static applyLogarithmicSoftCap(effect: Num, softCap: Num, base: Num = new Num(10, 0)): Num {
    if (effect.gt(softCap)) {
      const cappedEffect = effect.div(softCap);
      effect = softCap.mul(cappedEffect.log10().add(Num.ONE));
    }
    return effect;
  }
}
