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

  getChargeAmount(): Num {
    // Calculate total charge from all active chargers
    const activeChargers = this.getActiveChargers();
    const totalCharge = this.getTotalCharge();

    if (activeChargers.lte(new Num(0, 0))) {
      return new Num(0, 0);
    }

    // Charge = totalCharge^activeChargers
    const chargeAmount = totalCharge.pow(activeChargers).log10();
    return chargeAmount.gt(new Num(0, 0)) ? chargeAmount : new Num(0, 0);
  }

  action(): undefined {
    // Calculate amplification of other charger effects
    const effectiveCharge = this.getEffectiveCharge();
    const baseEffect = new Num(1, 0).add(effectiveCharge.div(new Num(50, 0)));

    // Apply shared tier boost from all charger tiers
    this.effect = this.applySharedTierBoost(baseEffect);
  }

  applyNerfs(): void {
    // No nerfs, but requires minimum active chargers based on tier
  }

  revertNerfs(): void {
    // No nerfs to revert
  }

  getNerfDescription(): string {
    const requiredChargers = new Num(2, 0).add(this.tier);
    return `Requires ${requiredChargers.toString()} chargers to be active simultaneously.`;
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
    const requiredChargers = new Num(2, 0).add(this.tier);
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
    ChargerRecord.list.forEach((charger) => {
      if (charger !== this && charger instanceof DarkStarCharger && charger.isActive()) {
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
    ChargerRecord.list.forEach((charger) => {
      if (charger !== this && charger instanceof DarkStarCharger && charger.isActive()) {
        total = total.add(charger.getCharge());
      }
    });
    return total;
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.greenParticles, new Num(1, 9999999999), this)
    ]
  }
}
