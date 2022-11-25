import {Action} from "../../../action";
import {Num} from "../../../num";

export const mainActions: Action[] = [
  new Action('mulHolding', 'greenSouls', new Num(0, 0)),
  new Action('mulHolding', 'darkEnergy', new Num(0, 0)),
  new Action('decreaseHoldingIncremental', 'greenSouls', new Num(2, 0), 'bought', 'nuclear-decay-generator'),
]
