import {Requirement} from "./interfaces/requirement";
import {GameElementHelper} from "../helpers/game-element-helper";
import {Num} from "../../num";

export abstract class GameElement {
  firstUnlock: boolean = false
  unlocked: boolean = false
  startUnlocked: boolean = false
  abstract requirement: Requirement[]
  hidden: boolean = false
  enabled: boolean = true
  calculationOrder: number|undefined = undefined
  abstract name: string
  saveName: string

  init() {}

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
    this.firstUnlock = true;
  }

  lock(): void {
    this.unlocked = false;
  }

  protected getGameElementHelper(): GameElementHelper {
    return new GameElementHelper();
  }

  run(speed: Num): void {

  }

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }
}
