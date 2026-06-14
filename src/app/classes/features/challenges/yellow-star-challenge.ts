import {Challenge} from "../challenge";
import {ResetKey} from "../../enums/reset-key";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";
import {Num} from "../../../num";

export abstract class YellowStarChallenge extends Challenge {
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
}
