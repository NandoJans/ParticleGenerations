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

  // Charge tracking
  charge: Num = new Num(0, 0);
  startCharge: Num = new Num(0, 0);

  // Tier system
  tier: Num = new Num(0, 0);
  startTier: Num = new Num(0, 0);
  abstract maxCharge: Num;
  abstract maxTier: Num | undefined;
  abstract canInfiniteChargeAtMaxTier: boolean;

  charging: boolean = false;
  collapsed: boolean = false;
  abstract getNerfDescription(): string;
  abstract getChargeDescription(): string;
  abstract getRewardDescription(): string;
  abstract getEffectBreakdown(): {formula: string, effects: string[]};

  // Effect tracking
  effect: Num = new Num(0, 0);

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  constructor(saveName: string) {
    super(saveName);
  }

  /**
   * Main run loop - handles charging logic
   */
  override run(speed: Num): void {
    if (this.charging && this.shouldCharge()) {
      const chargeAmount = this.getChargeAmount();
      this.applyCharge(chargeAmount);

      // Cap at max
      if (this.charge.greq(this.maxCharge)) {
        this.charge = this.maxCharge.copy();
      }
    }
  }

  /**
   * Determines if the charger should charge
   * Must be overridden by subclasses to implement specific charging conditions
   */
  protected shouldCharge(): boolean {
    return true;
  }
  /**
   * Returns the amount of charge to add per tick
   * Must be overridden by subclasses to implement specific charge calculation
   */
  abstract getChargeAmount(): Num;

  /**
   * Action function that runs when the charger is charging
   * Should calculate and apply the charger's effect
   */
  abstract action(): void;

  /**
   * Apply a tier-based drawback to reduce the effectiveness of charge as tiers increase
   * This prevents infinite scaling
   */
  abstract applyTierDrawback(chargeValue: Num): Num;

  /**
   * Applies charge to the charger
   */
  protected applyCharge(amount: Num): void {
    this.charge = this.charge.add(amount);

    // Cap charge at max if at max tier and can't infinite charge
    if (this.isAtMaxTier() && !this.canInfiniteChargeAtMaxTier) {
      if (this.charge.gt(this.maxCharge)) {
        this.charge = this.maxCharge.copy();
      }
    }
  }

  /**
   * Check if the charger can tier up
   */
  protected canTierUp(): boolean {
    // Can't tier up if already at max tier
    if (this.isAtMaxTier()) {
      return false;
    }

    // Can tier up if charge meets or exceeds max charge
    return this.charge.greq(this.maxCharge);
  }

  /**
   * Check if at maximum tier
   */
  protected isAtMaxTier(): boolean {
    if (this.maxTier === undefined) {
      return false;
    }
    return this.tier.greq(this.maxTier);
  }

  /**
   * Tier up the charger - reset charge and increase tier
   */
  protected tierUp(): void {
    if (this.canTierUp()) {
      this.charge = new Num(0, 0);
      this.tier = this.tier.add(new Num(1, 0));
    }
  }

  /**
   * Get the effective charge value after applying tier drawback
   */
  protected getEffectiveCharge(): Num {
    return this.applyTierDrawback(this.charge);
  }

  softReset(): void {}

  reset(): void {
    this.charge = this.startCharge.copy();
    this.tier = this.startTier.copy();
    this.effect = new Num(0, 0);
  }

  getSaveCategory(): string {
    return "chargers";
  }

  getSaveKey(): string {
    return this.saveName;
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.charge = this.localStorageHelper.loadNum(this.startCharge, "charge");
    this.tier = this.localStorageHelper.loadNum(this.startTier, "tier");
    this.unlocked = this.localStorageHelper.load(this.unlocked, "unlocked");
    this.firstUnlock = this.localStorageHelper.load(this.firstUnlock, "firstUnlock");
    this.charging = this.localStorageHelper.load(this.charging, 'charging');
    this.collapsed = this.localStorageHelper.load(this.collapsed, 'collapsed');
  }

  save(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.localStorageHelper.saveNum(this.charge, "charge");
    this.localStorageHelper.saveNum(this.tier, "tier");
    this.localStorageHelper.save(this.unlocked, "unlocked");
    this.localStorageHelper.save(this.firstUnlock, "firstUnlock");
    this.localStorageHelper.save(this.charging, 'charging');
    this.localStorageHelper.save(this.collapsed, 'collapsed');
  }

}
