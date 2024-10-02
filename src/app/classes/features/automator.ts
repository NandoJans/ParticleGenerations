import {GameElement} from "./game-element";
import {Num} from "../../num";
import {Buyable} from "./buyable";
import {Requirement} from "./interfaces/requirement";
import {Storable} from "./interfaces/storable";
import { LocalStorageHelper } from "../helpers/local-storage-helper";

export abstract class Automator extends GameElement implements Storable {
  abstract name: string;
  abstract displayName: string;

  abstract buyables(): Buyable[];
  bought: Num = new Num(0, 0);

  completed: boolean = false;
  abstract goal: Num
  abstract goalString: string;
  abstract task(): Num;

  requirement: Requirement[] = [];

  private checkTask(): void {
    const progress = this.task();
    if (progress.greq(this.goal)) {
      const buyables = this.buyables();
      buyables.forEach(buyable => {
        buyable.auto = true;
      });
      this.completed = true;
      this.bought = new Num(1, 0)
    }
  }

  run(): void {
    if (!this.completed) {
      this.checkTask();
    }
  }

  localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  getSaveCategory(): string {
    throw 'automators';
  }

  getSaveKey(): string {
    throw this.name;
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.bought = this.localStorageHelper.load(new Num(0, 0), 'bought');
    if (this.bought.greq(new Num(1, 0))) {
      this.completed = true;
    }
  }

  save() {
    this.localStorageHelper.save(this.bought, 'bought');
  }
}
