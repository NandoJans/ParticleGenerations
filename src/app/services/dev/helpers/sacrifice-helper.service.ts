import { Injectable } from '@angular/core';
import { UpgradeRecord } from '../../../classes/records/upgrades/upgrade-record';
import { SacrificeUpgrade } from '../../../classes/features/upgrades/sacrifice-upgrade';

export interface SacrificeCtx {
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
}

@Injectable({ providedIn: 'root' })
export class SacrificeHelperService {
  constructor() {}

  /**
   * Handle sacrifice upgrade purchases to convert particles into dark energy
   * This should be called BEFORE entering dark galaxy challenge
   */
  handleSacrificeUpgrades(ctx: SacrificeCtx): void {
    // Purchase sacrifice upgrades in order of priority
    const sacrificeUpgrades = [
      UpgradeRecord.greenParticleSacrifice,  // Highest priority - converts green to dark energy
      UpgradeRecord.yellowParticleSacrifice, // Medium priority - converts yellow to dark energy
      UpgradeRecord.redParticleSacrifice,    // Lower priority - converts red to dark energy
    ];

    sacrificeUpgrades.forEach(upgrade => {
      if (upgrade && this.shouldBuySacrifice(upgrade)) {
        // Buy as many times as we can afford
        let boughtCount = 0;
        while (upgrade.requirementsMet() && boughtCount < 1000) { // Safety limit
          const bought = upgrade.buy();
          if (bought) {
            boughtCount++;
          } else {
            break;
          }
        }

        if (boughtCount > 0) {
          const resultKey = `sacrifice_${upgrade.name}_bought`;
          if (!ctx.results[resultKey]) {
            ctx.results[resultKey] = {
              element: `${upgrade.displayName} (x${boughtCount})`,
              time: ctx.totalElapsedTime,
              timeBetween: ctx.elapsedSincePrevious,
              style: upgrade.style,
            };
            ctx.markNew();
          } else {
            // Update count if already tracked
            ctx.results[resultKey].element = `${upgrade.displayName} (x${boughtCount})`;
          }
        }
      }
    });
  }

  /**
   * Check if we should buy a sacrifice upgrade
   */
  private shouldBuySacrifice(upgrade: SacrificeUpgrade): boolean {
    if (!upgrade || !upgrade.isUnlocked()) {
      return false;
    }

    // Always try to buy if requirements are met (cost affordable)
    return upgrade.requirementsMet();
  }
}
