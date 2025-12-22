import { Injectable } from '@angular/core';
import { ChargerRecord } from '../../../classes/records/charger/charger-record';
import { DarkStarCharger } from '../../../classes/features/chargers/dark-star-charger';
import { ChallengeRecord } from '../../../classes/records/challenges/challenge-record';
import { HoldingRecord } from '../../../classes/records/holdings/holding-record';
import { Num } from '../../../num';

export interface DarkStarChargerCtx {
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
}

@Injectable({ providedIn: 'root' })
export class DarkStarChargerHelperService {
  private activeChargers: Set<DarkStarCharger> = new Set();
  private chargerRotationTime: number = 0;
  private readonly CHARGER_SWITCH_INTERVAL = 600; // Switch chargers every 10 minutes (600 seconds)

  constructor() {}

  /**
   * Handle dark star charger strategy during dark galaxy challenge
   */
  handleDarkStarChargers(ctx: DarkStarChargerCtx): void {
    // Only manage chargers if we're in the dark galaxy challenge
    const inDarkGalaxy = ChallengeRecord.currentChallenges['green'] === ChallengeRecord.darkGalaxy;
    if (!inDarkGalaxy) {
      // Deactivate all chargers if not in dark galaxy
      this.activeChargers.forEach(charger => {
        if (charger.isActive()) {
          charger.deactivateNerf();
          charger.stopCharging();
        }
      });
      this.activeChargers.clear();
      return;
    }

    // Check if it's time to rotate chargers
    if (ctx.totalElapsedTime - this.chargerRotationTime >= this.CHARGER_SWITCH_INTERVAL) {
      this.rotateChargers(ctx);
      this.chargerRotationTime = ctx.totalElapsedTime;
    }

    // Tier up chargers when possible
    this.tierUpChargers(ctx);
  }

  /**
   * Rotate to the next best charger based on progress
   */
  private rotateChargers(ctx: DarkStarChargerCtx): void {
    const bestCharger = this.selectBestCharger();
    
    if (bestCharger && !this.activeChargers.has(bestCharger)) {
      // Deactivate current chargers
      this.activeChargers.forEach(charger => {
        if (charger.isActive()) {
          charger.deactivateNerf();
          charger.stopCharging();
        }
      });
      this.activeChargers.clear();

      // Activate the new charger
      if (bestCharger.isUnlocked() && bestCharger.isEnabled()) {
        bestCharger.activateNerf();
        bestCharger.startCharging();
        this.activeChargers.add(bestCharger);

        const resultKey = `dark_star_charger_switch_${bestCharger.name}`;
        if (!ctx.results[resultKey]) {
          ctx.results[resultKey] = {
            element: `Switched to ${bestCharger.displayName}`,
            time: ctx.totalElapsedTime,
            timeBetween: ctx.elapsedSincePrevious,
            style: 'dark-galaxy',
          };
          ctx.markNew();
        }
      }
    }
  }

  /**
   * Select the best charger based on current game state
   */
  private selectBestCharger(): DarkStarCharger | null {
    const redParticles = HoldingRecord.redParticles.amount;
    const yellowParticles = HoldingRecord.yellowParticles.amount;
    const yellowPower = HoldingRecord.yellowPower.amount;
    const starKeys = HoldingRecord.starKeys.amount;

    // Priority order based on what's most effective at current stage:
    // 1. Combine charger - best overall when unlocked
    // 2. Star challenge charger - for completing challenges
    // 3. Yellow fusion charger - if fusion is significant
    // 4. Yellow upgrade charger - mid-game yellow optimization
    // 5. Star key charger - if star keys are high
    // 6. Yellow generator charger - if yellow generators are strong
    // 7. Red accelerator charger - if red accelerators are strong
    // 8. Red generator charger - fallback early game

    const chargers = [
      ChargerRecord.combineDarkCharger,
      ChargerRecord.starChallengeDarkCharger,
      ChargerRecord.yellowFusionDarkCharger,
      ChargerRecord.yellowUpgradeDarkCharger,
      ChargerRecord.starKeyDarkCharger,
      ChargerRecord.yellowGeneratorDarkCharger,
      ChargerRecord.redAcceleratorDarkCharger,
      ChargerRecord.redGeneratorDarkCharger,
    ];

    // Find first unlocked and enabled charger
    for (const charger of chargers) {
      if (charger.isUnlocked() && charger.isEnabled()) {
        return charger;
      }
    }

    return null;
  }

  /**
   * Tier up chargers when they reach max charge
   */
  private tierUpChargers(ctx: DarkStarChargerCtx): void {
    this.activeChargers.forEach(charger => {
      if (charger.canTierUp()) {
        const oldTier = charger.tier.toNumber();
        charger.tierUp();
        const newTier = charger.tier.toNumber();

        const resultKey = `dark_star_charger_tier_${charger.name}_${newTier}`;
        if (!ctx.results[resultKey]) {
          ctx.results[resultKey] = {
            element: `${charger.displayName} Tier ${newTier}`,
            time: ctx.totalElapsedTime,
            timeBetween: ctx.elapsedSincePrevious,
            style: 'dark-galaxy',
          };
          ctx.markNew();
        }
      }
    });
  }

  /**
   * Reset the charger helper state
   */
  reset(): void {
    this.activeChargers.forEach(charger => {
      if (charger.isActive()) {
        charger.deactivateNerf();
        charger.stopCharging();
      }
    });
    this.activeChargers.clear();
    this.chargerRotationTime = 0;
  }
}
