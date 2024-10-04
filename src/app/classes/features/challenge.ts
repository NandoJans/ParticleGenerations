import {Num} from "../../num";
import {GameElement} from "./game-element";
import {Holding} from "./holding";
import {ResetKey} from "../enums/reset-key";
import {Styles} from "../enums/styles";
import {Resetable} from "./interfaces/resetable";
import {Storable} from "./interfaces/storable";
import {LocalStorageHelper} from "../helpers/local-storage-helper";

export abstract class Challenge extends GameElement implements Resetable, Storable {
  abstract name: string
  abstract displayName: string
  abstract baseGoal: Num
  abstract goal: Num
  abstract currency: Holding
  abstract prestige: ResetKey
  abstract getRewardDescription(): string
  abstract getDescription(): string
  abstract style: Styles
  abstract type: string
  abstract resetId: ResetKey
  softResetId: ResetKey = ResetKey.NONE;
  instantComplete: boolean = false
  abstract reward(): Num | undefined
  abstract nerfs(): void
  completed: boolean | Num = false
  effect: Num | undefined = undefined
  maxEffect: Num | undefined = undefined
  dynamic: boolean | undefined = undefined
  maxCompletions: Num | undefined = undefined
  goalIncrease: Num | undefined = undefined

  run(): Num | undefined {
    const reward = this.reward();
    if (reward) {
      this.effect = reward;
    }
    return reward;
  }

  effectString(): string {
    return '';
  }

  getEffectDisplay(): string {
    return this.effectString();
  }

  reset(): void {
    this.completed = false;
  }

  softReset(): void {
  }

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())

  getSaveCategory(): string {
    return "challenges";
  }

  getSaveKey(): string {
    return this.name;
  }

  save(): void {
    this.localStorageHelper.save(this.completed, "completed");
    this.localStorageHelper.save(this.unlocked, "unlocked");
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())
    this.completed = this.localStorageHelper.load(false, "completed");
    this.unlocked = this.localStorageHelper.load(false, "unlocked");
  }
}
