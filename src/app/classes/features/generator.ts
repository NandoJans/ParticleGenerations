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

export abstract class Generator extends Buyable implements Generatable, Storable, Resetable, Require {
  abstract displayName: string
  abstract generates: Generatable
  baseMulMod: Num = new Num(1, 0);
  abstract baseMultiplier: Num;
  multiplier: Num = new Num(1, 0);
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
    this.generates.generate(this.getGenerateAmount().mul(speed) as Num)
    this.multiplier = this.baseMultiplier
      .mul(this.baseMulMod)
      .pow(this.bought)
      .mul(this.globalMultiplier.getNum()) as Num
    this.baseMulMod = new Num(1, 0)
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
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper('generators', this.getSaveKey())
    this.bought = this.localStorageHelper.loadNum(this.bought, 'bought')
    this.amount = this.localStorageHelper.loadNum(this.amount, 'amount')
    this.unlocked = this.localStorageHelper.load(this.unlocked, 'unlocked')
    this.auto = this.localStorageHelper.load(this.auto, 'auto')
  }

  softReset(): void {
    this.amount = this.bought.copy()
  }

  reset(): void {
    if (this.hasBought()) {
      StatsService.addNum(this.name, 'totalReset', new Num(1, 0))
      StatsService.addNum(this.type, 'totalReset', new Num(1, 0))
    }

    this.bought = new Num(0, 0)
    this.amount = new Num(0, 0)
    this.unlocked = this.startUnlocked
    this.requirement.forEach(requirement => {
      requirement.register();
    })
  }

  override buy(amount: Num = new Num(1, 0)): Transaction {
    const transaction = super.buy(amount);
    StatsService.addNum(this.name, 'totalBought', transaction.amount)
    console.log('Bought', this.name, transaction.amount.toString(), 'times');
    return transaction
  }

  requirementSatisfied(amount: Num): boolean {
    return this.amount.greq(amount);
  }

  getUpgrades(): Upgrade[] {
    return [];
  }
}
