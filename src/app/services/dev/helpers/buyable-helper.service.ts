import { Injectable } from '@angular/core';
import { DataManagerService } from '../../data-manager.service';
import { PrestigeLayersService } from '../../prestige-layers.service';
import { Generator } from '../../../classes/features/generator';
import { Upgrade } from '../../../classes/features/upgrade';
import { HoldingRecord } from '../../../classes/records/holdings/holding-record';
import { UpgradeRecord } from '../../../classes/records/upgrades/upgrade-record';
import { Num } from '../../../num';

export interface BuyableCtx {
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
}

@Injectable({ providedIn: 'root' })
export class BuyableHelperService {
  constructor(
    private dataManagerService: DataManagerService,
    private prestigeLayerService: PrestigeLayersService,
  ) {}

  checkBuyable(ctx: BuyableCtx, buyable: Generator | Upgrade) {
    if (this.shouldSkipBuyable(buyable)) return;

    if (
      (buyable as any).unlocked &&
      (buyable as any).isBuyable() &&
      !(buyable as any).disabled
    ) {
      (buyable as any).buy();

      let displayName, saveName;

      if ((buyable as any).amount.lt(new Num(0, 6))) {
        displayName = (buyable as any).displayName + ' - ' + (buyable as any).amount.toString()
        saveName = (buyable as any).name + '-' + (buyable as any).amount.toString()
      } else {
        displayName = (buyable as any).displayName
        saveName = (buyable as any).name
      }

      if (!ctx.results[saveName]) {
        ctx.results[saveName] = {
          element: displayName,
          time: ctx.totalElapsedTime,
          timeBetween: ctx.elapsedSincePrevious,
          style: (buyable as any).style,
        };
        ctx.markNew();

        try {
          this.dataManagerService.saveSim();
          const snapId = this.dataManagerService.saveSimSnapshot({
            type: (buyable as any).amount !== undefined ? 'upgrade' : 'generator',
            label: `${(buyable as any).displayName}`,
            elapsed: ctx.totalElapsedTime,
            extra: { key: (buyable as any).name }
          });
          ctx.results[(buyable as any).name].snapshotId = snapId;
        } catch {}
      }
    }
  }

  shouldSkipBuyable(buyable: Generator | Upgrade): boolean {
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

        if (isRedExtension) {
          const extensionLevel = (buyable as any).amount.toNumber();
          if (extensionLevel < 5 && isCloseToGoodPrestige) {
            return true;
          }
        }

        if (isBoosterAccel) {
          const boosterLevel = (buyable as any).amount.toNumber();

          if (HoldingRecord.yellowPrestiges.amount.greq(new Num(1, 1)) && boosterLevel >= 5) {
            return true;
          } else if (HoldingRecord.yellowPrestiges.amount.greq(new Num(1, 2)) && boosterLevel >= 3) {
            return true;
          } else if (HoldingRecord.yellowPrestiges.amount.greq(new Num(2, 2)) && boosterLevel >= 2) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
