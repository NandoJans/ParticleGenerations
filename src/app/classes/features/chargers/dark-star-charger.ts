import {Charger} from "../charger";
import {Num} from "../../../num";
import {GameElement} from "../game-element";

/**
 * DarkStarCharger is a special type of charger that only charges when its related nerf is active.
 * The nerf makes the dark star galaxy challenge harder, so users must strategically enable chargers.
 */
export abstract class DarkStarCharger extends Charger {
  // Indicates if the charger's nerf is currently active
  protected isNerfActive: boolean = false;

  /**
   * DarkStarChargers only charge when their nerf is enabled
   */
  override shouldCharge(): boolean {
    return this.isNerfActive && this.isUnlocked() && this.isEnabled();
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

  /**
   * Get a description of the nerfs applied by this charger
   */
  abstract getNerfDescription(): string;

  /**
   * Get a description of the effect/amplification provided by this charger
   */
  abstract getEffectDescription(): string;

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
