import {Num} from "../../num";
import {Buyable} from "./buyable";

export abstract class Upgrade implements Buyable {
  abstract name: string
  abstract displayName: string
  abstract description: string
  abstract baseCost: Num
  abstract cost: Num
  abstract increase: Num
  abstract scaling: Num
  abstract scalingStart?: Num
  abstract bought: Num
  abstract currency: string
  abstract baseBuffer: Num
  abstract buffer: Num
  abstract amount: Num
  abstract type: string
  abstract resetId: string
  abstract style: string
  abstract unlocked: boolean
  abstract oneTime: boolean
  abstract resets: string
  abstract requirement: any[]
  abstract action?: Function
  abstract auto?: boolean
  abstract limit?: Num
  abstract noMax?: boolean
  abstract nav?: string
  abstract subNav?: string
  abstract effect?: Num
  abstract maxEffect?: Num
}
