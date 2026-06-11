import {Challenge} from "../challenge";
import {ResetKey} from "../../enums/reset-key";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";

export abstract class YellowStarChallenge extends Challenge {
  type: string = "yellow-star-challenge";
  prestigeLayer: string = "yellow";
  prestige: ResetKey = ResetKey.RED;
  enhancement: Enhancement | null = null;
  allowedEnhancements: Enhancement[] = [EnhancementRecord.green];

  canEnhance(): boolean {
    return true;
  }

  enhance(): void {}

  enhancementString(_enhancement: Enhancement): string {
    return 'Use one Green Key to double this challenge reward.';
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
}
