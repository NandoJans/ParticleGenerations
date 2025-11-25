import {Charger} from "../charger";
import {Num} from "../../../num";
import {GameElement} from "../game-element";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {ResetHelper} from "../../helpers/reset-helper";

/**
 * DarkStarCharger is a special type of charger that only charges when its related nerf is active.
 * The nerf makes the dark star galaxy challenge harder, so users must strategically enable chargers.
 */
export abstract class DarkStarCharger extends Charger {
  // Indicates if the charger's nerf is currently active
  protected isNerfActive: boolean = false;

  override run(speed: Num): void {
    // Runs charge logic and action logic.
    super.run(speed);

    // Note: Tier up is now manual via the UI button, not automatic

    // Apply the nerf effects if active
    if (this.isNerfActive) {
      this.applyNerfs();
    }
  }

  /**
   * DarkStarChargers only charge when their nerf is enabled
   */
  override shouldCharge(): boolean {
    return this.isNerfActive && this.isUnlocked() && this.isEnabled() && ChallengeRecord.currentChallenges['green'] === ChallengeRecord.darkGalaxy;
  }

  /**
   * Activate the charger's nerf
   */
  activateNerf(): void {
    this.isNerfActive = true;
    this.applyNerfs();
  }

  /**
   * Deactivate the charger's nerf
   */
  deactivateNerf(): void {
    this.isNerfActive = false;
    this.revertNerfs();
  }

  /**
   * Toggle the nerf on/off
   */
  toggleNerf(): void {
    if (this.isNerfActive) {
      this.deactivateNerf();
    } else {
      this.activateNerf();
    }
  }

  /**
   * Check if the charger is currently active (nerf enabled)
   */
  isActive(): boolean {
    return this.isNerfActive;
  }

  override startCharging() {
    super.startCharging();
    this.activateNerf();
  }

  override stopCharging() {
    super.stopCharging();
    this.deactivateNerf();
  }

  /**
   * Apply the nerfs specific to this charger
   * Must be implemented by concrete charger classes
   */
  abstract applyNerfs(): void;

  /**
   * Revert the nerfs when the charger is deactivated
   * Must be implemented by concrete charger classes
   */
  abstract revertNerfs(): void;

  override getEffectBreakdown(): {formula: string, effects: string[]} {
    const effects: string[] = [];

    if (this.charge.greq(new Num(1, 0))) {
      const chargeRatio = this.charge.div(this.maxCharge);
      const nerfIncrease = chargeRatio.mul(new Num(5, -2));
      effects.push(`Charge level: ${chargeRatio.mul(new Num(1, 2)).toString(1)}%`);
      effects.push(`Nerf increase: ${nerfIncrease.toString(3)}`);
    } else {
      effects.push("No charge accumulated yet");
    }

    return {
      formula: "0.1 - (charge% × 0.05)",
      effects: effects
    };
  }

  /**
   * Get a description of the effect/amplification provided by this charger
   */
  abstract getEffectDescription(): string;

  /**
   * Override tierUp to restart the dark galaxy challenge when tiering up.
   * This resets progress in the challenge but keeps the challenge active.
   */
  override tierUp(): void {
    if (this.canTierUp()) {
      super.tierUp();

      // If we're in the dark galaxy challenge, restart it to reset progress
      const darkGalaxy = ChallengeRecord.darkGalaxy;
      if (ChallengeRecord.currentChallenges[darkGalaxy.prestigeLayer] === darkGalaxy) {
        // Reset the prestige layer progress
        ResetHelper.reset(darkGalaxy.prestige);
        // Restart the challenge (re-apply nerfs)
        darkGalaxy.start();
      }
    }
  }

  override reset(): void {
    super.reset();
    this.isNerfActive = false;
  }

  override save(): void {
    super.save();
    this.localStorageHelper.save(this.isNerfActive, "isNerfActive");
  }

  override tryLoad(): void {
    super.tryLoad();
    this.isNerfActive = this.localStorageHelper.load(this.isNerfActive, "isNerfActive");

    // Reapply nerfs if the charger was active when saved
    if (this.isNerfActive) {
      this.applyNerfs();
    }
  }
}
