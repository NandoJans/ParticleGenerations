import {Num} from '../../num';

export type NuclearUpgradeTarget = 'greenGenerators' | 'darkStars' | 'darkChargers';

export interface NuclearUpgradeConfig {
  key: string;
  displayName: string;
  description: string;
  target: NuclearUpgradeTarget;
  baseCost: Num;
  costIncrease: Num;
  buffPerLevel: Num;
}

/**
 * Central balance configuration for the Nuclear Reactor page.
 * Costs, reset gain, passive generation, and every upgrade buff can be tuned here.
 */
export class NuclearConfig {
  static readonly unlockRequirement = new Num(1, 80);
  static readonly minimumDarkStars = new Num(1, 0);
  static readonly potentialDarkStarPower = new Num(5, -1);
  static readonly potentialTierWeight = new Num(1, -1);
  static readonly fissionPerPotentialPerSecond = new Num(1, -2);
  static readonly fissionBoosterPower = new Num(5, -2);

  static readonly upgrades: NuclearUpgradeConfig[] = [
    {
      key: 'nuclear-green-generators',
      displayName: 'Isotope Enrichment',
      description: 'Enrich reactor fuel to multiply all green generators.',
      target: 'greenGenerators',
      baseCost: new Num(1, 1),
      costIncrease: new Num(1, 1),
      buffPerLevel: new Num(3, 0),
    },
    {
      key: 'nuclear-dark-stars',
      displayName: 'Neutron Star Lattice',
      description: 'Bombard dark stars with neutrons to amplify their power.',
      target: 'darkStars',
      baseCost: new Num(1, 2),
      costIncrease: new Num(25, 0),
      buffPerLevel: new Num(1.15, 0),
    },
    {
      key: 'nuclear-dark-chargers',
      displayName: 'Supercritical Chargers',
      description: 'Run dark charger effects through a supercritical reactor core.',
      target: 'darkChargers',
      baseCost: new Num(1, 3),
      costIncrease: new Num(1, 2),
      buffPerLevel: new Num(1.25, 0),
    },
  ];
}
