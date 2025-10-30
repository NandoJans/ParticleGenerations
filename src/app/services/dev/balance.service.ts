import { Injectable } from '@angular/core';
import {TickService} from "../tick.service";
import {DataManagerService} from "../data-manager.service";
import {UpgradeRecord} from "../../classes/records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";
import {Num} from "../../num";
import {PrestigeLayersService} from "../prestige-layers.service";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {AutomatorRecord} from "../../classes/records/automators/automator-record";
import {Generator} from "../../classes/features/generator";
import {Upgrade} from "../../classes/features/upgrade";
import {generate} from "rxjs";
import {EnhancementRecord} from "../../classes/records/enhancement-record";
import {EnhancementService} from "../enhancement.service";
import {App} from "../../App";
import {PrestigeLayer} from "../../classes/features/prestiges/prestige-layer";
import {Holding} from "../../classes/features/holding";
import {ChallengeService} from "../interactables/challenge.service";
import {ChallengeRecord} from "../../classes/records/challenges/challenge-record";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private readonly PRESTIGE_TIMEOUT_MS = 60000; // 1 minute
  
  settings: {
    speed: number,
    maxTime: number,
    higherPrestige: Num
  } = {
    speed: 10,
    maxTime: 1000000,
    higherPrestige: new Num(1.01, 0),
  };

  loopTimeout: any;

  results: { [key: string]: {
    element: string,
    time: number,
    timeBetween: number,
    style: string,
  }} = {};

  totalElapsedTime: number = 0;
  elapsedSincePrevious: number = 0;
  newResultsThisLoop: boolean = false;

  constructor(
    private tickService: TickService,
    private dataManagerService: DataManagerService,
    private prestigeLayerService: PrestigeLayersService,
    private enhancementService: EnhancementService,
    private challengeService: ChallengeService,
  ) { }

  start(settings: { [key: string]: any } = {}) {
    Object.assign(this.settings, settings);

    // Stop any existing loops
    clearInterval(this.loopTimeout);

    // Stop the real game tick
    this.tickService.clearIntervals();
    this.dataManagerService.save();

    this.fullReset();
    // Ensure no lingering challenges from previous sessions
    ChallengeRecord.currentChallenges = {};

    App.gameSpeed = new Num(this.settings.speed, 0);
    App.offlineCalculation = true;

    this.loopTimeout = setInterval(this.loop.bind(this), 5);
  }

  loop() {
    this.newResultsThisLoop = false;
    this.tickService.gameTick(new Num(this.settings.speed, 0));
    this.totalElapsedTime += this.settings.speed * 5;
    this.elapsedSincePrevious += this.settings.speed * 5;

    // Run active challenges so their elements progress
    this.challengeService.tick();

    // Ensure automators are disabled during balance run
    AutomatorRecord.list.forEach(automator => {
      automator.disable();
    })

    // Auto start/complete challenges per prestige layer
    this.handleChallenges();

    // Auto-buy challenge-specific upgrades and generators
    Object.values(ChallengeRecord.currentChallenges).forEach(challenge => {
      challenge.getUpgrades().forEach(upg => {
        this.checkBuyable(upg);
        this.checkEnhancement(upg);
      });
      challenge.getGenerators().forEach(gen => {
        this.checkBuyable(gen);
        this.checkEnhancement(gen);
      });
    });

    [
      ...UpgradeRecord.list
    ].forEach(upgrade => {
      this.checkBuyable(upgrade);
      this.checkEnhancement(upgrade);
    });

    GeneratorRecord.list.forEach(generator => {
      this.checkBuyable(generator);
      this.checkEnhancement(generator);
      generator.getUpgrades().forEach(upgrade => {
        this.checkBuyable(upgrade);
        this.checkEnhancement(upgrade);
      })
    })

    this.prestigeLayerService.getList().forEach(prestigeLayer => {
      if (prestigeLayer.limitPhaseBelow && prestigeLayer.requirementsMet()) {
        prestigeLayer.prestige();

        if (!this.results[prestigeLayer.name]) {
          this.results[prestigeLayer.name] = {
            element: prestigeLayer.name,
            time: this.totalElapsedTime,
            timeBetween: this.elapsedSincePrevious,
            style: prestigeLayer.style,
          }
          this.newResultsThisLoop = true;
        }
      } else if (prestigeLayer.requirementsMet()) {
        const particleHolding = prestigeLayer.gainHoldings.find(holding => holding.basedOnRequiredHolding);
        if (
          particleHolding &&
          this.isWorthPrestiging(prestigeLayer, particleHolding.holding)
        ) {
          prestigeLayer.prestige();
        }
      }
    })

    // Reset elapsed time counter if we added any new results this loop
    if (this.newResultsThisLoop) {
      this.elapsedSincePrevious = 0;
    }

    if (this.elapsedSincePrevious > this.settings.maxTime) {
      this.done();
    }
  }

  private handleChallenges() {
    // Iterate through prestige layers to manage challenges per layer
    this.prestigeLayerService.getList().forEach(layer => {
      const layerKey = layer.name;

      if (this.challengeService.inChallenge(layerKey)) {
        // If the active challenge goal is reached, complete it
        if (this.challengeService.challengeGoalReached(layerKey)) {
          const active = this.challengeService.getChallenge(layerKey);
          if (active) {
            const resultKey = active.name + '_complete';
            if (!this.results[resultKey]) {
              this.results[resultKey] = {
                element: active.displayName + ' Completed',
                time: this.totalElapsedTime,
                timeBetween: this.elapsedSincePrevious,
                style: active.style,
              };
              this.newResultsThisLoop = true;
            }
          }
          this.challengeService.completeChallenge(layerKey);
        }
      } else {
        // Find the next eligible challenge for this layer
        const next = ChallengeRecord.list.find(ch =>
          ch.prestigeLayer === layerKey &&
          ch.requirementsMet() &&
          !ch.isCompleted()
        );
        if (next) {
          this.challengeService.startChallenge(next);
          const resultKey = next.name + '_start';
          if (!this.results[resultKey]) {
            this.results[resultKey] = {
              element: 'Start ' + next.displayName,
              time: this.totalElapsedTime,
              timeBetween: this.elapsedSincePrevious,
              style: next.style,
            };
            this.newResultsThisLoop = true;
          }
        }
      }
    });
  }

  private isWorthPrestiging(prestigeLayer: PrestigeLayer, holding: Holding): boolean {
    // First check the time inside the prestige layer, should not be higher than 1 minute
    if (Date.now() - prestigeLayer.prestigeStarted.getTime() > this.PRESTIGE_TIMEOUT_MS) return true;
    return prestigeLayer.holdingGain.greq(prestigeLayer.bestPrestige.pow(this.settings.higherPrestige))
  }

  private checkBuyable(buyable: Generator | Upgrade) {
    if (this.shouldSkipBuyable(buyable)) return;

    if (buyable.unlocked && buyable.isBuyable()) {
      buyable.buy();

      if (!this.results[buyable.name]) {
        this.results[buyable.name] = {
          element: buyable.displayName,
          time: this.totalElapsedTime,
          timeBetween: this.elapsedSincePrevious,
          style: buyable.style,
        }
        this.newResultsThisLoop = true;
      }
    }
  }

  private shouldSkipBuyable(buyable: Generator | Upgrade): boolean {
    // Skip if the yellow prestige amount is between 100 and 1000 to reach faster prestige rate
    if (
      HoldingRecord.yellowPrestiges.amount.greq(new Num(1, 2)) &&
      HoldingRecord.yellowPrestiges.amount.lt(new Num(1, 3))
    ) {
      if (
        !UpgradeRecord.noResetRedExtension.hasBought() &&
        buyable === UpgradeRecord.redGeneratorExtension &&
        buyable.amount.lt(new Num(5, 0))
      ) {
        return true;
      }
      if (
        buyable === UpgradeRecord.boosterAccelerationUpgrade &&
        buyable.amount.lt(new Num(3, 0))
      ) {
        return true;
      }
    }
    return false;
  }

  private checkEnhancement(enhancable: Upgrade|Generator) {
    if (!enhancable.canEnhance()) return;

    EnhancementRecord.list.forEach(enhancement => {
      if (
        enhancable.enhancement !== enhancement &&
        this.enhancementService.canEnhance(enhancement)
      ) {
        this.enhancementService.startEnhancing(enhancement);
        this.enhancementService.enhance(enhancable);
        this.results[enhancement.name+enhancable.name] = {
          element: `${enhancement.displayName} - ${enhancable.displayName}`,
          time: this.totalElapsedTime,
          timeBetween: this.elapsedSincePrevious,
          style: enhancement.style,
        }
        this.enhancementService.stopEnhancing();
        this.newResultsThisLoop = true;
      }
    })
  }

  done() {
    App.gameSpeed = new Num(1, -1);
    App.offlineCalculation = false;
    clearInterval(this.loopTimeout);
    this.dataManagerService.load();
    this.tickService.clearIntervals()
    this.tickService.startIntervals()
    this.elapsedSincePrevious = 0;
    this.totalElapsedTime = 0;
  }

  fullReset = () => {
    [
      ...UpgradeRecord.list,
      ...GeneratorRecord.list,
      ...HoldingRecord.getList(),
      ...AutomatorRecord.list,
      ...EnhancementRecord.list,
      ...PrestigeLayersService.list,
      ...ChallengeRecord.list,
    ].forEach(upgrade => {
      upgrade.reset();
    })
  }

  getResults() {
    return this.results;
  }
}
