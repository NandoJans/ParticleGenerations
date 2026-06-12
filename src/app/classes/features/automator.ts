import {GameElement} from "./game-element";
import {Num} from "../../num";
import {Buyable} from "./buyable";
import {Requirement} from "./interfaces/requirement";
import {Storable} from "./interfaces/storable";
import { LocalStorageHelper } from "../helpers/local-storage-helper";
import {Styles} from "../enums/styles";
import {Resetable} from "./interfaces/resetable";
import {ResetKey} from "../enums/reset-key";
import {DropDownMessageService} from "../../services/visuals/drop-down-message.service";

export abstract class Automator extends GameElement implements Storable, Resetable {
  softResetId: ResetKey = ResetKey.NONE;
  abstract resetId: ResetKey;

  reset(): void {
    this.completed = false;
    this.save();
    this.buyables().forEach(buyable => {
      buyable.auto = false;
    })
    this.requirement.forEach(requirement => {
      requirement.register();
    })
    this.init();
  }

  softReset(): void {}
  abstract displayName: string;
  abstract style: Styles;
  active = true;

  abstract buyables(): Buyable[];

  completed: boolean = false;
  firstTimeCompleted: boolean = false;
  abstract goal: Num
  abstract goalString: string;
  abstract task(): Num;
  override calculationOrder: number = 1050;
  maxBuys: Num|null = null

  requirement: Requirement[] = [];

  checkTask(): boolean {
    const progress = this.task();
    if (progress.greq(this.goal)) {
      const buyables = this.buyables();
      buyables.forEach(buyable => {
        buyable.auto = true;
      });
      this.completed = true;
      this.firstTimeCompleted = true;
      this.save();
      DropDownMessageService.dropDown(
        `Automator ${this.displayName} completed!`,
        `You have completed the task: ${this.goalString}`,
        'success'
      )
    }
    return false;
  }

  override run(): boolean {
    if (!this.isUnlocked()) return false;

    if (this.completed && this.active) {
      this.buyables().forEach(buyable => {
        // Resets may clear a buyable's automation after the automator has been
        // restored by a milestone. Keep the buyable in sync with the enabled
        // automator instead of requiring the player to toggle it again.
        buyable.auto = true;
        if (buyable.isUnlocked() && buyable.isBuyable() && this.belowMax()) {
          buyable.buy();
        }
      })
      this.action();
    } else if (!this.completed) {
      return this.checkTask();
    }
    return false
  }

  action() {}

  localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  getSaveCategory(): string {
    return 'automators';
  }

  getSaveKey(): string {
    return this.name;
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.completed = this.localStorageHelper.load(this.completed, 'completed');
    this.firstTimeCompleted = this.localStorageHelper.load(this.firstTimeCompleted, 'firstTimeCompleted');
    this.active = this.localStorageHelper.load(this.active, 'active');
    this.maxBuys = this.localStorageHelper.loadNum(new Num(1, 100), 'maxBuys');
  }

  save() {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.localStorageHelper.save(this.completed, 'completed');
    this.localStorageHelper.save(this.firstTimeCompleted, 'firstTimeCompleted');
    this.localStorageHelper.save(this.active, 'active');
    if (this.maxBuys !== null) {
      this.localStorageHelper.saveNum(this.maxBuys, 'maxBuys');
    }
  }

  activate(): void {
    if (this.completed) {
      this.active = true;
      this.save();
      this.buyables().forEach(buyable => {
        buyable.auto = true;
      })
    }
  }

  deactivate(): void {
    this.active = false;
    this.save();
    this.buyables().forEach(buyable => {
      buyable.auto = false;
    })
  }

  taskString(): string {
    return this.task().toString();
  }

  hasMaxBuys(): boolean {
    return false;
  }

  belowMax(): boolean {
    if (this.hasMaxBuys() && this.maxBuys instanceof Num) {
      for (const buyable of this.buyables()) {
        if (!buyable.bought.lt(this.maxBuys ?? new Num(0, 0))) {
          return false;
        }
      }
    }
    return true
  }

  isActive(): boolean {
    return this.completed && this.active;
  }
}
