import {Upgrade} from "../upgrade";
import {Multiplier} from "../multiplier";
import {Num} from "../../../num";
import {SettableHolding} from "../holdings/settable-holding";

export abstract class SetHoldingUpgrade extends Upgrade {

  abstract multiplier: Multiplier;
  abstract targetHolding: SettableHolding;

  action(): Num {
    const buff: Num = this.bought.mul(this.multiplier.getNum(), false);
    this.targetHolding.addInfluence(buff);
    return buff
  }

  override effectString(): string {
    return '+' + super.effectString();
  }
}
