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
    // Only charge when the charger is enabled (charging = true) and we're in the dark galaxy challenge
    if (this.charging && this.shouldCharge()) {
      const chargeAmount = this.getChargeAmount();
      this.applyCharge(chargeAmount);
      
      // Cap at max
      if (this.amount.greq(this.max)) {
        this.amount = this.max.copy();
      }
    }
  }

  /**
   * Override this method in subclasses to determine when the charger should charge
   * By default, returns true (always charge when enabled)
   */
  protected shouldCharge(): boolean {
    return true;
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
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.amount = this.localStorageHelper.loadNum(this.amount, 'amount');
    this.charging = this.localStorageHelper.load(this.charging, 'charging');
    this.collapsed = this.localStorageHelper.load(this.collapsed, 'collapsed');
  }

  save(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.localStorageHelper.saveNum(this.amount, 'amount');
    this.localStorageHelper.save(this.charging, 'charging');
    this.localStorageHelper.save(this.collapsed, 'collapsed');
  }

}
