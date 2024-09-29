import {Holding} from "../holding";
import {Num} from "../../../num";

export class RedParticleHolding extends Holding {
  name = 'redParticles';
  abbreviation = 'RP';
  amount = new Num(1, 1);
  startAmount: Num = new Num(1, 1);
  effect = new Num(1, 0);
}
