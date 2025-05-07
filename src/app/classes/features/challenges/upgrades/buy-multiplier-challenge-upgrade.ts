import {ChallengeUpgrade} from "./challenge-upgrade";
import {Num} from "../../../../num";
import {Holding} from "../../holding";
import {Styles} from "../../../enums/styles";
import {Multiplier} from "../../multiplier";

export class BuyMultiplierChallengeUpgrade extends ChallengeUpgrade {
  constructor(
    saveName: string,
    name: string,
    displayName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    currency: Holding,
    style: Styles,
    nav: string,
    subNav: string,
    type: string,
    public multiplier: Multiplier
  ) {
    super(
      saveName,
      name,
      displayName,
      cost,
      increase,
      scaling,
      buffer,
      currency,
      style,
      nav,
      subNav,
      type
    );
  }

  action(): Num {
    const effect = this.buffer.pow(this.amount);
    this.multiplier.correct(effect);
    return effect;
  }

  override getDescription(): string {
    return `${this.buffer.toString(2)}x Production`;
  }
}
