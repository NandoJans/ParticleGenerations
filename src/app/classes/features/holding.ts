import {Num} from "../../num";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {Styles} from "../enums/styles";
import {HoldingDisplay} from "../displays/holding-display";

export abstract class Holding {
  abstract name: string;
  abstract abbreviation: string;
  abstract amount: Num;
  abstract startAmount: Num;
  effect: Num|undefined = undefined;
  abstract holdingDisplay: HoldingDisplay;
  protected gainSpeed: Num = new Num(1, 0);
  protected maxGainSpeed: Num = new Num(1, 0);

  abstract getStyle(): Styles;

  action(): Num|undefined {
    return undefined
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

  run(): any {
    if (this.action !== undefined) {
      const effect = this.action()?.copy()
      this.effect = effect
      return effect
    }
    return null
  }

  reset(): void {
    this.amount = this.startAmount.copy()
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

  getAmountDisplay() {
    return this.amount.toString();
  }

  effectString(effect: Num): string {
    return effect.toString()
  }

  getEffectDisplay() {
    if (this.effect) {
      return this.effectString(this.effect);
    } else {
      return '';
    }
  }

  hasEffect(): boolean {
    return this.effect !== undefined
  }

  getHoldingDisplay() {
    return this.holdingDisplay
  }

  getGainSpeed() {
    return this.gainSpeed
  }

  getMaxGainSpeed() {
    return this.maxGainSpeed
  }
}
