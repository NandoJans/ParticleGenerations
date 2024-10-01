import {Num} from "../../num";

export abstract class Buyable {
  abstract baseCost: Num
  abstract cost: Num
  abstract increase: Num
  abstract scalingStart: Num
  scaling?: Num
  abstract bought: Num
  abstract currency: string
  // TODO: add the methods from buyable service
}
