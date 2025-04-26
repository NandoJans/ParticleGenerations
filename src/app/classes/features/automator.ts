import {GameElement} from "./game-element";
import {Num} from "../../num";
import {Buyable} from "./buyable";
import {Requirement} from "./interfaces/requirement";
import {Storable} from "./interfaces/storable";
import { LocalStorageHelper } from "../helpers/local-storage-helper";
import {Styles} from "../enums/styles";

export abstract class Automator extends GameElement implements Storable {
  abstract name: string;
  abstract displayName: string;
  abstract style: Styles;
  active = true;

  abstract buyables(): Buyable[];

  completed: boolean = false;
  abstract goal: Num
  abstract goalString: string;
  abstract task(): Num;

  requirement: Requirement[] = [];

  checkTask(): void {
    const progress = this.task();
    if (progress.greq(this.goal)) {
      const buyables = this.buyables();
      buyables.forEach(buyable => {
        buyable.auto = true;
      });
      this.completed = true;
      this.save();
    }
  }

  run(): void {
    if (this.completed && this.active) {
      this.buyables().forEach(buyable => {
        if (buyable.isBuyable() && buyable.auto) {
          buyable.buy();
        }
      })
    } else if (!this.completed) {
      this.checkTask();
    }
  }

  localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  getSaveCategory(): string {
    return 'automators';
  }

  getSaveKey(): string {
    return this.name;
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.localStorageHelper.load('completed');
    this.localStorageHelper.load('active');
  }

  save() {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.localStorageHelper.save(this.completed, 'completed');
    this.localStorageHelper.save(this.active, 'active');
  }

  enable(): void {
    if (this.completed) {
      this.active = true;
      this.save();
      this.buyables().forEach(buyable => {
        buyable.auto = true;
      })
    }
  }

  disable(): void {
    this.active = false;
    this.save();
    this.buyables().forEach(buyable => {
      buyable.auto = false;
    })
  }
}
