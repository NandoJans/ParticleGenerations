import { Injectable } from '@angular/core';
import { PrestigeLayer } from '../../../classes/features/prestiges/prestige-layer';
import { Holding } from '../../../classes/features/holding';
import { Num } from '../../../num';
import { GeneratorRecord } from '../../../classes/records/generators/generator-record';
import { HoldingRecord } from '../../../classes/records/holdings/holding-record';
import { UpgradeRecord } from '../../../classes/records/upgrades/upgrade-record';

export interface PrestigeCtx {
  totalElapsedTime: number;
  prestigeStartTimes: Map<string, number>;
  prestigeGainHistory: Map<string, Array<{ time: number; gain: Num }>>;
  prestigeBestReachedTimes: Map<string, number>;
  YELLOW_PRESTIGES_IMMEDIATE_THRESHOLD: number;
  STAR_PARTICLES_LOW_THRESHOLD: Num;
  STAR_PARTICLES_HIGH_POWER: number;
  STAR_PARTICLES_HIGH_MULTIPLIER: number;
  PRESTIGE_TIMEOUT_SECONDS: number;
  WAIT_AFTER_BEST_SECONDS: number;
  PRESTIGE_TIMEOUT_FUSION_SECONDS: number;
}

@Injectable({ providedIn: 'root' })
export class PrestigeHelperService {
  private timeOnMaxFusion: number = 0;

  trackPrestigeGain(ctx: PrestigeCtx, prestigeLayer: PrestigeLayer): void {
    const layerName = prestigeLayer.name;
    if (!ctx.prestigeGainHistory.has(layerName)) {
      ctx.prestigeGainHistory.set(layerName, []);
    }

    const history = ctx.prestigeGainHistory.get(layerName)!;
    history.push({
      time: ctx.totalElapsedTime,
      gain: prestigeLayer.holdingGain.copy(),
    });

    // Keep only recent history (last 10 entries)
    if (history.length > 10) {
      history.shift();
    }
  }

  isWorthPrestiging(ctx: PrestigeCtx, prestigeLayer: PrestigeLayer, holding: Holding): boolean {
    // Track current prestige gain for analysis
    this.trackPrestigeGain(ctx, prestigeLayer);

    // Get time since last prestige for this layer
    const lastPrestigeTime = ctx.prestigeStartTimes.get(prestigeLayer.name) || 0;
    const timeSincePrestige = ctx.totalElapsedTime - lastPrestigeTime;

    // Check if yellow fusion has been reached
    const hasReachedYellowFusion = GeneratorRecord.yellowFusionGenerator.isUnlocked() && GeneratorRecord.hydrogenGenerator.isUnlocked();

    // Identify prestige layer types
    const isYellowPrestige = prestigeLayer.name === 'yellow';
    const isGreenPrestige = prestigeLayer.name === 'green';

    const currentGain = prestigeLayer.holdingGain;
    const bestPrestige = prestigeLayer.bestPrestige;

    // First prestige - always worth it if we can prestige
    if (bestPrestige.equals(new Num(0, 0))) {
      return true;
    }

    // GREEN PRESTIGE: Always prestige immediately (nothing breaks its barrier yet)
    if (isGreenPrestige) {
      return true;
    }

    // YELLOW PRESTIGE LOGIC
    if (isYellowPrestige) {
      // Get current yellow prestiges count
      const yellowPrestiges = HoldingRecord.yellowPrestiges.amount;

      // BELOW 1000 YELLOW PRESTIGES: Prestige immediately to increase gain
      if (yellowPrestiges.lt(new Num(ctx.YELLOW_PRESTIGES_IMMEDIATE_THRESHOLD, 0))) {
        return true;
      }

      // Get current star particles (yellow particles)
      const starParticles = HoldingRecord.yellowParticles.amount;

      // Safety timeout - only when no yellow fusion (5 minutes max)
      if (!hasReachedYellowFusion && timeSincePrestige > ctx.PRESTIGE_TIMEOUT_SECONDS * 1000) {
        return true;
      }

      // Determine target gain based on star particle count
      let targetGain: Num;
      if (starParticles.lt(ctx.STAR_PARTICLES_LOW_THRESHOLD)) {
        // BELOW threshold: Wait for best gain multiplier
        targetGain = bestPrestige.mul(new Num(0.5, 0));
      } else {
        // ABOVE threshold: Wait for bestPrestige^power
        targetGain = bestPrestige.pow(new Num(ctx.STAR_PARTICLES_HIGH_POWER, 0));
      }

      // If yellow fusion is maxed, we should prestige periodically
      if (
        HoldingRecord.yellowFusion.amount.greq(new Num(1, 999)) &&
        UpgradeRecord.fusionBoosterAcceleration.isMaxed()
      ) {
        if (
          !UpgradeRecord.breakYellowFusionLimitYellow.hasBought() &&
          this.timeOnMaxFusion > ctx.PRESTIGE_TIMEOUT_FUSION_SECONDS * 1000
        ) {
          this.timeOnMaxFusion = 0;
          return true;
        }
        if (
          UpgradeRecord.breakYellowFusionLimitYellow.hasBought() &&
          this.timeOnMaxFusion > ctx.PRESTIGE_TIMEOUT_FUSION_SECONDS * 10000
        ) {
          this.timeOnMaxFusion = 0;
          return true;
        }
        this.timeOnMaxFusion++;
      } else {
        this.timeOnMaxFusion = 0;
      }

      // Check if we've reached the target gain
      if (currentGain.greq(targetGain)) {
        // Track when we first reached the target
        const layerName = prestigeLayer.name;
        if (!ctx.prestigeBestReachedTimes.has(layerName)) {
          ctx.prestigeBestReachedTimes.set(layerName, ctx.totalElapsedTime);
        }

        // Wait N seconds after reaching target before prestiging
        const timeSinceReachedBest = ctx.totalElapsedTime - (ctx.prestigeBestReachedTimes.get(layerName) || ctx.totalElapsedTime);
        if (timeSinceReachedBest >= ctx.WAIT_AFTER_BEST_SECONDS * 1000) {
          return true;
        }
      } else {
        // Haven't reached target yet, reset the timer
        ctx.prestigeBestReachedTimes.delete(prestigeLayer.name);
      }

      return false;
    }

    // For other prestige layers (if any are added), use a simple best prestige check
    return currentGain.greq(bestPrestige);
  }
}
