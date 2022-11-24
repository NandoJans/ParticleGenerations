import {GlobalMultipliersService} from "./services/globals/global-multipliers.service";
import {UpgradeService} from "./services/interactables/upgrade.service";
import {Num} from "./num";
import {HoldingsService} from "./services/holdings.service";
import {GeneratorService} from "./services/interactables/generator.service";

export class Action {
  type: string;
  target: string;
  amount: Num;
  subject: string;
  variable: string;
  requirement: any[] | undefined;
  action: Action | undefined;

  constructor(type: string, target: string, amount?: any, variable?: string, subject?: string, requirement?: any[] | undefined, action?: Action | undefined) {
    this.type = type;
    this.target = target;
    this.amount = (amount !== undefined) ? amount : new Num(0, 0);
    this.subject = (subject !== undefined) ? subject : '';
    this.variable = (variable !== undefined) ? variable : '';
    this.requirement = requirement;
    this.action = action;
  }

  globalMultiplier(target: string, amount: Num) {
    GlobalMultipliersService.correct(target, amount);
  }

  globalMultiplierPower(target: string, amount: Num) {
    GlobalMultipliersService.power(target, amount);
  }

  basedOnHolding() {
    if (this.variable === 'exponent') {
      // @ts-ignore
      this.globalMultiplier(this.target, new Num(HoldingsService.get(this.subject).exp, 0).pow(this.amount, false))
    } else if (this.variable === 'power') {
      this.globalMultiplier(this.target, HoldingsService.get(this.subject).pow(this.amount, false));
    } else {
      this.globalMultiplier(this.target, HoldingsService.get(this.subject).mul(this.amount, false).add(new Num(1, 0), false));
    }
  }

  basedOnUpgrade() {
    // @ts-ignore
    this.globalMultiplier(this.target, UpgradeService.getValue(this.subject, 'buffer').pow(UpgradeService.getValue(this.subject, this.variable), false).pow(this.amount, false));
  }

  basedOnUpgradeMul() {
    // @ts-ignore
    this.globalMultiplier(this.target, UpgradeService.getValue(this.subject, 'buffer').mul(UpgradeService.getValue(this.subject, this.variable), false).pow(this.amount, false));
  }

  basedOnUpgradeAmount() {
    // @ts-ignore
    this.globalMultiplier(this.target, new Num(2, 0).pow(UpgradeService.getValue(this.subject, this.variable).sub(new Num(1, 0), false), false));
  }

  basedOnGenerator() {
    // @ts-ignore
    this.globalMultiplier(this.target, GeneratorService.getValue(this.subject, this.variable).pow(this.amount, false).add(new Num(1, 0), false));
  }

  increaseBuffer() {
    UpgradeService.increaseBuffer(this.target, this.amount);
  }

  increaseMultiplier() {
    GeneratorService.increaseMultiplier(this.target, this.amount);
  }

  unlock() {
    UpgradeService.setValue(this.target, 'unlocked', true);
  }

  setAction() {
    UpgradeService.setValue(this.target, this.type, this.action)
  }

  setHolding() {
    HoldingsService.set(this.target, this.amount);
  }

  mulHolding() {
    HoldingsService.get(this.target).mul(this.amount);
  }

  increaseHolding() {
    // @ts-ignore
    HoldingsService.add(this.target, this.amount.mul(UpgradeService.getValue(this.subject, this.variable), false))
  }

  increaseHoldingIncremental() {
    // @ts-ignore
    HoldingsService.get(this.target).mul(this.amount.pow(UpgradeService.getValue(this.subject, this.variable), false))
  }

  decreaseHolding() {
    // @ts-ignore
    HoldingsService.remove(this.target, this.amount.mul(UpgradeService.getValue(this.subject, this.variable), false))
  }

  decreaseHoldingIncremental() {
    // @ts-ignore
    HoldingsService.remove(this.target, this.amount.pow(UpgradeService.getValue(this.subject, this.variable), false).sub(new Num(1, 0), false))
  }

  amplifyUpgrade() {
    UpgradeService.setValue(this.target, this.variable, this.amount);
  }

  amplifyUpgrades() {
    UpgradeService.setValues(this.target, this.variable, this.amount);
  }

  amplifyGenerator() {
    GeneratorService.setValue(this.target, this.variable, this.amount);
  }

  amplifyGenerators() {
    GeneratorService.setValues(this.target, this.variable, this.amount);
  }


  hasRequirement() {
    if (this.requirement === undefined) return true;
    return UpgradeService.getValue(this.requirement[0], this.requirement[1]).greq(this.requirement[2])
  }

  execute = () => {
    if (this.hasRequirement()) {
      switch (this.type) {
        case 'globalMultiplier': this.globalMultiplier(this.target, this.amount); break;
        case 'globalMultiplierPower': this.globalMultiplierPower(this.target, this.amount); break;
        case 'basedOnHolding': this.basedOnHolding(); break;
        case 'basedOnUpgrade': this.basedOnUpgrade(); break;
        case 'basedOnUpgradeMul': this.basedOnUpgradeMul(); break;
        case 'basedOnUpgradeAmount': this.basedOnUpgrade(); break;
        case 'basedOnGenerator': this.basedOnGenerator(); break;
        case 'increaseBuffer': this.increaseBuffer(); break;
        case 'increaseMultiplier': this.increaseMultiplier(); break;
        case 'unlock': this.unlock(); break;
        case 'setAction': this.setAction(); break;
        case 'setHolding': this.setHolding(); break;
        case 'mulHolding': this.mulHolding(); break;
        case 'increaseHolding': this.increaseHolding(); break;
        case 'increaseHoldingIncremental': this.increaseHoldingIncremental(); break;
        case 'decreaseHolding': this.decreaseHolding(); break;
        case 'decreaseHoldingIncremental': this.decreaseHoldingIncremental(); break;
        case 'amplifyUpgrade': this.amplifyUpgrade(); break;
        case 'amplifyUpgrades': this.amplifyUpgrades(); break;
        case 'amplifyGenerator': this.amplifyGenerator(); break;
        case 'amplifyGenerators': this.amplifyGenerators(); break;
      }
    }
  }
}
