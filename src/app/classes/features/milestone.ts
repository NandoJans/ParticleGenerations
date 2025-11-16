import {GameElement} from "./game-element";
import {Num} from "../../num";
import {Styles} from "../enums/styles";
import {Holding} from "./holding";
import {ResetKey} from "../enums/reset-key";
import {Resetable} from "./interfaces/resetable";
import {Storable} from "./interfaces/storable";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {Require} from "./interfaces/require";

export abstract class Milestone extends GameElement implements Resetable, Storable, Require {
  abstract displayName: string
  abstract getDescription(): string|string[]
  abstract type: string
  abstract style: Styles
  abstract goal: Num
  abstract currency: Holding
  abstract resetId: ResetKey
  softResetId: ResetKey = ResetKey.NONE

  buffer: Num = new Num(1, 0)
  baseBuffer: Num = new Num(1, 0)

  requirementSatisfied(amount: Num): boolean {
    return this.goalReached();
  }

  action(): void {}
  tick(): void {}

  override init(): void {
    if (this.goalReached()) {
      this.action()
    }
    super.init();
  }

  override run(): void {
    if (this.goalReached()) {
      this.tick()
    }
  }

  protected goalReached(): boolean {
    return this.currency.amount.greq(this.goal)
  }

  reset() {
    this.unlocked = this.startUnlocked;
    this.requirement.forEach(requirement => {
      requirement.register();
    })
  }

  softReset() {}

  getSaveKey(): string {
    return this.name;
  }

  getSaveCategory(): string {
    return "milestones";
  }

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  save(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.localStorageHelper.save(this.unlocked, 'unlocked');
  }

  tryLoad() {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.unlocked = this.localStorageHelper.load(this.unlocked, 'unlocked');
  }

  override unlock(): void {
    super.unlock();
    this.action();
  }
}
