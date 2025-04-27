import {Num} from "../../num";

export class Multiplier {
  name: string
  num: Num
  originalNum: Num
  calculationOrder: number = 200

  constructor(name: string, num: Num) {
    this.name = name
    this.num = num.copy()
    this.originalNum = num.copy()
  }

  reset(): void {
    this.num = this.originalNum.copy()
  }

  correct(num: Num): void {
    this.num.mul(num)
  }

  getNum(): Num {
    return this.num
  }
}
