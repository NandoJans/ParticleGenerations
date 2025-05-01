import {Num} from "../../num";
import {Buyable} from "./buyable";
import {ResetKey} from "../enums/reset-key";
import {Styles} from "../enums/styles";
import {Require} from "./interfaces/require";
import {Resetable} from "./interfaces/resetable";
import {Storable} from "./interfaces/storable";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {Enhancable} from "./interfaces/enhancable";
import {Enhancement} from "./enhancements/enhancement";
import {EnhancementRecord} from "../records/enhancement-record";

export abstract class Upgrade extends Buyable implements Storable, Require, Resetable, Enhancable {
  abstract override name: string
  abstract displayName: string
  abstract getDescription(): string
  baseBuffer: Num = new Num(1, 0)
  buffer: Num = new Num(1, 0)
  amount: Num = new Num(0, 0)
  abstract type: string
  abstract resetId: ResetKey
  softResetId: ResetKey = ResetKey.NONE;
  abstract style: Styles
  abstract action(): Num | undefined;
  abstract nav: string
  abstract subNav: string
  effect: Num | undefined = undefined
  maxEffect: Num | undefined = undefined
  override calculationOrder: number = 400
  enhancement: Enhancement|null = null

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())

  override run(): Num | undefined {
    const effect = this.action();
    this.buffer = this.baseBuffer.copy();
    this.amount = this.bought.copy();
    if (effect) {
      this.effect = effect;
    }
    this.correctCost()
    return effect;
  }

  effectString(): string {
    return this.effect ? this.effect.toString(2) + 'x' : '';
  }

  getEffectDisplay(): string {
    return this.effectString();
  }

  requirementSatisfied(amount: Num): boolean {
    return this.amount.greq(amount);
  }

  reset() {
    this.amount = new Num(0, 0);
    this.bought = new Num(0, 0);
    this.unlocked = this.startUnlocked;
    this.effect = undefined;
    this.requirement.forEach(requirement => {
      requirement.register();
    })
  }

  softReset() {}

  getSaveKey(): string {
    return this.name;
  }

  getSaveCategory(): string {
    return 'upgrades';
  }

  save() {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())
    this.localStorageHelper.saveNum(this.amount, 'amount')
    this.localStorageHelper.saveNum(this.bought, 'bought')
    this.localStorageHelper.save(this.unlocked, 'unlocked')
    this.localStorageHelper.save(this.auto, 'auto')
    this.localStorageHelper.save(
      (this.enhancement instanceof Enhancement) ? this.enhancement.saveName : null,
      'enhancement'
    )
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())
    this.amount = this.localStorageHelper.loadNum(this.amount, 'amount')
    this.bought = this.localStorageHelper.loadNum(this.bought, 'bought')
    this.unlocked = this.localStorageHelper.load(this.unlocked, 'unlocked')
    this.auto = this.localStorageHelper.load(this.auto, 'auto')

    const enhancementName = this.localStorageHelper.load(null, 'enhancement')
    // @ts-ignore
    if (enhancementName && enhancementName in EnhancementRecord && EnhancementRecord[enhancementName] instanceof Enhancement) {
      // @ts-ignore
      this.enhancement = EnhancementRecord[enhancementName];
      if (this.enhancement instanceof Enhancement) {
        this.enhancement.add(this);
      }
    } else {
      this.enhancement = null
    }
  }

  override unlock() {
    super.unlock();
    this.effect = undefined;
  }

  abstract allowedEnhancements: Enhancement[];
  abstract enhancementString(enhancement:Enhancement): string;
  abstract canEnhance(): boolean;
  abstract enhance(): void;
}
