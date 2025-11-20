import {Injectable} from '@angular/core';
import {NavigationsService} from "./navigations.service";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {GeneratorRecord} from "../classes/records/generators/generator-record";
import {UpgradeRecord} from "../classes/records/upgrades/upgrade-record";
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {AutomatorService} from "./interactables/automator.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {TimelineService} from "./timeline.service";
import {MilestoneRecord} from "../classes/records/milestones/milestone-record";
import {Num} from "../num";
import {ChallengeService} from "./interactables/challenge.service";
import {App} from "../App";
import {CompressionService} from "./compression.service";
import {ChargerRecord} from "../classes/records/charger/charger-record";
import {EnhancementRecord} from "../classes/records/enhancement-record";
import {EnhancementService} from "./enhancement.service";

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'lastSave');

  constructor(
    private holdingRecord: HoldingRecord,
    private generatorRecord: GeneratorRecord,
    private upgradeRecord: UpgradeRecord,
    private chargerRecord: ChargerRecord,
    private milestoneRecord: MilestoneRecord,
    private navigationsService: NavigationsService,
    private automatorService: AutomatorService,
    private prestigeLayersService: PrestigeLayersService,
    private challengeService: ChallengeService,
    private timelineService: TimelineService,
    private compressionService: CompressionService,
    private enhancementService: EnhancementService,
  ) {}

  // --- Simulation mode management ---
  enableSimulation(): void {
    LocalStorageHelper.setSimulationMode(true);
  }

  disableSimulation(): void {
    LocalStorageHelper.setSimulationMode(false);
  }

  // Save/load specifically while in simulation mode (just proxies to save/load)
  saveSim(): void {
    this.save();
  }

  loadSim(): void {
    this.load();
  }

  clearSim(): void {
    // Reset in-memory storage for simulation and persist
    LocalStorageHelper.setRawStorage({});
    this.save();
  }

  // --- Simulation snapshots ---
  saveSimSnapshot(meta: { id?: string, label?: string, type?: string, elapsed?: number, extra?: any } = {}): string {
    const id = meta.id || `snap_${Date.now()}_${Math.floor(Math.random()*100000)}`;
    const label = meta.label || 'Snapshot';
    const snapshot = {
      id,
      label,
      type: meta.type || 'milestone',
      elapsed: meta.elapsed ?? 0,
      date: new Date().toISOString(),
      storage: LocalStorageHelper.getRawStorage(),
      extra: meta.extra || {},
    };
    LocalStorageHelper.addSnapshot(snapshot);
    return id;
  }

  listSimSnapshots(): any[] {
    return LocalStorageHelper.loadSnapshots();
  }

  loadSimSnapshot(id: string): boolean {
    const snap = LocalStorageHelper.getSnapshot(id);
    if (!snap) return false;
    LocalStorageHelper.setSimulationMode(true);
    LocalStorageHelper.setRawStorage(snap.storage || {});
    return true;
  }

  deleteSimSnapshot(id: string): void {
    LocalStorageHelper.deleteSnapshot(id);
  }

  save() {
    // return;
    console.log('Saving data...');
    this.holdingRecord.save()
    this.generatorRecord.save()
    this.upgradeRecord.save()
    this.chargerRecord.save()
    this.navigationsService.save();
    this.automatorService.save();
    this.prestigeLayersService.save();
    this.timelineService.save();
    this.milestoneRecord.save();
    this.challengeService.save();
    this.compressionService.save();

    this.setLastSave();
    this.localStorageHelper.store();
  }

  load() {
    console.log('Loading data...');
    this.holdingRecord.load();
    this.generatorRecord.load();
    this.upgradeRecord.load();
    this.chargerRecord.load();
    this.navigationsService.load();
    this.automatorService.load();
    this.prestigeLayersService.load();
    this.timelineService.load();
    this.milestoneRecord.load();
    this.challengeService.load();
    this.compressionService.load();

    // Run milestones
    this.challengeService.applyCurrentChallengeNerfs();
    this.milestoneRecord.init();
  }

  init() {
    console.log('Initializing data...');
    this.holdingRecord.init();
    this.generatorRecord.init();
    this.upgradeRecord.init();
    this.chargerRecord.init();
    this.navigationsService.init();
    this.enhancementService.init();
    this.automatorService.init();
    this.prestigeLayersService.init();
    this.timelineService.init();
    this.challengeService.init();
  }

  setLastSave(): void {
    if (!App.offlineCalculation) {
      this.localStorageHelper.save(new Date().toISOString());
    }
  }
}
