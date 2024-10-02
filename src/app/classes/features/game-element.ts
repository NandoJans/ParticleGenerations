import {Requirement} from "./interfaces/requirement";
import {GameElementHelper} from "../helpers/game-element-helper";

export abstract class GameElement {
  unlocked: boolean = false
  abstract requirement: Requirement[]
  hidden: boolean = false
  disabled: boolean = false

  requirementsMet(): boolean {
    return this.requirement.every((requirement) => requirement.requirementMet());
  }

  isHidden(): boolean {
    return this.hidden;
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  protected getGameElementHelper(): GameElementHelper {
    return new GameElementHelper();
  }
}
