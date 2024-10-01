import {Num} from "../../../num";
import {Require} from "./require";

export class Requirement {
  requirement: Require;
  unlocked: boolean;
  amount: Num;

  constructor(requirement: Require, unlocked: boolean, amount: Num) {
    this.requirement = requirement;
    this.unlocked = unlocked;
    this.amount = amount;
  }

  requirementMet(): boolean {
    return this.requirement.requirementSatisfied(this.amount);
  }
}
