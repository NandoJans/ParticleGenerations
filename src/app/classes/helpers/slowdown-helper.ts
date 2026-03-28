import {Num} from "../../num";

export class SlowdownHelper {
  static apply(effect: Num, slowdownStart: Num, slowdownPower: Num): Num {
    if (effect.greq(slowdownStart)) {
      return effect.div(slowdownStart).pow(slowdownPower).mul(slowdownStart);
    }

    return effect;
  }

  static applyLayers(effect: Num, slowdownStarts: Num[], slowdownPowers: Num[]): Num {
    const slowdownLayerCount = Math.min(slowdownStarts.length, slowdownPowers.length);
    let slowedEffect = effect;

    for (let index = 0; index < slowdownLayerCount; index++) {
      slowedEffect = SlowdownHelper.apply(slowedEffect, slowdownStarts[index], slowdownPowers[index]);
    }

    return slowedEffect;
  }
}
