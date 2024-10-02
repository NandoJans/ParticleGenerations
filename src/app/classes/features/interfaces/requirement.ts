import {Num} from "../../../num";
import {Require} from "./require";

export class Requirement {
  requirement: Require;
  amount: Num;
  unlocked: boolean;

  constructor(requirement: Require, amount: Num, unlocked: boolean = false) {
    this.requirement = requirement;
    this.unlocked = unlocked;
    this.amount = amount;
  }

  requirementMet(): boolean {
    return this.requirement.requirementSatisfied(this.amount);
  }
}
