import {Num} from "../../../num";
import {Require} from "./require";
import {GameElement} from "../game-element";

export class Requirement {
  requirement: Require;
  amount: Num;
  unlocked: boolean;
  gameElement: GameElement;
  static requirements: {[key: string]: Requirement} = {};

  constructor(requirement: Require, amount: Num, gameElement: GameElement, unlocked: boolean = false) {
    this.requirement = requirement;
    this.unlocked = unlocked;
    this.amount = amount;
    this.gameElement = gameElement;
    this.register(gameElement);
  }

  requirementMet(): boolean {
    return this.requirement.requirementSatisfied(this.amount);
  }

  static checkRequirements(): {title: string, message: string}[] {
    const messages: {title: string, message: string}[] = [];

    Object.entries(Requirement.requirements).forEach(([key, requirement]) => {
      if (requirement.requirementMet()) {
        if (requirement.gameElement.unlocked) {
          return;
        }
        const message = requirement.gameElement.unlock();
        if (message) {
          messages.push(message);
        }
        delete Requirement.requirements[key];
      }
    });

    return messages;
  }

  register(gameElement: GameElement = this.gameElement) {
    Requirement.requirements[gameElement.name] = this;
  }

  static clear(gameElement: GameElement) {
    if (gameElement.name in Requirement.requirements) {
      delete Requirement.requirements[gameElement.name];
    }
  }
}
