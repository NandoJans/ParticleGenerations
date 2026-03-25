import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {ChargerRecord} from "../../records/charger/charger-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

/**
 * Combine Dark Star Charger
 *
 * Nerfs: nothing, requires per tier to have a certain amount of chargers active at the same time. Starts at 2 chargers.
 * Charge: is gained based on totalCharge^activeChargers
 * Amplifies: other charger effects
 */
export class CombineDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Combine Charger';
  resetId: ResetKey = ResetKey.GREEN;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'combine-dark-star-charger';

  override tierNerf: Num[] = [
    new Num(0.5, 0)
  ];

  /**
   * Calculate max charge for a given tier
   * Each tier increases max charge by 10x
   */
  override getMaxChargeForTier(tier: Num): Num {
    if (tier.lte(new Num(1, 0))) {
      return this.baseMaxCharge.copy();
    }
    // Max charge = baseMaxCharge * 10^(tier - 1)
    const tierMultiplier = new Num(10, 0).pow(tier.sub(new Num(1, 0)));
    return this.baseMaxCharge.mul(tierMultiplier);
  }

  getChargeAmount(): Num {
    // Calculate total charge from all active chargers
    const activeChargers = this.getActiveChargers();
    const totalCharge = this.getTotalCharge();

    if (activeChargers.lte(new Num(0, 0))) {
      return new Num(0, 0);
    }

    // Charge = totalCharge^activeChargers
    const chargeAmount = totalCharge.pow(activeChargers).pow(new Num(0.12, 0));

    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }

  action(): undefined {
    // Calculate amplification of other charger effects
    const effectiveCharge = this.getEffectiveCharge();
    this.setSharedCharge(effectiveCharge);
  }

  applyNerfs(): void {
    // No nerfs, but requires minimum active chargers based on tier
  }

  revertNerfs(): void {
    // No nerfs to revert
  }

  getRequiredActiveChargers(): Num {
    return Num.ONE.add(this.tier);
  }

  getNerfDescription(): string {
    return `Requires ${this.getRequiredActiveChargers().toString()} chargers to be active simultaneously.`;
  }

  getEffectDescription(): string {
    return `${this.effect.toString()}x amplification to other charger effects`;
  }

  getChargeDescription(): string {
    return 'Charges based on the total charge from all active chargers raised to the power of active chargers.';
  }

  getRewardDescription(): string {
    return 'Amplifies the effects of all other active chargers.';
  }

  override shouldCharge(): boolean {
    // Check if enough chargers are active based on tier
    const requiredChargers = this.getRequiredActiveChargers();
    const activeChargers = this.getActiveChargers();

    return  super.shouldCharge() &&
            this.isNerfActive &&
           this.isUnlocked() &&
           this.isEnabled() &&
           activeChargers.greq(requiredChargers);
  }

  /**
   * Get the number of active chargers (excluding this one)
   */
  private getActiveChargers(): Num {
    let count = new Num(0, 0);
    ChargerRecord.darkStarChargerList.forEach((charger) => {
      if (charger !== this && charger.isActive()) {
        count = count.add(new Num(1, 0));
      }
    });
    return count;
  }

  /**
   * Get the total charge from all active chargers (excluding this one)
   */
  private getTotalCharge(): Num {
    let total = new Num(0, 0);
    ChargerRecord.darkStarChargerList.forEach((charger) => {
      if (charger !== this && charger.isActive()) {
        total = total.add(charger.chargeAmount);
      }
    });
    return total;
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: "(Total Charge ^ Active Chargers)^0.12",
      effects: [
        `Total Charge from Active Chargers: ${this.getTotalCharge().toString()}`,
        `Active Chargers: ${this.getActiveChargers().toString()}`,
        `Charge Amount: ${this.chargeAmount.toString()}`,
      ]
    }
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.greenParticles, new Num(1, 10), this)
    ]
  }
}
