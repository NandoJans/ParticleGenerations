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

  static checkRequirements(): void|{title: string, message: string} {
    Requirement.requirements = Requirement.requirements.filter((requirement) => {
      if (requirement.requirementMet()) {
        const message = requirement.gameElement.unlock();
        if (message) {
          return message;
        }
        return false;
      }
      return true;
    });
  }
}
