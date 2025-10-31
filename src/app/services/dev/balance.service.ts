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
import {MilestoneRecord} from "../../classes/records/milestones/milestone-record";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private readonly PRESTIGE_TIMEOUT_SECONDS = 300; // 5 minutes (300 seconds) of simulated game time when no yellow fusion
  private readonly WAIT_AFTER_BEST_SECONDS = 5; // Wait 5 seconds after reaching best gain before prestiging
  private readonly YELLOW_PRESTIGES_IMMEDIATE_THRESHOLD = 1000; // Below 1000 yellow prestiges, prestige immediately
  private readonly STAR_PARTICLES_LOW_THRESHOLD = new Num(1, 10); // 1e10 star particles threshold
  private readonly STAR_PARTICLES_HIGH_MULTIPLIER = 1.05; // Above threshold, wait for bestPrestige^1.05
  
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
  prestigeStartTimes: Map<string, number> = new Map(); // Track when each prestige layer was last prestiged
  prestigeGainHistory: Map<string, Array<{time: number, gain: Num}>> = new Map(); // Track prestige gain over time
  prestigeBestReachedTimes: Map<string, number> = new Map(); // Track when best prestige gain was reached
  trackedMilestones: Set<string> = new Set(); // Track which milestones have been reached
  trackedUpgradeLevels: Map<string, Set<number>> = new Map(); // Track specific upgrade levels

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
    
    // Clear prestige timing tracker and history
    this.prestigeStartTimes.clear();
    this.prestigeGainHistory.clear();
    this.prestigeBestReachedTimes.clear();
    this.trackedMilestones.clear();
    this.trackedUpgradeLevels.clear();

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

    // Check for milestone unlocks
    this.checkMilestones();
    
    // Check for specific upgrade level milestones
    this.checkUpgradeLevels();

    this.prestigeLayerService.getList().forEach(prestigeLayer => {
      if (prestigeLayer.limitPhaseBelow && prestigeLayer.requirementsMet()) {
        prestigeLayer.prestige();
        this.prestigeStartTimes.set(prestigeLayer.name, this.totalElapsedTime);
        this.prestigeBestReachedTimes.delete(prestigeLayer.name); // Reset best reached timer

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
          this.prestigeStartTimes.set(prestigeLayer.name, this.totalElapsedTime);
          this.prestigeBestReachedTimes.delete(prestigeLayer.name); // Reset best reached timer
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

  /**
   * Check and track milestone unlocks
   */
  private checkMilestones(): void {
    MilestoneRecord.list.forEach(milestone => {
      if (milestone.unlocked && !this.trackedMilestones.has(milestone.name)) {
        this.trackedMilestones.add(milestone.name);
        
        if (!this.results[milestone.name]) {
          this.results[milestone.name] = {
            element: milestone.displayName,
            time: this.totalElapsedTime,
            timeBetween: this.elapsedSincePrevious,
            style: milestone.style,
          }
          this.newResultsThisLoop = true;
        }
      }
    });
  }

  /**
   * Check and track specific upgrade levels (Red Generator Extension 1-5, Booster Acceleration 1-5, Fusion Booster Acceleration 1-5)
   */
  private checkUpgradeLevels(): void {
    // Track Red Generator Extension levels 1-5
    const extensionUpgrade = UpgradeRecord.redGeneratorExtension;
    const extensionLevel = extensionUpgrade.amount.toNumber();
    
    if (!this.trackedUpgradeLevels.has('redGeneratorExtension')) {
      this.trackedUpgradeLevels.set('redGeneratorExtension', new Set());
    }
    const trackedExtensionLevels = this.trackedUpgradeLevels.get('redGeneratorExtension')!;
    
    for (let level = 1; level <= 5; level++) {
      if (extensionLevel >= level && !trackedExtensionLevels.has(level)) {
        trackedExtensionLevels.add(level);
        
        const resultKey = `redGeneratorExtension_${level}`;
        if (!this.results[resultKey]) {
          this.results[resultKey] = {
            element: `Red Generator Extension ${level}`,
            time: this.totalElapsedTime,
            timeBetween: this.elapsedSincePrevious,
            style: extensionUpgrade.style,
          }
          this.newResultsThisLoop = true;
        }
      }
    }
    
    // Track Booster Acceleration (Red Accelerators) levels 1-5
    const redBoosterAccelUpgrade = UpgradeRecord.boosterAccelerationUpgrade;
    const redBoosterAccelLevel = redBoosterAccelUpgrade.amount.toNumber();
    
    if (!this.trackedUpgradeLevels.has('boosterAccelerationUpgrade')) {
      this.trackedUpgradeLevels.set('boosterAccelerationUpgrade', new Set());
    }
    const trackedRedBoosterAccelLevels = this.trackedUpgradeLevels.get('boosterAccelerationUpgrade')!;
    
    for (let level = 1; level <= 5; level++) {
      if (redBoosterAccelLevel >= level && !trackedRedBoosterAccelLevels.has(level)) {
        trackedRedBoosterAccelLevels.add(level);
        
        const resultKey = `boosterAccelerationUpgrade_${level}`;
        if (!this.results[resultKey]) {
          this.results[resultKey] = {
            element: `Booster Acceleration ${level}`,
            time: this.totalElapsedTime,
            timeBetween: this.elapsedSincePrevious,
            style: redBoosterAccelUpgrade.style,
          }
          this.newResultsThisLoop = true;
        }
      }
    }
    
    // Track Fusion Booster Acceleration levels 1-5
    const fusionBoosterAccelUpgrade = UpgradeRecord.fusionBoosterAcceleration;
    const fusionBoosterAccelLevel = fusionBoosterAccelUpgrade.amount.toNumber();
    
    if (!this.trackedUpgradeLevels.has('fusionBoosterAcceleration')) {
      this.trackedUpgradeLevels.set('fusionBoosterAcceleration', new Set());
    }
    const trackedFusionBoosterAccelLevels = this.trackedUpgradeLevels.get('fusionBoosterAcceleration')!;
    
    for (let level = 1; level <= 5; level++) {
      if (fusionBoosterAccelLevel >= level && !trackedFusionBoosterAccelLevels.has(level)) {
        trackedFusionBoosterAccelLevels.add(level);
        
        const resultKey = `fusionBoosterAcceleration_${level}`;
        if (!this.results[resultKey]) {
          this.results[resultKey] = {
            element: `Fusion Booster Acceleration ${level}`,
            time: this.totalElapsedTime,
            timeBetween: this.elapsedSincePrevious,
            style: fusionBoosterAccelUpgrade.style,
          }
          this.newResultsThisLoop = true;
        }
      }
    }
  }

  /**
   * Track prestige gain for analysis
   */
  private trackPrestigeGain(prestigeLayer: PrestigeLayer): void {
    const layerName = prestigeLayer.name;
    if (!this.prestigeGainHistory.has(layerName)) {
      this.prestigeGainHistory.set(layerName, []);
    }
    
    const history = this.prestigeGainHistory.get(layerName)!;
    history.push({
      time: this.totalElapsedTime,
      gain: prestigeLayer.holdingGain.copy()
    });
    
    // Keep only recent history (last 10 entries)
    if (history.length > 10) {
      history.shift();
    }
  }
  
  
  private isWorthPrestiging(prestigeLayer: PrestigeLayer, holding: Holding): boolean {
    // Track current prestige gain for analysis
    this.trackPrestigeGain(prestigeLayer);
    
    // Get time since last prestige for this layer
    const lastPrestigeTime = this.prestigeStartTimes.get(prestigeLayer.name) || 0;
    const timeSincePrestige = this.totalElapsedTime - lastPrestigeTime;
    
    // Check if yellow fusion has been reached
    const hasReachedYellowFusion = HoldingRecord.yellowFusion.amount.greq(new Num(1, 0));
    
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
      if (yellowPrestiges.lt(new Num(this.YELLOW_PRESTIGES_IMMEDIATE_THRESHOLD, 0))) {
        return true;
      }
      
      // Get current star particles (yellow particles)
      const starParticles = HoldingRecord.yellowParticles.amount;
      
      // Safety timeout - only when no yellow fusion (5 minutes max)
      if (!hasReachedYellowFusion && timeSincePrestige > this.PRESTIGE_TIMEOUT_SECONDS * 1000) {
        return true;
      }
      
      // Determine target gain based on star particle count
      let targetGain: Num;
      if (starParticles.lt(this.STAR_PARTICLES_LOW_THRESHOLD)) {
        // BELOW 1e10 STAR PARTICLES: Wait for best gain
        targetGain = bestPrestige;
      } else {
        // ABOVE 1e10 STAR PARTICLES: Wait for best gain^1.05
        targetGain = bestPrestige.pow(new Num(this.STAR_PARTICLES_HIGH_MULTIPLIER, 0));
      }
      
      // Check if we've reached the target gain
      if (currentGain.greq(targetGain)) {
        // Track when we first reached the target
        const layerName = prestigeLayer.name;
        if (!this.prestigeBestReachedTimes.has(layerName)) {
          this.prestigeBestReachedTimes.set(layerName, this.totalElapsedTime);
        }
        
        // Wait 5 seconds after reaching target before prestiging
        const timeSinceReachedBest = this.totalElapsedTime - (this.prestigeBestReachedTimes.get(layerName) || this.totalElapsedTime);
        if (timeSinceReachedBest >= this.WAIT_AFTER_BEST_SECONDS * 1000) {
          return true;
        }
      } else {
        // Haven't reached target yet, reset the timer
        this.prestigeBestReachedTimes.delete(prestigeLayer.name);
      }
      
      return false;
    }
    
    // For other prestige layers (if any are added), use a simple best prestige check
    return currentGain.greq(bestPrestige);
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

  /**
   * Intelligent buying strategy: avoid buying upgrades that reset progress
   * when it would hurt yellow prestige gain rate (below 1000 yellow prestiges)
   */
  private shouldSkipBuyable(buyable: Generator | Upgrade): boolean {
    const yellowPrestiges = HoldingRecord.yellowPrestiges.amount;
    
    // Only apply intelligent buying when below 1000 yellow prestiges
    if (yellowPrestiges.lt(new Num(1, 3))) {
      // Check if this is a reset-causing upgrade
      const isRedExtension = buyable === UpgradeRecord.redGeneratorExtension;
      const isBoosterAccel = buyable === UpgradeRecord.boosterAccelerationUpgrade;
      
      if (isRedExtension || isBoosterAccel) {
        // If we have "No Reset Red Extensions" upgrade, extensions don't reset anymore
        const extensionWontReset = isRedExtension && UpgradeRecord.noResetRedExtension.hasBought();
        
        if (extensionWontReset) {
          return false; // Safe to buy, won't reset
        }
        
        // Check current yellow prestige gain rate
        const yellowLayer = this.prestigeLayerService.getList().find(layer => layer.name === 'yellow');
        if (!yellowLayer) return false;
        
        const currentGain = yellowLayer.holdingGain;
        const bestPrestige = yellowLayer.bestPrestige;
        
        // If we haven't reached yellow yet, don't skip
        if (bestPrestige.equals(new Num(0, 0))) {
          return false;
        }
        
        // Calculate how close we are to a good prestige
        const gainRatio = currentGain.div(bestPrestige);
        const isCloseToGoodPrestige = gainRatio.greq(new Num(1.5, 0)); // 1.5x or better
        
        // Strategy: Skip buying reset-causing upgrades if:
        // 1. We're below 1000 yellow prestiges AND
        // 2. We're close to a good prestige (1.5x+ current best) AND
        // 3. For Red Extension: below level 5 AND no-reset not bought
        // 4. For Booster Accel: below level 3
        
        if (isRedExtension) {
          const extensionLevel = buyable.amount.toNumber();
          // Skip if below level 5, close to good prestige, and no-reset not available
          if (extensionLevel < 5 && isCloseToGoodPrestige) {
            return true;
          }
        }
        
        if (isBoosterAccel) {
          const boosterLevel = buyable.amount.toNumber();
          // Skip if below level 3 and close to good prestige
          // Booster Accel is more important, so be less restrictive
          if (boosterLevel < 3 && isCloseToGoodPrestige && gainRatio.greq(new Num(2, 0))) {
            return true;
          }
        }
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
    this.prestigeStartTimes.clear();
    this.prestigeGainHistory.clear();
    this.prestigeBestReachedTimes.clear();
    this.prestigeBestReachedTimes.clear();
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
