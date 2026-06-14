import {Num} from '../../num';

export type NuclearUpgradeTarget =
  | 'greenGenerators'
  | 'darkStars'
  | 'darkChargers'
  | 'nuclearFissionGain'
  | 'nuclearPotentialGain'
  | 'unlockGreenGenerator4'
  | 'unlockGreenGenerator5'
  | 'reduceStarKeyCompressionRequirement';

export interface NuclearUpgradeConfig {
  key: string;
  displayName: string;
  description: string;
  target: NuclearUpgradeTarget;
  baseCost: Num;
  costIncrease: Num;
  buffPerLevel: Num;
  limit?: Num;
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
  static readonly fissionBoosterPower = new Num(2.5, -1);

  static readonly upgrades: NuclearUpgradeConfig[] = [
    {
      key: 'nuclear-fission-gain',
      displayName: 'Chain Reaction',
      description: 'Sustain a stronger chain reaction to multiply Nuclear Fission generation.',
      target: 'nuclearFissionGain',
      baseCost: new Num(1, 1),
      costIncrease: new Num(1, 1),
      buffPerLevel: new Num(2, 0),
    },
    {
      key: 'nuclear-green-generators',
      displayName: 'Isotope Enrichment',
      description: 'Enrich reactor fuel to multiply all green generators.',
      target: 'greenGenerators',
      baseCost: new Num(2.5, 1),
      costIncrease: new Num(1, 1),
      buffPerLevel: new Num(3, 0),
    },
    {
      key: 'nuclear-potential-gain',
      displayName: 'Reactor Yield',
      description: 'Improve reactor conversion to multiply Nuclear Potential gained from a SCRAM.',
      target: 'nuclearPotentialGain',
      baseCost: new Num(1, 2),
      costIncrease: new Num(1, 1),
      buffPerLevel: new Num(1.5, 0),
    },
    {
      key: 'nuclear-dark-stars',
      displayName: 'Neutron Star Lattice',
      description: 'Bombard dark stars with neutrons to amplify their power.',
      target: 'darkStars',
      baseCost: new Num(2.5, 2),
      costIncrease: new Num(25, 0),
      buffPerLevel: new Num(1.15, 0),
    },
    {
      key: 'nuclear-dark-chargers',
      displayName: 'Supercritical Chargers',
      description: 'Run dark charger effects through a supercritical reactor core.',
      target: 'darkChargers',
      baseCost: new Num(2.5, 3),
      costIncrease: new Num(1, 2),
      buffPerLevel: new Num(1.25, 0),
    },
    {
      key: 'nuclear-star-key-compression',
      displayName: 'Compact Stellar Press',
      description: 'Star-Key Compression can be started with 1,000 Yellow Keys.',
      target: 'reduceStarKeyCompressionRequirement',
      baseCost: new Num(1, 5),
      costIncrease: Num.ONE,
      buffPerLevel: Num.ONE,
      limit: Num.ONE,
    },
    {
      key: 'nuclear-unlock-green-generator-4',
      displayName: 'Fourth-Stage Reactor',
      description: 'Unlocks Green Generator 4.',
      target: 'unlockGreenGenerator4',
      baseCost: new Num(1, 12),
      costIncrease: Num.ONE,
      buffPerLevel: Num.ONE,
      limit: Num.ONE,
    },
    {
      key: 'nuclear-unlock-green-generator-5',
      displayName: 'Fifth-Stage Reactor',
      description: 'Unlocks Green Generator 5.',
      target: 'unlockGreenGenerator5',
      baseCost: new Num(1, 20),
      costIncrease: Num.ONE,
      buffPerLevel: Num.ONE,
      limit: Num.ONE,
    },
  ];
}
