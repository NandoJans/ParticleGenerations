import {Num} from "../../num";

export class Multiplier {
  name: string
  num: Num
  originalNum: Num

  constructor(name: string, num: Num) {
    this.name = name
    this.num = num
    this.originalNum = num
  }

  reset(): void {
    this.num = this.originalNum.copy()
  }

  correct(num: Num): void {
    this.num.mul(num)
  }
}
