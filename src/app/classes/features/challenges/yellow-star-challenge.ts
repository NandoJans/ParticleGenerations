import {Challenge} from "../challenge";
import {ResetKey} from "../../enums/reset-key";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";
import {Num} from "../../../num";

export abstract class YellowStarChallenge extends Challenge {
  /**
   * The stellar-challenge page unlocks around the early-yellow 1e3 particle
   * benchmark. Using that same progression landmark keeps old challenge
   * rewards accessible after Blue removes manual yellow prestiges.
   */
  static readonly BLUE_COMPLETION_COST: Num = new Num(1, 3);
  type: string = "yellow-star-challenge";
  prestigeLayer: string = "yellow";
  prestige: ResetKey = ResetKey.RED;
  enhancement: Enhancement | null = null;
  allowedEnhancements: Enhancement[] = [EnhancementRecord.green];

  canEnhance(): boolean {
    return true;
  }

  protected getEnhancementPower(enhancement: Enhancement): Num {
    return enhancement.getMultiplier()
  }

  enhance(): void {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.getEnhancementPower(this.enhancement));
    }
  }

  enhancementString(enhancement: Enhancement): string {
    return `Multiply this challenge reward by ${this.getEnhancementPower(enhancement).toString(2)}x.`;
  }

  override save(): void {
    super.save();
    this.localStorageHelper.save(this.enhancement?.saveName ?? null, 'enhancement');
  }

  override tryLoad(): void {
    super.tryLoad();
    const enhancementName = this.localStorageHelper.load(null, 'enhancement');
    this.enhancement = enhancementName === EnhancementRecord.green.saveName
      ? EnhancementRecord.green
      : null;
    if (this.enhancement) this.enhancement.add(this);
  }

  override getCurrency(): Holding {
    return HoldingRecord.redParticles;
  }

  getCompletionPurchaseCost(): Num {
    return YellowStarChallenge.BLUE_COMPLETION_COST.copy();
  }

  canBuyCompletion(): boolean {
    return !this.isCompleted()
      && HoldingRecord.yellowParticles.amount.greq(this.getCompletionPurchaseCost());
  }

  buyCompletion(): boolean {
    if (!this.canBuyCompletion()) return false;

    HoldingRecord.yellowParticles.sub(this.getCompletionPurchaseCost());
    this.complete();
    // Rewards are applied by the normal calculation-order tick. Applying the
    // reward here as well is unsafe because many rewards mutate global
    // multipliers (and Lalande mutates upgrade amounts). Those effects have
    // already been applied for the current tick, so running again compounds
    // them every time a completion is purchased.
    this.refreshUpgrades();
    this.save();
    return true;
  }
}
