import {Num} from "../../num";
import {Buyable} from "./buyable";
import {Generatable} from "./interfaces/generatable";
import {Styles} from "../enums/styles";
import {Storable} from "./interfaces/storable";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {ResetKey} from "../enums/reset-key";
import {Multiplier} from "./multiplier";
import {Resetable} from "./interfaces/resetable";
import {Transaction} from "./interfaces/transaction";
import {Require} from "./interfaces/require";
import {Upgrade} from "./upgrade";
import {StatsService} from "../../services/stats.service";
import {Enhancable} from "./interfaces/enhancable";
import {Enhancement} from "./enhancements/enhancement";
import {EnhancementRecord} from "../records/enhancement-record";

export abstract class Generator extends Buyable implements Generatable, Storable, Resetable, Require, Enhancable {
  abstract displayName: string
  generates!: Generatable;
  baseMulMod: Num = new Num(1, 0);
  abstract baseMultiplier: Num;
  multiplier: Num = new Num(1, 0);
  mulMod: Num = new Num(1, 0);
  amount: Num = new Num(0, 0)
  bought: Num = new Num(0, 0)
  abstract type: string
  abstract resetId: ResetKey;
  abstract softResetId: ResetKey;
  abstract style: Styles
  abstract nav: string
  abstract subNav: string
  abstract globalMultiplier: Multiplier
  abstract stringRank: string
  abstract rank: number
  override calculationOrder: number = 1000

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('generators', this.getSaveKey())

  protected getGenerateAmount(): Num {
    return this.amount.mul(this.multiplier) as Num
  }

  override run(speed: Num): any {
    this.multiplier = this.baseMultiplier
      .mul(this.baseMulMod)
      .pow(this.bought)
      .mul(this.mulMod)
      .mul(this.globalMultiplier.getNum()) as Num
    if (this.isUnlocked() && this.isEnabled()) {
      this.generates.generate(this.getGenerateAmount().mul(speed) as Num)
    }
    this.baseMulMod = new Num(1, 0)
    this.mulMod = new Num(1, 0)
    this.correctCost();
  }

  generate(amount: Num): any {
    this.amount = this.amount.add(amount)
  }

  getSaveCategory(): string {
    return "";
  }

  getSaveKey(): string {
    return this.name
  }

  save(): void {
    this.localStorageHelper = new LocalStorageHelper('generators', this.getSaveKey())
    this.localStorageHelper.saveNum(this.bought, 'bought')
    this.localStorageHelper.saveNum(this.amount, 'amount')
    this.localStorageHelper.save(this.unlocked, 'unlocked')
    this.localStorageHelper.save(this.auto, 'auto')
    this.localStorageHelper.save(
      (this.enhancement instanceof Enhancement) ? this.enhancement.saveName : null,
      'enhancement'
    )
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper('generators', this.getSaveKey())
    this.bought = this.localStorageHelper.loadNum(this.bought, 'bought')
    this.amount = this.localStorageHelper.loadNum(this.amount, 'amount')
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

  softReset(): void {
    this.amount = this.bought.copy()
  }

  reset(): void {
    if (this.hasBought()) {
      StatsService.addNum(this.name, 'totalReset', new Num(1, 0))
      StatsService.addNum(this.type, 'totalReset', new Num(1, 0))
      StatsService.addNum(this.type, 'totalResetAutomator', new Num(1, 0))
    }

    this.multiplier = this.baseMultiplier.copy();
    this.bought = new Num(0, 0)
    this.amount = new Num(0, 0)
    this.unlocked = this.startUnlocked
    this.requirement.forEach(requirement => {
      requirement.register();
    })
  }

  override buy(amount: Num = new Num(1, 0)): Transaction {
    const transaction = super.buy(amount);
    StatsService.addNum(this.name, 'totalBoughtAutomator', transaction.amount)
    StatsService.addNum(this.name, 'totalBought', transaction.amount)
    return transaction
  }

  requirementSatisfied(amount: Num): boolean {
    return this.unlocked
  }

  getUpgrades(): Upgrade[] {
    return [];
  }

  allowedEnhancements: Enhancement[] = [];
  enhancement: Enhancement | null = null;

  canEnhance(): boolean {
    return true;
  }

  enhance(): void {
    if (this.enhancement instanceof Enhancement) {
      this.baseMulMod = this.baseMulMod.mul(this.enhancement.getMultiplier().mul(new Num(8, -1))) as Num
    }
  }

  enhancementString(enhancement: Enhancement): string {
    return "Enhance to multiply the buy multiplier by "+enhancement.getMultiplier().mul(new Num(8, -1)).toString(2)+"x";
  }
}
