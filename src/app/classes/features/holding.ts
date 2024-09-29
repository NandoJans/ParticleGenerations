import {Num} from "../../num";
import {LocalStorageHelper} from "../helpers/local-storage-helper";

export abstract class Holding {
  abstract name: string;
  abstract abbreviation: string;
  abstract amount: Num;
  abstract startAmount: Num;
  abstract effect: Num;

  action(): any {
    return null
  }

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
      return this.action()
    }
    return null
  }

  reset(): void {
    this.amount = this.startAmount
  }

  add(amount: Num): void {
    this.amount.add(amount)
  }

  sub(amount: Num): void {
    this.amount.sub(amount)
  }

  get(): Num {
    return this.amount
  }

  set(amount: Num): void {
    this.amount = amount
  }

  setEffect(effect: Num): void {
    this.effect = effect
  }
}
