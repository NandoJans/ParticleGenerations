import {Num} from "../../../num";
import {Require} from "./require";
import {GameElement} from "../game-element";

export class Requirement {
  requirement: Require;
  amount: Num;
  unlocked: boolean;
  gameElement: GameElement;
  static requirements: Requirement[] = [];

  constructor(requirement: Require, amount: Num, gameElement: GameElement, unlocked: boolean = false) {
    this.requirement = requirement;
    this.unlocked = unlocked;
    this.amount = amount;
    this.gameElement = gameElement;
    Requirement.requirements.push(this);
  }

  requirementMet(): boolean {
    return this.requirement.requirementSatisfied(this.amount);
  }

  static checkRequirements(): void {
    Requirement.requirements.forEach((requirement, index) => {
      if (requirement.requirementMet()) {
        requirement.gameElement.unlocked = true;
        Requirement.requirements.splice(index, 1);
      }
    });
  }
}
