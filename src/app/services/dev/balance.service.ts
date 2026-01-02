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
import {Challenge} from "../../classes/features/challenge";
import {LocalStorageHelper} from "../../classes/helpers/local-storage-helper";
import { ChallengeHelperService } from './helpers/challenge-helper.service';
import { MilestoneHelperService } from './helpers/milestone-helper.service';
import { UpgradeHelperService } from './helpers/upgrade-helper.service';
import { PrestigeHelperService } from './helpers/prestige-helper.service';
import { BuyableHelperService } from './helpers/buyable-helper.service';
import { EnhancementHelperService } from './helpers/enhancement-helper.service';
import { DarkStarChargerHelperService } from './helpers/dark-star-charger-helper.service';
import { GalaxyTreeUpgradeHelperService } from './helpers/galaxy-tree-upgrade-helper.service';
import { SacrificeHelperService } from './helpers/sacrifice-helper.service';
import { DevPhaseService } from './dev-phase.service';
import {TimelineService} from "../timeline.service";
import {CompressionService} from "../compression.service";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private readonly PRESTIGE_TIMEOUT_SECONDS = 3000; // 5 minutes (300 seconds) of simulated game time when no yellow fusion
  private readonly PRESTIGE_TIMEOUT_FUSION_SECONDS = 1; // Wait 5 seconds after reaching best gain before prestiging
  private readonly WAIT_AFTER_BEST_SECONDS = 1; // Wait 5 seconds after reaching best gain before prestiging
  private readonly YELLOW_PRESTIGES_IMMEDIATE_THRESHOLD = 1000; // Below 1000 yellow prestiges, prestige immediately
  private readonly STAR_PARTICLES_LOW_THRESHOLD = new Num(1, 10); // 1e10 star particles threshold
  private readonly STAR_PARTICLES_HIGH_POWER = 1.05; // Above threshold, wait for bestPrestige^1.05
  private readonly STAR_PARTICLES_HIGH_MULTIPLIER = 0.75; // Above threshold, wait for bestPrestige^1.05

  // Persist balance results across reloads (separate from sim save data)
  private readonly RESULTS_STORAGE_KEY = 'particleGenerations-balance-results';

  settings: {
    speed: number,
    maxTime: number,
    higherPrestige: Num
    initial: () => void,
    phaseId?: string,
  } = {
    speed: 10,
    maxTime: 1000000,
    higherPrestige: new Num(1.01, 0),
    phaseId: undefined,
    initial: () => {
      HoldingRecord.yellowParticles.amount = new Num(5, 28);
      HoldingRecord.yellowPrestiges.amount = new Num(1, 4);
      HoldingRecord.yellowKeys.amount = new Num(1, 6);
      ChallengeRecord.proximaCentauriStar.completed = new Num(2, 0);
      ChallengeRecord.lalandeStar.completed = new Num(2, 0);
      ChallengeRecord.sunStar.completed = new Num(2, 0);
      ChallengeRecord.siriusStar.completed = new Num(1, 0);
    }
  };

  loopTimeout: any;

  results: { [key: string]: {
    element: string,
    time: number,
    timeBetween: number,
    style: string,
    snapshotId?: string,
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
    private challengeHelper: ChallengeHelperService,
    private milestoneHelper: MilestoneHelperService,
    private upgradeHelper: UpgradeHelperService,
    private prestigeHelper: PrestigeHelperService,
    private buyableHelper: BuyableHelperService,
    private enhancementHelper: EnhancementHelperService,
    private darkStarChargerHelper: DarkStarChargerHelperService,
    private galaxyTreeUpgradeHelper: GalaxyTreeUpgradeHelperService,
    private sacrificeHelper: SacrificeHelperService,
    private devPhaseService: DevPhaseService,
    private timelineService: TimelineService,
    private compressionService: CompressionService,
  ) {
    // Load persisted results (if any) on service creation
    this.loadResults();
  }

  start(settings: { [key: string]: any } = {}) {
    Object.assign(this.settings, settings);

    // Clear previous run results when starting a new simulation
    this.clearResults();

    // Stop any existing loops
    clearInterval(this.loopTimeout);

    // Stop the real game tick and save real state
    this.tickService.clearIntervals();
    this.dataManagerService.save();

    // Switch to simulation storage and initialize a clean sim state
    this.dataManagerService.enableSimulation();

    this.dataManagerService.clearSim();
    this.fullReset();
    // Ensure no lingering challenges from previous sessions

    ChallengeRecord.currentChallenges = {};
    // Clear prestige timing tracker and history
    this.prestigeStartTimes.clear();
    this.prestigeGainHistory.clear();
    this.trackedMilestones.clear();
    this.trackedUpgradeLevels.clear();
    this.darkStarChargerHelper.reset();

    // Create an initial snapshot (baseline)
    this.dataManagerService.saveSim();
    this.dataManagerService.saveSimSnapshot({ type: 'start', label: 'Start', elapsed: 0 });

    App.gameSpeed = new Num(this.settings.speed, 0);
    App.offlineCalculation = true;

    // Load the selected phase or use default initial setup
    if (this.settings.phaseId) {
      const phase = this.devPhaseService.getPhases().find(p => p.id === this.settings.phaseId);
      if (phase) {
        phase.setup();
      } else {
        this.settings.initial();
      }
    } else {
      this.settings.initial();
    }
    
    this.loopTimeout = setInterval(this.loop.bind(this), 1);
  }

  loop() {
    this.newResultsThisLoop = false;
    this.tickService.gameTick(new Num(this.settings.speed, 0));
    this.totalElapsedTime += this.settings.speed / 2;
    this.elapsedSincePrevious += this.settings.speed / 2;

    // Run active challenges so their elements progress
    this.challengeService.tick();

    // Ensure automators are disabled during balance run
    AutomatorRecord.list.forEach(automator => {
      automator.deactivate();
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

    GeneratorRecord.redGenerators.map(gen => gen.buyMultiplierUpgrade).forEach(upgrade => {
      this.checkBuyable(upgrade);
      this.checkEnhancement(upgrade);
    });

    GeneratorRecord.list.forEach(generator => {
      this.checkBuyable(generator);
      this.checkEnhancement(generator);
      if (generator.type !== 'red-particle-generator') {
        generator.getUpgrades().forEach(upgrade => {
          this.checkBuyable(upgrade);
          this.checkEnhancement(upgrade);
        })
      }
    });

    GeneratorRecord.redGenerators.map(gen => gen.multiplierUpgrade).forEach(upgrade => {
      this.checkBuyable(upgrade);
      this.checkEnhancement(upgrade);
    });

    // Check for milestone unlocks
    this.checkMilestones();

    // Check for specific upgrade level milestones
    this.checkUpgradeLevels();

    // Handle sacrifice upgrades (convert particles → dark energy)
    this.handleSacrificeUpgrades();

    // Handle dark star charger strategy
    this.handleDarkStarChargers();

    // Handle galaxy tree upgrade purchases (uses dark energy)
    this.handleGalaxyTreeUpgrades();

    this.prestigeLayerService.getList().forEach(prestigeLayer => {
      if (prestigeLayer.limitPhaseBelow && prestigeLayer.requirementsMet()) {
        prestigeLayer.prestige();
        this.prestigeStartTimes.set(prestigeLayer.name, this.totalElapsedTime);

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
        }
      }
    })

    // Reset elapsed time counter if we added any new results this loop
    if (this.newResultsThisLoop) {
      this.elapsedSincePrevious = 0;
      // Persist results whenever new entries were added this loop
      this.saveResults();
    }

    if (this.elapsedSincePrevious > this.settings.maxTime) {
      this.done();
    }
  }

  private handleChallenges() {
    this.challengeHelper.handleChallenges({
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
      checkEnhancement: (x: any) => this.checkEnhancement(x),
    });
  }

  private shouldStartChallenge(challenge: Challenge) {
    switch (challenge) {
      case ChallengeRecord.lalandeStar:
        return GeneratorRecord.thirdYellowGenerator.hasBought();
      default:
        return true;
    }
  }

  private prepareChallengeStart(challenge: Challenge) {
    switch (challenge) {
      case ChallengeRecord.lalandeStar:
        this.enhancementService.respecEnhancement(EnhancementRecord.yellow)
        GeneratorRecord.redGenerators.forEach(gen => this.checkEnhancement(gen));
        break;
    }
  }

  private completeChallenge(challenge: Challenge) {
    switch (challenge) {
      case ChallengeRecord.lalandeStar:
        this.enhancementService.respecEnhancement(EnhancementRecord.yellow)
    }
  }

  /**
   * Check and track milestone unlocks
   */
  private checkMilestones(): void {
    this.milestoneHelper.checkMilestones({
      trackedMilestones: this.trackedMilestones,
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
    });
  }

  /**
   * Check and track specific upgrade levels (Red Generator Extension 1-5, Booster Acceleration 1-5, Fusion Booster Acceleration 1-5)
   */
  private checkUpgradeLevels(): void {
    this.upgradeHelper.checkUpgradeLevels({
      trackedUpgradeLevels: this.trackedUpgradeLevels,
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
    });
  }

  private isWorthPrestiging(prestigeLayer: PrestigeLayer, holding: Holding): boolean {
    return this.prestigeHelper.isWorthPrestiging({
      totalElapsedTime: this.totalElapsedTime,
      prestigeStartTimes: this.prestigeStartTimes,
      prestigeGainHistory: this.prestigeGainHistory,
      prestigeBestReachedTimes: this.prestigeBestReachedTimes,
      YELLOW_PRESTIGES_IMMEDIATE_THRESHOLD: this.YELLOW_PRESTIGES_IMMEDIATE_THRESHOLD,
      STAR_PARTICLES_LOW_THRESHOLD: this.STAR_PARTICLES_LOW_THRESHOLD,
      STAR_PARTICLES_HIGH_POWER: this.STAR_PARTICLES_HIGH_POWER,
      STAR_PARTICLES_HIGH_MULTIPLIER: this.STAR_PARTICLES_HIGH_MULTIPLIER,
      PRESTIGE_TIMEOUT_SECONDS: this.PRESTIGE_TIMEOUT_SECONDS,
      WAIT_AFTER_BEST_SECONDS: this.WAIT_AFTER_BEST_SECONDS,
      PRESTIGE_TIMEOUT_FUSION_SECONDS: this.PRESTIGE_TIMEOUT_FUSION_SECONDS,
    }, prestigeLayer, holding);
  }

  private checkBuyable(buyable: Generator | Upgrade) {
    this.buyableHelper.checkBuyable({
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
    }, buyable);
  }

  /**
   * Intelligent buying strategy: avoid buying upgrades that reset progress
   * when it would hurt yellow prestige gain rate (below 1000 yellow prestiges)
   */
  private shouldSkipBuyable(buyable: Generator | Upgrade): boolean {
    return this.buyableHelper.shouldSkipBuyable(buyable);
  }

  private checkEnhancement(enhancable: Upgrade|Generator) {
    this.enhancementHelper.checkEnhancement({
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
    }, enhancable);
  }

  /**
   * Handle dark star charger strategy during dark galaxy challenge
   */
  private handleDarkStarChargers(): void {
    this.darkStarChargerHelper.handleDarkStarChargers({
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
    });
  }

  /**
   * Handle sacrifice upgrade purchases to convert particles into dark energy
   */
  private handleSacrificeUpgrades(): void {
    this.sacrificeHelper.handleSacrificeUpgrades({
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
    });
  }

  /**
   * Handle galaxy tree upgrade purchases for dark galaxy progression
   */
  private handleGalaxyTreeUpgrades(): void {
    this.galaxyTreeUpgradeHelper.handleGalaxyTreeUpgrades({
      results: this.results,
      totalElapsedTime: this.totalElapsedTime,
      elapsedSincePrevious: this.elapsedSincePrevious,
      markNew: () => { this.newResultsThisLoop = true; },
    });
  }

  done() {
    App.gameSpeed = new Num(1, -1);
    App.offlineCalculation = false;
    clearInterval(this.loopTimeout);

    // Return to real game storage before loading the real save
    this.dataManagerService.disableSimulation();

    this.dataManagerService.load();
    this.tickService.clearIntervals()
    this.tickService.startIntervals()
    this.elapsedSincePrevious = 0;
    this.totalElapsedTime = 0;
    this.prestigeStartTimes.clear();
    this.prestigeGainHistory.clear();

    // Persist whatever results we have at the end of a run
    AutomatorRecord.list.forEach(automator => {
      automator.activate();
    })
    this.saveResults();
  }

  fullReset = () => {
    PrestigeLayersService.list.forEach(prestigeLayer => {
      this.challengeService.leaveChallenge(prestigeLayer.name);
    });

    [
      ...UpgradeRecord.list,
      ...GeneratorRecord.list,
      ...HoldingRecord.getList(),
      ...AutomatorRecord.list,
      ...EnhancementRecord.list,
      ...PrestigeLayersService.list,
      ...ChallengeRecord.list,
      ...MilestoneRecord.list,
      ...TimelineService.list,
    ].forEach(upgrade => {
      upgrade.reset();
    })
  }

  getResults() {
    return this.results;
  }

  // Get available phases for starting the simulation
  getPhases() {
    return this.devPhaseService.getPhases();
  }

  // List available simulation snapshots
  getSnapshots(): any[] {
    try {
      return this.dataManagerService.listSimSnapshots();
    } catch {
      return [];
    }
  }

  // Backtrack to a given snapshot id and resume simulation from there
  backtrackTo(id: string): boolean {
    try {
      // Pause current loop
      clearInterval(this.loopTimeout);

      // Ensure we are in simulation storage and load the snapshot storage
      const ok = this.dataManagerService.loadSimSnapshot(id);
      if (!ok) {
        return false;
      }

      // Load all services/entities from the snapshot storage
      this.dataManagerService.loadSim();

      // Reset trackers and timing based on snapshot metadata
      const snap = this.getSnapshots().find(s => s.id === id);
      this.totalElapsedTime = snap?.elapsed ?? 0;
      this.elapsedSincePrevious = 0;
      this.prestigeStartTimes.clear();
      this.prestigeGainHistory.clear();
      this.trackedMilestones.clear();
      this.trackedUpgradeLevels.clear();

      // Keep App in offline fast mode
      App.gameSpeed = new Num(this.settings.speed, 0);
      App.offlineCalculation = true;

      // Resume loop
      this.loopTimeout = setInterval(this.loop.bind(this), 1);
      return true;
    } catch {
      return false;
    }
  }

  // Start the real-time game from a given snapshot (loads it into real save and resumes live play)
  startRealFromSnapshot(id: string): boolean {
    try {
      // Stop simulation loop if running
      clearInterval(this.loopTimeout);

      // Fetch the snapshot (may be metadata-only if quota pruning happened)
      const snap = LocalStorageHelper.getSnapshot(id);
      if (!snap || !snap.storage) {
        return false; // Cannot start real game without a storage payload
      }

      // Switch to REAL storage and inject snapshot storage
      this.dataManagerService.disableSimulation();
      LocalStorageHelper.setSimulationMode(false);
      LocalStorageHelper.setRawStorage(snap.storage || {});

      // Persist to browser storage to make it durable
      try {
        const helper = new LocalStorageHelper('app', 'lastSave');
        helper.store();
      } catch {}

      // Load the real game state from injected storage and start live ticking
      this.dataManagerService.load();
      App.gameSpeed = new Num(1, -1);
      App.offlineCalculation = false;
      this.tickService.clearIntervals();
      this.tickService.startIntervals();

      // Reset internal tracking for simulation bookkeeping
      this.elapsedSincePrevious = 0;
      this.totalElapsedTime = 0;
      this.prestigeStartTimes.clear();
      this.prestigeGainHistory.clear();

      AutomatorRecord.list.forEach(automator => {
        automator.deactivate();
      })

      return true;
    } catch {
      return false;
    }
  }

  // Optional: save a manual snapshot with a label
  saveSnapshot(label: string): string | null {
    try {
      this.dataManagerService.saveSim();
      return this.dataManagerService.saveSimSnapshot({ type: 'manual', label, elapsed: this.totalElapsedTime });
    } catch {
      return null;
    }
  }

  // --- Persistent results helpers ---
  private loadResults(): void {
    try {
      const raw = localStorage[this.RESULTS_STORAGE_KEY];
      const parsed = raw ? JSON.parse(raw) : {};
      // Ensure object shape
      this.results = (parsed && typeof parsed === 'object') ? parsed : {};
    } catch {
      this.results = {};
    }
  }

  private saveResults(): void {
    try {
      localStorage[this.RESULTS_STORAGE_KEY] = JSON.stringify(this.results || {});
    } catch {
      // ignore storage errors
    }
  }

  private clearResults(): void {
    this.results = {};
    try {
      localStorage.removeItem(this.RESULTS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
