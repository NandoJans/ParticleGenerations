import { Injectable } from '@angular/core';
import { ChallengeRecord } from '../../../classes/records/challenges/challenge-record';
import { PrestigeLayersService } from '../../prestige-layers.service';
import { ChallengeService } from '../../interactables/challenge.service';
import { EnhancementService } from '../../enhancement.service';
import { Challenge } from '../../../classes/features/challenge';
import { GeneratorRecord } from '../../../classes/records/generators/generator-record';
import { EnhancementRecord } from '../../../classes/records/enhancement-record';
import { HoldingRecord } from '../../../classes/records/holdings/holding-record';
import { Num } from '../../../num';

export interface ChallengeCtx {
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
  checkEnhancement: (x: any) => void;
}

@Injectable({ providedIn: 'root' })
export class ChallengeHelperService {
  // Track dark galaxy challenge cycles for proper game loop
  private darkGalaxyStartTime: number = 0;
  private darkGalaxyStartDarkStars: Num = new Num(0, 0);
  private darkGalaxyCycleCount: number = 0;
  private readonly DARK_GALAXY_MIN_DURATION = 1800; // Stay in dark galaxy for at least 30 minutes
  private readonly DARK_GALAXY_MIN_STARS_GAIN = new Num(2, 0); // Gain at least 2 dark stars per cycle
  private readonly DARK_GALAXY_OUTSIDE_DURATION = 600; // Spend 10 minutes outside between cycles

  constructor(
    private prestigeLayerService: PrestigeLayersService,
    private challengeService: ChallengeService,
    private enhancementService: EnhancementService,
  ) {}

  handleChallenges(ctx: ChallengeCtx) {
    // Iterate through prestige layers to manage challenges per layer
    this.prestigeLayerService.getList().forEach(layer => {
      const layerKey = layer.name;

      if (this.challengeService.inChallenge(layerKey)) {
        const active = this.challengeService.getChallenge(layerKey);
        
        // Special handling for dark galaxy challenge
        if (active === ChallengeRecord.darkGalaxy) {
          // Check if we should exit dark galaxy to buy upgrades and progress
          if (this.shouldExitDarkGalaxy(ctx)) {
            const darkStarsGained = HoldingRecord.darkStarHolding.amount.sub(this.darkGalaxyStartDarkStars);
            const resultKey = `dark_galaxy_exit_${this.darkGalaxyCycleCount}`;
            if (!ctx.results[resultKey]) {
              ctx.results[resultKey] = {
                element: `Exit Dark Galaxy (Cycle ${this.darkGalaxyCycleCount}, +${darkStarsGained.toString(0)} Dark Stars)`,
                time: ctx.totalElapsedTime,
                timeBetween: ctx.elapsedSincePrevious,
                style: active.style,
              } as any;
              ctx.markNew();
            }
            this.challengeService.leaveChallenge(layerKey);
            this.darkGalaxyCycleCount++;
            return;
          }
        } else {
          // For other challenges, complete when goal is reached
          if (this.challengeService.challengeGoalReached(layerKey)) {
            if (active) {
              const resultKey = active.name + '_complete';
              if (!ctx.results[resultKey]) {
                ctx.results[resultKey] = {
                  element: active.displayName + ' Completed',
                  time: ctx.totalElapsedTime,
                  timeBetween: ctx.elapsedSincePrevious,
                  style: active.style,
                } as any;
                ctx.markNew();
              }
            }
            this.challengeService.completeChallenge(layerKey);
            if (active) {
              this.completeChallenge(active)
            }
          }
        }
      } else {
        // Find the next eligible challenge for this layer
        const next = ChallengeRecord.list.find(ch =>
          ch.prestigeLayer === layerKey &&
          ch.requirementsMet() &&
          !ch.isCompleted()
        );
        if (next && this.shouldStartChallenge(next, ctx)) {
          this.prepareChallengeStart(next, ctx);
          this.challengeService.startChallenge(next);
          
          // Track dark galaxy start for cycling logic
          if (next === ChallengeRecord.darkGalaxy) {
            this.darkGalaxyStartTime = ctx.totalElapsedTime;
            this.darkGalaxyStartDarkStars = HoldingRecord.darkStarHolding.amount.copy();
          }
          
          const resultKey = next.name + '_start';
          if (!ctx.results[resultKey]) {
            ctx.results[resultKey] = {
              element: 'Start ' + next.displayName,
              time: ctx.totalElapsedTime,
              timeBetween: ctx.elapsedSincePrevious,
              style: next.style,
            } as any;
            ctx.markNew();
          }
        }
      }
    });
  }

  /**
   * Determine if we should exit the dark galaxy challenge to buy upgrades and progress
   */
  private shouldExitDarkGalaxy(ctx: ChallengeCtx): boolean {
    const timeInDarkGalaxy = ctx.totalElapsedTime - this.darkGalaxyStartTime;
    const darkStarsGained = HoldingRecord.darkStarHolding.amount.sub(this.darkGalaxyStartDarkStars);
    
    // Exit if we've been in dark galaxy long enough AND gained enough stars
    if (timeInDarkGalaxy >= this.DARK_GALAXY_MIN_DURATION && 
        darkStarsGained.greq(this.DARK_GALAXY_MIN_STARS_GAIN)) {
      return true;
    }
    
    // Or if we've been in for a very long time (2x min duration), exit regardless
    if (timeInDarkGalaxy >= this.DARK_GALAXY_MIN_DURATION * 2) {
      return true;
    }
    
    return false;
  }

  private shouldStartChallenge(challenge: Challenge, ctx: ChallengeCtx) {
    switch (challenge) {
      case ChallengeRecord.darkGalaxy:
        // Only start dark galaxy if:
        // 1. Green particles requirement is met
        // 2. We're not in a "cooldown" period after exiting
        const timeSinceLastStart = ctx.totalElapsedTime - this.darkGalaxyStartTime;
        const canReenter = this.darkGalaxyCycleCount === 0 || timeSinceLastStart >= this.DARK_GALAXY_OUTSIDE_DURATION;
        return HoldingRecord.greenParticles.amount.greq(new Num(1, 2)) && canReenter;
      case ChallengeRecord.lalandeStar:
        return GeneratorRecord.thirdYellowGenerator.hasBought();
      default:
        return true;
    }
  }

  private prepareChallengeStart(challenge: Challenge, ctx: ChallengeCtx) {
    switch (challenge) {
      case ChallengeRecord.lalandeStar:
        this.enhancementService.respecEnhancement(EnhancementRecord.yellow)
        GeneratorRecord.redGenerators.forEach(gen => ctx.checkEnhancement(gen));
        break;
    }
  }

  private completeChallenge(challenge: Challenge) {
    switch (challenge) {
      case ChallengeRecord.lalandeStar:
        this.enhancementService.respecEnhancement(EnhancementRecord.yellow)
    }
  }
}
