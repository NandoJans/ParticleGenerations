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
import {TimeHelper} from "../classes/helpers/time-helper";
import {App} from "../App";

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

  // Rate tracking for predictive compression time
  private rateHistory: number[] = []; // Track last N rates to predict future rate
  private readonly MAX_RATE_HISTORY = 20; // Track last 20 ticks

  private avgRate: number = 0; // smoothed effective rate (progress/ms)
  private currentRate: number = 0;    // smoothed progress/ms
  private avgAccel: number = 0;       // smoothed accel in (progress/ms^2)
  private readonly RATE_ALPHA = 0.2;  // EMA smoothing factor for rate
  private readonly ACCEL_ALPHA = 0.2; // EMA smoothing factor for accel

  private displayEtaMs: number | undefined = undefined;
  private readonly SMOOTH = 0.02; // EMA smoothing factor for accel

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
      this.rateHistory = []; // Clear rate history when starting new compression
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

  private goalScalingStart: Num = new Num(4, 1);
  private goalScaling: Num = new Num(2, 0);

  // Calculate how much total work is needed based on current compression count
  private getGoalForCompressionCount(count: number): number {
    // Keep the same scaling as previous time-based approach: goal = 1000 * 2^count
    // After 40 compressions, the goal increases even stronger
    const countNum = new Num(count, 0);
    if (countNum.greq(this.goalScalingStart)) {
      let diff = countNum.sub(this.goalScalingStart);
      let goal = new Num(1, 3).mul(MultiplierRecord.starKeyCompressionTimeIncrease.num.pow(this.goalScalingStart));
      goal = goal.mul(new Num(1, 3).mul(MultiplierRecord.starKeyCompressionTimeIncrease.num.pow(diff.mul(this.goalScaling))));
      return goal.toNumber();
    } else {
      return new Num(1, 3).mul(MultiplierRecord.starKeyCompressionTimeIncrease.num.pow(countNum)).toNumber();
    }
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
    if (!UpgradeRecord.unlockStarKeyCompression.hasBought()) return;

    if (this.compressing && this.started) {
      const now = Date.now();
      if (!this.lastUpdate) this.lastUpdate = now;

      let dt: number;
      if (App.offlineCalculation) {
        dt = 50 * speed.toNumber();
      } else {
        dt = Math.max(now - this.lastUpdate, 0);
      }
      this.lastUpdate = now;

      // THIS is your "theoretical" rate
      const rate = this.getProgressPerMs() * 10 * speed.toNumber();

      if (this.goal <= 0) {
        this.goal = this.getGoalForCompressionCount(this.compressions.toNumber());
      }

      // Measure progress before/after for effective rate
      const prevProgress = this.progress;

      // Accumulate progress
      this.progress += dt * rate;

      const dProgress = this.progress - prevProgress;
      const instRate = dt > 0 ? dProgress / dt : 0; // effective progress/ms

      this.updateRateAndAccel(instRate, dt);
      this.updateDisplayEta(dt);
      // Store in history / EMA (see below)
      this.updateRateStats(instRate);

      // Clamp & percentage
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

  private updateRateAndAccel(instRate: number, dt: number) {
    if (instRate <= 0 || dt <= 0) return;

    if (this.currentRate === 0) {
      // First measurement
      this.currentRate = instRate;
      this.avgAccel = 0;
    } else {
      // Compute instantaneous accel based on change in rate
      const instAccel = (instRate - this.currentRate) / dt; // progress/ms^2

      // Smooth rate and accel with exponential moving averages
      this.currentRate =
        this.currentRate * (1 - this.RATE_ALPHA) + instRate * this.RATE_ALPHA;

      this.avgAccel =
        this.avgAccel * (1 - this.ACCEL_ALPHA) + instAccel * this.ACCEL_ALPHA;
    }

    // Optional: still keep history if you want
    this.rateHistory.push(instRate);
    if (this.rateHistory.length > this.MAX_RATE_HISTORY) {
      this.rateHistory.shift();
    }
  }

  private updateRateStats(instRate: number) {
    if (instRate <= 0) return;

    // Optional: still keep raw history if you like
    this.rateHistory.push(instRate);
    if (this.rateHistory.length > this.MAX_RATE_HISTORY) {
      this.rateHistory.shift();
    }

    // Exponential moving average of effective rate
    if (this.avgRate === 0) {
      this.avgRate = instRate;
    } else {
      this.avgRate = this.avgRate * (1 - this.RATE_ALPHA) + instRate * this.RATE_ALPHA;
    }
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
    this.rateHistory = [];
    this.currentRate = 0;
    this.avgAccel = 0;
    this.compressions = this.compressions.add(new Num(1, 0));
    HoldingRecord.starKeys.amount = HoldingRecord.starKeys.amount.add(new Num(1, 0));
  }

  getPercentage() {
    return this.percentage;
  }

  yellowKeyScalingStart: Num = new Num(4, 1);
  yellowKeyScaling: Num = new Num(1, 1);

  getNeededKeys() {
    // After 35 compressions, the yellow key requirement increases even stronger by applying the yellow key scaling
    if (this.compressions.greq(this.yellowKeyScalingStart)) {
      let diff = this.compressions.sub(this.yellowKeyScalingStart);
      return this.keysRequired.mul(this.yellowKeyScalingStart.pow(this.requiredIncrease)).mul(this.yellowKeyScalingStart.pow(diff.mul(this.yellowKeyScaling)));
    } else {
      return this.keysRequired.mul(this.requiredIncrease.pow(this.compressions));
    }
  }

  getCompressionTime(): number {
    const totalGoal = this.getGoalForCompressionCount(this.compressions.toNumber());
    const remaining = Math.max(totalGoal - this.progress, 0);
    if (remaining <= 0) return 0;

    let r = this.currentRate;
    let a = this.avgAccel;

    // Fallback: if we don't have a good measurement yet, use theoretical
    if (r <= 0) {
      r = this.getProgressPerMs() * 10;
    }
    if (r <= 0) return Infinity;

    // If accel is tiny or negative, assume roughly constant rate
    if (!isFinite(a) || Math.abs(a) < 1e-9) {
      return remaining / r; // ms
    }

    // Solve 0.5 a t^2 + r t - remaining = 0
    const A = 0.5 * a;
    const B = r;
    const C = -remaining;

    const disc = B * B - 4 * A * C;
    if (disc < 0) {
      // Numerical weirdness, fallback
      return remaining / r;
    }

    const sqrtDisc = Math.sqrt(disc);
    const t1 = (-B + sqrtDisc) / (2 * A);
    const t2 = (-B - sqrtDisc) / (2 * A);

    const candidates = [t1, t2].filter(t => t > 0 && isFinite(t));
    if (candidates.length === 0) {
      return remaining / r;
    }

    // Pick the smallest positive root
    const t = Math.min(...candidates);
    return t; // ms
  }

  private updateDisplayEta(dt: number) {
    const raw = this.getCompressionTime();
    if (!isFinite(raw)) return;

    if (this.displayEtaMs === undefined) {
      this.displayEtaMs = raw;
      return;
    }

    // MAIN SMOOTHING FACTOR — change this to tune stability
    const SMOOTH = 0.03;   // lower = smoother (0.01–0.05 is typical)

    // Smooth toward the newly computed raw ETA
    this.displayEtaMs =
      this.displayEtaMs * (1 - SMOOTH) + raw * SMOOTH;

    // Make it count down in real-time
    this.displayEtaMs = Math.max(this.displayEtaMs - dt, 0);
  }


  getCompletionTime() {
    if (!this.compressing) return '--:--:--';
    if (this.displayEtaMs === undefined) return '--:--:--';

    // If the display ETA is larger then a year, show only >1y'
    if (this.displayEtaMs > 31536000000) return '>1y';

    return TimeHelper.formatDuration(this.displayEtaMs, 'yy dd hh:mm:ss');
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
    this.rateHistory = [];
    this.currentRate = 0;
    this.avgAccel = 0;
    this.compressions = new Num(0, 0);
  }

  compressionUnlocked(): boolean {
    return UpgradeRecord.unlockStarKeyCompression.hasBought();
  }

  getYellowFusionCompressionEffect() {
    return this.yellowFusionCompressionEffect;
  }

  private totalTimeSkipped: number = 0;

  instantComplete() {
    if (App.isDev()) {
      this.totalTimeSkipped += this.getCompressionTime();
      this.complete();
    }
  }

  getTotalSkipped() {
    return TimeHelper.formatDuration(this.totalTimeSkipped, 'yy dd hh:mm:ss');
  }
}
