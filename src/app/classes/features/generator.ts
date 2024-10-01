import {Num} from "../../num";
import {Buyable} from "./buyable";
import {Generatable} from "./interfaces/generatable";
import {Styles} from "../enums/styles";
import {Storable} from "./interfaces/storable";
import {LocalStorageHelper} from "../helpers/local-storage-helper";

export abstract class Generator extends Buyable implements Generatable, Storable {
  abstract name: string
  abstract displayName: string
  abstract generates: Generatable
  abstract baseMulMod: Num
  abstract baseMultiplier: Num
  multiplier: Num = new Num(1, 0)
  amount: Num = new Num(0, 0)
  bought: Num = new Num(0, 0)
  abstract type: string
  abstract resetId: string
  abstract unlocked: boolean
  abstract requirement: any[]
  abstract style: Styles
  abstract nav: string
  abstract subNav: string
  abstract globalMultiplier: string
  auto: boolean = false
  noMax: boolean = false

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('generators', this.getSaveKey())

  protected getGenerateAmount(): Num {
    return this.amount.mul(this.multiplier, false) as Num
  }

  run(): any {
    this.generates.generate(this.getGenerateAmount())
  }

  generate(amount: Num): any {
    this.amount.add(amount)
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
    this.localStorageHelper.saveNum(this.cost, 'cost')
  }

  tryLoad(): void {
    this.bought = this.localStorageHelper.loadNum(this.bought, 'bought')
    this.amount = this.localStorageHelper.loadNum(this.amount, 'amount')
    this.cost = this.localStorageHelper.loadNum(this.cost, 'cost')
  }


}
