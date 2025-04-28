import {Requirement} from "./interfaces/requirement";
import {GameElementHelper} from "../helpers/game-element-helper";
import {Num} from "../../num";

export abstract class GameElement {
  unlocked: boolean = false
  startUnlocked: boolean = false
  abstract requirement: Requirement[]
  hidden: boolean = false
  disabled: boolean = false
  calculationOrder: number|undefined = undefined
  abstract name: string
  saveName: string

  constructor(saveName: string) {
    this.saveName = saveName;
  }

  requirementsMet(): boolean {
    return this.requirement.every((requirement) => requirement.requirementMet());
  }

  isHidden(): boolean {
    return this.hidden;
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  unlock(): void|{title: string, message: string} {
    this.unlocked = true;
  }

  protected getGameElementHelper(): GameElementHelper {
    return new GameElementHelper();
  }

  run(speed: Num): void {

  }
}
