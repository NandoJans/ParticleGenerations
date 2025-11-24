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
  tier: Num = new Num(1, 0);
  startTier: Num = new Num(1, 0);
  abstract baseMaxCharge: Num;
  abstract maxTier: Num | undefined;
  abstract canInfiniteChargeAtMaxTier: boolean;

  /**
   * Get the current max charge based on tier
   * Override this method to implement custom tier scaling
   */
  get maxCharge(): Num {
    return this.getMaxChargeForTier(this.tier);
  }

  /**
   * Calculate max charge for a given tier
   * Override this method to implement custom tier scaling
   */
  getMaxChargeForTier(tier: Num): Num {
    return this.baseMaxCharge.copy();
  }

  /**
   * Get the max charge for the previous tier (used in tier up calculations)
   */
  getPreviousTierMaxCharge(): Num {
    if (this.tier.lte(new Num(1, 0))) {
      return this.baseMaxCharge.copy();
    }
    return this.getMaxChargeForTier(this.tier.sub(new Num(1, 0)));
  }

  /**
   * Get description of the milestone boost from tiering up
   * Override this method to provide custom descriptions
   */
  getTierMilestoneBoostDescription(): string {
    return '';
  }

  buffer: Num = new Num(1, 0);
  baseBuffer: Num = new Num(1, 0);

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
    // If there is charge or tier, perform action
    if (this.charge.gt(new Num(0, 0)) || this.tier.gt(new Num(0, 0))) {
      const effect = this.action();
      if (effect instanceof Num) {
        this.effect = effect;
      }
    }
    if (this.tier.lt(this.startTier)) this.tier = this.startTier.copy();
    if (this.charge.lt(this.startCharge)) this.charge = this.startCharge.copy();
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
  abstract action(): undefined | Num;

  /**
   * Apply a tier-based drawback to reduce the effectiveness of charge as tiers increase
   * This prevents infinite scaling
   */
  abstract applyTierDrawback(chargeValue: Num): Num;

  /**
   * Applies charge to the charger
   */
  protected applyCharge(amount: Num): void {
    this.charge = amount.copy();

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
  canTierUp(): boolean {
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
  isAtMaxTier(): boolean {
    if (this.maxTier === undefined) {
      return false;
    }
    return this.tier.greq(this.maxTier);
  }

  /**
   * Tier up the charger - subtract previous max charge from charge and increase tier
   */
  tierUp(): void {
    if (this.canTierUp()) {
      // Subtract the current max charge (which becomes the previous tier's max charge after tier up)
      const previousMaxCharge = this.maxCharge;
      this.charge = this.charge.sub(previousMaxCharge);
      if (this.charge.lt(new Num(0, 0))) {
        this.charge = new Num(0, 0);
      }
      this.tier = this.tier.add(new Num(1, 0));
    }
  }

  startCharging(): void {
    this.charging = true;
  }

  stopCharging(): void {
    this.charging = false;
  }

  toggleCharging(): void {
    this.charging = !this.charging;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  /**
   * Get the effective charge value after applying tier drawback
   */
  protected getEffectiveCharge(): Num {
    return this.applyTierDrawback(this.charge);
  }

  protected getTierChargeEffect(): Num {
    return this.charge.mul(this.tier);
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
