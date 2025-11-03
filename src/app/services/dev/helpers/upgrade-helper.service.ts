import { Injectable } from '@angular/core';
import { DataManagerService } from '../../data-manager.service';
import { UpgradeRecord } from '../../../classes/records/upgrades/upgrade-record';

export interface UpgradeLevelsCtx {
  trackedUpgradeLevels: Map<string, Set<number>>;
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
}

@Injectable({ providedIn: 'root' })
export class UpgradeHelperService {
  constructor(private dataManagerService: DataManagerService) {}

  checkUpgradeLevels(ctx: UpgradeLevelsCtx) {
    // Track Red Generator Extension levels 1-5
    const extensionUpgrade = UpgradeRecord.redGeneratorExtension;
    const extensionLevel = extensionUpgrade.amount.toNumber();

    if (!ctx.trackedUpgradeLevels.has('redGeneratorExtension')) {
      ctx.trackedUpgradeLevels.set('redGeneratorExtension', new Set());
    }
    const trackedExtensionLevels = ctx.trackedUpgradeLevels.get('redGeneratorExtension')!;

    for (let level = 1; level <= 5; level++) {
      if (extensionLevel >= level && !trackedExtensionLevels.has(level)) {
        trackedExtensionLevels.add(level);

        const resultKey = `redGeneratorExtension_${level}`;
        if (!ctx.results[resultKey]) {
          ctx.results[resultKey] = {
            element: `Red Generator Extension ${level}`,
            time: ctx.totalElapsedTime,
            timeBetween: ctx.elapsedSincePrevious,
            style: extensionUpgrade.style,
          };
          ctx.markNew();

          // Save snapshot for upgrade level milestone
          try {
            this.dataManagerService.saveSim();
            const snapId = this.dataManagerService.saveSimSnapshot({
              type: 'upgrade-level',
              label: `Red Generator Extension ${level}`,
              elapsed: ctx.totalElapsedTime,
              extra: { upgrade: 'redGeneratorExtension', level }
            });
            ctx.results[resultKey].snapshotId = snapId;
          } catch {}
        }
      }
    }

    // Track Booster Acceleration (Red Accelerators) levels 1-5
    const redBoosterAccelUpgrade = UpgradeRecord.boosterAccelerationUpgrade;
    const redBoosterAccelLevel = redBoosterAccelUpgrade.amount.toNumber();

    if (!ctx.trackedUpgradeLevels.has('boosterAccelerationUpgrade')) {
      ctx.trackedUpgradeLevels.set('boosterAccelerationUpgrade', new Set());
    }
    const trackedRedBoosterAccelLevels = ctx.trackedUpgradeLevels.get('boosterAccelerationUpgrade')!;

    for (let level = 1; level <= 5; level++) {
      if (redBoosterAccelLevel >= level && !trackedRedBoosterAccelLevels.has(level)) {
        trackedRedBoosterAccelLevels.add(level);

        const resultKey = `boosterAccelerationUpgrade_${level}`;
        if (!ctx.results[resultKey]) {
          ctx.results[resultKey] = {
            element: `Booster Acceleration ${level}`,
            time: ctx.totalElapsedTime,
            timeBetween: ctx.elapsedSincePrevious,
            style: redBoosterAccelUpgrade.style,
          };
          ctx.markNew();

          try {
            this.dataManagerService.saveSim();
            const snapId = this.dataManagerService.saveSimSnapshot({
              type: 'upgrade-level',
              label: `Booster Acceleration ${level}`,
              elapsed: ctx.totalElapsedTime,
              extra: { upgrade: 'boosterAccelerationUpgrade', level }
            });
            ctx.results[resultKey].snapshotId = snapId;
          } catch {}
        }
      }
    }

    // Track Fusion Booster Acceleration levels 1-5
    const fusionBoosterAccelUpgrade = UpgradeRecord.fusionBoosterAcceleration;
    const fusionBoosterAccelLevel = fusionBoosterAccelUpgrade.amount.toNumber();

    if (!ctx.trackedUpgradeLevels.has('fusionBoosterAcceleration')) {
      ctx.trackedUpgradeLevels.set('fusionBoosterAcceleration', new Set());
    }
    const trackedFusionBoosterAccelLevels = ctx.trackedUpgradeLevels.get('fusionBoosterAcceleration')!;

    for (let level = 1; level <= 5; level++) {
      if (fusionBoosterAccelLevel >= level && !trackedFusionBoosterAccelLevels.has(level)) {
        trackedFusionBoosterAccelLevels.add(level);

        const resultKey = `fusionBoosterAcceleration_${level}`;
        if (!ctx.results[resultKey]) {
          ctx.results[resultKey] = {
            element: `Fusion Booster Acceleration ${level}`,
            time: ctx.totalElapsedTime,
            timeBetween: ctx.elapsedSincePrevious,
            style: fusionBoosterAccelUpgrade.style,
          };
          ctx.markNew();

          try {
            this.dataManagerService.saveSim();
            const snapId = this.dataManagerService.saveSimSnapshot({
              type: 'upgrade-level',
              label: `Fusion Booster Acceleration ${level}`,
              elapsed: ctx.totalElapsedTime,
              extra: { upgrade: 'fusionBoosterAcceleration', level }
            });
            ctx.results[resultKey].snapshotId = snapId;
          } catch {}
        }
      }
    }
  }
}
