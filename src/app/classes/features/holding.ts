import {Num} from "../../num";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {Styles} from "../enums/styles";
import {HoldingDisplay} from "../displays/holding-display";
import {Generatable} from "./interfaces/generatable";
import {Require} from "./interfaces/require";
import {Resetable} from "./interfaces/resetable";
import {ResetKey} from "../enums/reset-key";

export abstract class Holding implements Generatable, Require, Resetable {
  abstract name: string;
  abstract displayName: string;
  abstract abbreviation: string;
  abstract amount: Num;
  abstract startAmount: Num;
  effect: Num|undefined = undefined;
  abstract holdingDisplay: HoldingDisplay;
  protected gainSpeed: Num = new Num(1, 0);
  protected maxGainSpeed: Num = new Num(1, 0);
  abstract resetId: ResetKey;
  softResetId: ResetKey = ResetKey.NONE;
  calculationOrder: number = 300;

  abstract getStyle(): Styles;

  action(): Num|undefined {
    return undefined
  }

  protected localStorageHelper: LocalStorageHelper = new LocalStorageHelper('holdings', this.getSaveKey())

  getSaveKey(): string {
    return this.name;
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper('holdings', this.getSaveKey())
    this.amount = this.localStorageHelper.loadNum(this.startAmount)
  }

  save(): void {
    this.localStorageHelper = new LocalStorageHelper('holdings', this.getSaveKey())
    this.localStorageHelper.saveNum(this.amount)
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
    this.amount = this.startAmount.copy();
    this.effect = undefined;
  }

  softReset(): void {}

  add(amount: Num): void {
    this.amount = this.amount.add(amount)
  }

  sub(amount: Num): void {
    this.amount = this.amount.sub(amount)
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

  generate(amount: Num): any {
    this.amount = this.amount.add(amount)
  }

  requirementSatisfied(amount: Num): boolean {
    return this.amount.greq(amount)
  }
}
