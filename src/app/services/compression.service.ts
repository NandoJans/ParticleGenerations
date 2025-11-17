import {Injectable} from '@angular/core';
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {Num} from "../num";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {ResetHelper} from "../classes/helpers/reset-helper";
import {ResetKey} from "../classes/enums/reset-key";
import {Resetable} from "../classes/features/interfaces/resetable";
import {UpgradeRecord} from "../classes/records/upgrades/upgrade-record";
import {MultiplierRecord} from "../classes/records/multipliers/multiplier-record";
import {Require} from "../classes/features/interfaces/require";
import {StatsService} from "./stats.service";
import {AutomatorRecord} from "../classes/records/automators/automator-record";

@Injectable({
  providedIn: 'root'
})
export class CompressionService implements Resetable {
  private keysRequired: Num = new Num(1, 8);
  private requiredIncrease: Num = new Num(1, 1);
  private compressions: Num = new Num(0, 0);

  private percentage: number = 0;
  private compressing: boolean = false;
  private started?: number;
  private elapsed: number = 0;
  // New progress tracking fields
  private goal: number = 0; // total required progress to complete one compression
  private progress: number = 0; // accumulated progress towards the goal
  private lastUpdate?: number; // last tick timestamp for delta-time based progress

  private localStorageHelper: LocalStorageHelper = new LocalStorageHelper('star-key', 'compression');

  constructor() {
    this.load();
  }

  canCompressKeys() {
    return HoldingRecord.yellowKeys.amount.greq(this.getNeededKeys());
  }

  startCompressing() {
    if (this.canCompressKeys()) {
      this.compressing = true;
      this.started = Date.now();
      this.lastUpdate = this.started;
      // Initialize goal and progress based on current compression count
      this.goal = this.getGoalForCompressionCount(this.compressions.toNumber());
      this.progress = 0;
      this.percentage = 0;
      HoldingRecord.yellowKeys.amount = HoldingRecord.yellowKeys.amount.sub(this.getNeededKeys());
    }
  }

  isCompressing() {
    return this.compressing;
  }

  save() {
    this.localStorageHelper.save(this.compressing, 'compressing');
    this.localStorageHelper.save(this.started, 'started');
    this.localStorageHelper.save(this.lastUpdate, 'lastUpdate');
    this.localStorageHelper.save(this.goal, 'goal');
    this.localStorageHelper.save(this.progress, 'progress');
    this.localStorageHelper.saveNum(this.compressions, 'compressions');
  }

  load() {
    this.compressing = this.localStorageHelper.load(false, 'compressing');
    this.started = this.localStorageHelper.load(undefined, 'started');
    this.lastUpdate = this.localStorageHelper.load(undefined, 'lastUpdate');
    this.goal = this.localStorageHelper.load(0, 'goal');
    this.progress = this.localStorageHelper.load(0, 'progress');
    this.compressions = this.localStorageHelper.loadNum(new Num(0, 0), 'compressions');

    // Ensure sensible defaults
    if (!this.compressing) {
      this.goal = 0;
      this.progress = 0;
      this.lastUpdate = undefined;
    }

    ResetHelper.registerReset(ResetKey.YELLOW, this);
  }

  // Calculate how much total work is needed based on current compression count
  private getGoalForCompressionCount(count: number): number {
    // Keep the same scaling as previous time-based approach: goal = 1000 * 2^count
    return 1000 * Math.pow(2, count);
  }

  private yellowFusionCompressionEffect: Num = new Num(1, 0);

  // Calculate progress rate per millisecond based on yellow fusion and compression speed
  private getProgressPerMs(): number {
    let effect;
    if (UpgradeRecord.improveFusionCompressionGalaxyTree.hasBought()) {
      const power = HoldingRecord.yellowFusion.amount.pow(UpgradeRecord.improveFusionCompressionGalaxyTree.buffer);
      this.yellowFusionCompressionEffect = power;
      effect = power.toNumber();
    } else {
      const exponent = HoldingRecord.yellowFusion.amount.exponent;
      const log = Math.log10(Math.max(exponent, 1)); // avoid negative/NaN
      effect = Math.max(log, 0); // no negative contribution
      this.yellowFusionCompressionEffect = new Num(effect, 0);
    }

    const speed = Math.max(MultiplierRecord.starKeyCompressionSpeed.getNum().toNumber(), 1);

    // Prior formula had an extra *1000 in time; so per-ms rate = (log * speed) / 1000
    const rate = (effect * speed) / 1000;
    // Ensure a tiny positive rate to progress if both are zero (prevents freeze and div-by-zero)
    return rate > 0 ? rate : 0;
  }

  tick(speed: Num) {
    if (this.compressing && this.started) {
      const now = Date.now();
      // Initialize lastUpdate if missing (e.g., after load)
      if (!this.lastUpdate) this.lastUpdate = now;
      const dt = Math.max(now - this.lastUpdate, 0);
      this.lastUpdate = now;

      const rate = this.getProgressPerMs() * 10 * speed.toNumber();
      if (this.goal <= 0) {
        // In case loading mid-compression without a goal, recalc it
        this.goal = this.getGoalForCompressionCount(this.compressions.toNumber());
      }

      // Accumulate progress
      this.progress += dt * rate;
      // Clamp and compute percentage
      const ratio = this.goal > 0 ? Math.min(this.progress / this.goal, 1) : 0;
      this.percentage = ratio * 100;

      this.elapsed = now - this.started;

      if (this.progress >= this.goal && this.goal > 0) {
        this.complete();
      }
    } else if (
      AutomatorRecord.starKeyCompression.isActive() &&
      this.canCompressKeys()
    ) {
      this.startCompressing();
    }
    this.correctStarKeyAmount();
  }

  correctStarKeyAmount() {
    const upgradeCount = new Num(UpgradeRecord.starKeyUpgradeList.filter(upgrade => upgrade.hasBought()).length, 0);
    HoldingRecord.starKeys.amount = this.compressions.sub(upgradeCount);
  }

  complete() {
    // Update stats and record completion time
    const compressionTime = this.started ? (Date.now() - this.started) : 0;
    if (StatsService.get('compression', 'fastestTime') === null || compressionTime < StatsService.get('compression', 'fastestTime')) {
      StatsService.set('compression', 'fastestTime', compressionTime);
    }

    this.compressing = false;
    this.percentage = 0;
    this.started = undefined;
    this.lastUpdate = undefined;
    this.progress = 0;
    this.goal = 0;
    this.compressions = this.compressions.add(new Num(1, 0));
    HoldingRecord.starKeys.amount = HoldingRecord.starKeys.amount.add(new Num(1, 0));
  }

  getPercentage() {
    return this.percentage;
  }

  getNeededKeys() {
    return this.keysRequired.mul(this.requiredIncrease.pow(this.compressions));
  }

  getCompressionTime() {
    // Predicted total time based on goal and current rate
    const rate = this.getProgressPerMs();
    const count = this.compressions.toNumber();
    const totalGoal = this.getGoalForCompressionCount(count);

    if (rate <= 0) {
      return Infinity;
    }

    if (this.compressing) {
      const remaining = Math.max(totalGoal - this.progress, 0);
      return remaining / rate; // ms
    }

    // Not compressing yet; return full time if started anew
    return totalGoal / rate; // ms
  }

  getCompletionTime() {
    // Calculate the projected completion time based on remaining progress and current rate
    const rate = this.getProgressPerMs();
    if (!this.compressing || rate <= 0) {
      return '--:--:--';
    }

    const totalGoal = this.getGoalForCompressionCount(this.compressions.toNumber());
    const remaining = Math.max(totalGoal - this.progress, 0);
    const projectedTime = remaining / rate; // ms

    // Convert the projected time to hh:mm:ss format
    const hours = Math.floor(projectedTime / (1000 * 60 * 60));
    const minutes = Math.floor((projectedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((projectedTime % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  name: string = 'Compression';
  displayName: string = 'Compression';
  softResetId: ResetKey = ResetKey.YELLOW;
  softReset(): void {}
  resetId: ResetKey = ResetKey.YELLOW;

  reset() {
    this.compressing = false;
    this.started = undefined;
    this.lastUpdate = undefined;
    this.elapsed = 0;
    this.percentage = 0;
    this.progress = 0;
    this.goal = 0;
    this.compressions = new Num(0, 0);
  }

  compressionUnlocked(): boolean {
    return UpgradeRecord.unlockStarKeyCompression.hasBought();
  }

  getYellowFusionCompressionEffect() {
    return this.yellowFusionCompressionEffect;
  }
}
