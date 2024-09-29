import {Holding} from "../holding";
import {Num} from "../../../num";

export class RedAcceleratorHolding extends Holding {
  name = 'redAccelerators';
  abbreviation = 'RA';
  amount = new Num(1, 1);
  effect = new Num(1, 0);
  startAmount: Num = new Num(1, 0);
  override action(): any {

  }
}
