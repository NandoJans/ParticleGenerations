import {Num} from "../../num";
import {LocalStorageHelper} from "../helpers/local-storage-helper";

export abstract class Holding {
  abstract name: string;
  abstract abbreviation: string;
  abstract amount: Num;
  abstract startAmount: Num;
  abstract effect: Num;
  action: Function | undefined = undefined

  private localStorageHelper: LocalStorageHelper

  getSaveKey(): string {
    return this.name;
  }

  constructor() {
    this.localStorageHelper = new LocalStorageHelper('holding', this.getSaveKey())
    this.tryLoad()
  }

  tryLoad(): void {
    this.amount = this.localStorageHelper.load('amount', this.amount)
    this.startAmount = this.localStorageHelper.load('startAmount', this.startAmount)
    this.effect = this.localStorageHelper.load('effect', this.effect)
  }

  save(): void {
    this.localStorageHelper.save('amount', this.amount)
    this.localStorageHelper.save('startAmount', this.startAmount)
    this.localStorageHelper.save('effect', this.effect)
  }

  printEffect(): string {
    return this.effect.toString()
  }

  run(): any {
    if (this.action !== undefined) {
      return this.action(this.amount)
    }
    return null
  }

  reset(): void {
    this.amount = this.startAmount
  }
}
