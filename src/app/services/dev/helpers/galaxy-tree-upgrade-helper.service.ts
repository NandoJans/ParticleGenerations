import { Injectable } from '@angular/core';
import { UpgradeRecord } from '../../../classes/records/upgrades/upgrade-record';
import { GalaxyTreeUpgrade } from '../../../classes/features/upgrades/galaxy-tree-upgrade';
import { Num } from '../../../num';

export interface GalaxyTreeUpgradeCtx {
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
}

@Injectable({ providedIn: 'root' })
export class GalaxyTreeUpgradeHelperService {
  private readonly DARK_ENERGY_PRIORITY_UPGRADES = [
    'enhancedDarkEnergyGalaxyTree',
    'greaterDarkEnergyGalaxyTree',
    'superiorDarkEnergyGalaxyTree',
    'cosmicDarkEnergyGalaxyTree',
    'ultimateDarkEnergyGalaxyTree',
  ];

  constructor() {}

  /**
   * Handle galaxy tree upgrade strategy for dark galaxy goal
   */
  handleGalaxyTreeUpgrades(ctx: GalaxyTreeUpgradeCtx): void {
    // Try to buy dark energy upgrades in priority order
    this.buyDarkEnergyUpgrades(ctx);

    // Buy other beneficial galaxy tree upgrades
    this.buyOtherGalaxyTreeUpgrades(ctx);
  }

  /**
   * Buy dark energy galaxy tree upgrades for dark galaxy progression
   */
  private buyDarkEnergyUpgrades(ctx: GalaxyTreeUpgradeCtx): void {
    const darkEnergyUpgrades = [
      UpgradeRecord.enhancedDarkEnergyGalaxyTree,
      UpgradeRecord.greaterDarkEnergyGalaxyTree,
      UpgradeRecord.superiorDarkEnergyGalaxyTree,
      UpgradeRecord.cosmicDarkEnergyGalaxyTree,
      UpgradeRecord.ultimateDarkEnergyGalaxyTree,
    ];

    darkEnergyUpgrades.forEach(upgrade => {
      if (this.shouldBuyUpgrade(upgrade)) {
        const bought = upgrade.buy();
        if (bought) {
          const resultKey = `galaxy_tree_${upgrade.name}_bought`;
          if (!ctx.results[resultKey]) {
            ctx.results[resultKey] = {
              element: `${upgrade.displayName} (Galaxy Tree)`,
              time: ctx.totalElapsedTime,
              timeBetween: ctx.elapsedSincePrevious,
              style: upgrade.style,
            };
            ctx.markNew();
          }
        }
      }
    });
  }

  /**
   * Buy other galaxy tree upgrades that benefit dark galaxy progression
   */
  private buyOtherGalaxyTreeUpgrades(ctx: GalaxyTreeUpgradeCtx): void {
    // Buy upgrades that help with overall progression
    const beneficialUpgrades = [
      UpgradeRecord.betterYellowKeyGainGalaxyTree,
      UpgradeRecord.moreYellowParticlesGalaxyTree,
      UpgradeRecord.betterYellowGeneratorsGalaxyTree,
      UpgradeRecord.betterYellowMultipliersGalaxyTree,
      UpgradeRecord.betterRedBoosterGalaxyTree,
      UpgradeRecord.strongerRedExtensionGalaxyTree,
      UpgradeRecord.strongerYellowPowerGalaxyTree,
      UpgradeRecord.strongerHydrogenGalaxyTree,
      UpgradeRecord.fasterHydrogenGenerationGalaxyTree,
      UpgradeRecord.betterRedAcceleratorEffectGalaxyTree,
      UpgradeRecord.betterRedAcceleratorGenerationGalaxyTree,
    ];

    beneficialUpgrades.forEach(upgrade => {
      if (upgrade && this.shouldBuyUpgrade(upgrade)) {
        const bought = upgrade.buy();
        if (bought) {
          const resultKey = `galaxy_tree_${upgrade.name}_bought`;
          if (!ctx.results[resultKey]) {
            ctx.results[resultKey] = {
              element: `${upgrade.displayName} (Galaxy Tree)`,
              time: ctx.totalElapsedTime,
              timeBetween: ctx.elapsedSincePrevious,
              style: upgrade.style,
            };
            ctx.markNew();
          }
        }
      }
    });
  }

  /**
   * Check if we should buy a galaxy tree upgrade
   */
  private shouldBuyUpgrade(upgrade: GalaxyTreeUpgrade): boolean {
    if (!upgrade || !upgrade.isUnlocked()) {
      return false;
    }

    if (upgrade.hasBought()) {
      return false;
    }

    // Check if requirements are met (parents bought, cost affordable)
    return upgrade.requirementsMet();
  }
}
