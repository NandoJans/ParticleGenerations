import {Requirement} from "./interfaces/requirement";

export abstract class GameElement {
  unlocked: boolean = false
  abstract requirement: Requirement[]

  requirementsMet(): boolean {
    return this.requirement.every((requirement) => requirement.requirementMet());
  }
}
