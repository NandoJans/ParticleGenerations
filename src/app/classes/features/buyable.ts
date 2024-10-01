import {Num} from "../../num";
import {Holding} from "./holding";

export abstract class Buyable {
  abstract baseCost: Num
  abstract cost: Num
  abstract increase: Num
  abstract scalingStart: Num
  scaling?: Num
  abstract bought: Num
  abstract currency: Holding
  // TODO: add the methods from buyable service
}
