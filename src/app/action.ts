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

  multiplier() {

  }

  globalMultiplier(target: string, amount: Num) {
    GlobalMultipliersService.correct(target, amount);
  }

  basedOnHolding() {
    if (this.variable === 'exponent') {
      this.globalMultiplier(this.target, new Num(HoldingsService.get(this.subject).exp, 0))
    } else {
      this.globalMultiplier(this.target, HoldingsService.get(this.subject).mul(this.amount, false).add(new Num(1, 0), false));
    }
  }

  basedOnUpgrade() {
    // @ts-ignore
    this.globalMultiplier(this.target, UpgradeService.getValue(this.subject, 'buffer').pow(UpgradeService.getValue(this.subject, this.variable), false));
  }

  increaseBuffer() {
    UpgradeService.increaseBuffer(this.target, this.amount);
  }

  unlock() {
    UpgradeService.setValue(this.target, 'unlocked', true);
  }

  setAction() {
    UpgradeService.setValue(this.target, this.type, this.action)
  }

  amplifyUpgrade() {
    UpgradeService.setValue(this.target, this.variable, this.amount);
  }

  amplifyUpgrades() {
    UpgradeService.setValues(this.target, this.variable, this.amount);
  }

  amplifyGenerator() {
    console.log()
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
        case 'multiplier': this.multiplier(); break;
        case 'globalMultiplier': this.globalMultiplier(this.target, this.amount); break;
        case 'basedOnHolding': this.basedOnHolding(); break;
        case 'basedOnUpgrade': this.basedOnUpgrade(); break;
        case 'increaseBuffer': this.increaseBuffer(); break;
        case 'unlock': this.unlock(); break;
        case 'setAction': this.setAction(); break;
        case 'amplifyUpgrade': this.amplifyUpgrade(); break;
        case 'amplifyUpgrades': this.amplifyUpgrades(); break;
        case 'amplifyGenerator': this.amplifyGenerator(); break;
        case 'amplifyGenerators': this.amplifyGenerators(); break;
      }
    }
  }
}
