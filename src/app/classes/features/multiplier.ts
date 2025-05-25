import {Num} from "../../num";

export class Multiplier {
  name: string
  num: Num
  originalNum: Num
  calculationOrder: number = 1150

  constructor(name: string, num: Num, calculationOrder: number = 1150) {
    this.name = name
    this.num = num.copy()
    this.originalNum = num.copy()
    this.calculationOrder = calculationOrder
  }

  reset(): void {
    this.num = this.originalNum.copy()
  }

  correct(num: Num): void {
    this.num = this.num.mul(num)
  }

  add(num: Num): void {
    this.num = this.num.add(num)
  }

  getNum(): Num {
    return this.num
  }
}
