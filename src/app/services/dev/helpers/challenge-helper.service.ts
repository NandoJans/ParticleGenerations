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
        // If the active challenge goal is reached, complete it
        if (this.challengeService.challengeGoalReached(layerKey)) {
          const active = this.challengeService.getChallenge(layerKey);
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
      } else {
        // Find the next eligible challenge for this layer
        const next = ChallengeRecord.list.find(ch =>
          ch.prestigeLayer === layerKey &&
          ch.requirementsMet() &&
          !ch.isCompleted()
        );
        if (next && this.shouldStartChallenge(next)) {
          this.prepareChallengeStart(next, ctx);
          this.challengeService.startChallenge(next);
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

  private shouldStartChallenge(challenge: Challenge) {
    switch (challenge) {
      case ChallengeRecord.darkGalaxy:
        // Auto-start dark galaxy when green particles requirement is met
        return HoldingRecord.greenParticles.amount.greq(new Num(1, 2));
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
