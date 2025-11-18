import {GameElement} from "./game-element";
import {Num} from "../../num";
import {Resetable} from "./interfaces/resetable";
import {ResetKey} from "../enums/reset-key";
import {Storable} from "./interfaces/storable";
import { LocalStorageHelper } from "../helpers/local-storage-helper";

export abstract class Charger extends GameElement implements Resetable, Storable {
  abstract displayName: string;
  softResetId: ResetKey = ResetKey.NONE;
  abstract resetId: ResetKey;
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  speed: Num = new Num(1, 0);
  abstract max: Num;
  charging: boolean = false;
  collapsed: boolean = false;
  abstract getNerfDescription(): string;
  abstract getChargeDescription(): string;
  abstract getRewardDescription(): string;
  abstract getEffectBreakdown(): {formula: string, effects: string[]};

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  constructor(saveName: string) {
    super(saveName);
  }

  override run() {

  }

  abstract getChargeAmount(): Num;

  applyCharge(amount: Num): void {
    this.amount = this.amount.add(amount);
  }

  softReset(): void {}

  reset(): void {
    this.amount = this.startAmount.copy();
  }

  getSaveCategory(): string {
    return "chargers";
  }

  getSaveKey(): string {
    return this.saveName;
  }

  tryLoad(): void {
    throw new Error("Method not implemented.");
  }

  save(): void {
    throw new Error("Method not implemented.");
  }

}
