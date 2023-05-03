import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {NewAction} from "../../../../NewAction";

export const limitedGreenUpgrades: Upgrade[] = [
  {
    name: 'red-accelerator-buffer', displayName: 'Buff red accelerators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: new NewAction('decrease holding greenSouls by', new Num(1, 0)), nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'green-generators-energy-based', displayName: 'Buff green generators based on green energy', description: '', auto: false, noMax: true,
    baseCost: new Num(3,0), cost: new Num(3, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('multiply multiplier greenParticleGenerators basedon holding greenEnergy pow', new Num(3, -2)),
      new NewAction('decrease holding greenSouls by', new Num(3, 0)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'accelerators-yellow-power-based', displayName: 'Give Accelerators a multiplier based on fifth yellow generators', description: '', auto: false,
    baseCost: new Num(5,0), cost: new Num(5, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('multiply multiplier redAcceleratorGenerators basedon generator yellow-generator-5 amount pow', new Num(2, 1)),
      new NewAction('decrease holding greenSouls by', new Num(5, 0)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'green-generator-greens-based', displayName: 'Give green generators a multiplier based on greens', description: '', auto: false, noMax: true,
    baseCost: new Num(7,0), cost: new Num(7, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('multiply multiplier greenParticleGenerators basedon holding greens', new Num(1, 0)),
      new NewAction('decrease holding greenSouls by', new Num(7, 0)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'red-generators-booster-increase', displayName: 'Increase red generator boosters effect by 3', description: '', auto: false, noMax: true,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('increase upgrade red-generator-booster buffer by', new Num(3, 0)),
      new NewAction('decrease holding greenSouls by', new Num(1, 1)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'green-buffs-yellow-generators', displayName: 'Green generators boost yellow generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1.6,1), cost: new Num(1.6, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('multiply multiplier yellowParticleGenerators basedon generator green-generator-1 amount pow', new Num(7, 0)),
      new NewAction('decrease holding greenSouls by', new Num(1.6, 1)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'fusion-boost-red-generators', displayName: 'Yellow fusion gives a boost to red generators', description: '', auto: false, noMax: true,
    baseCost: new Num(2.5,1), cost: new Num(2.5, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('multiply multiplier redParticleGenerators basedon holding yellowFusion pow', new Num(1, 0)),
      new NewAction('decrease holding greenSouls by', new Num(2.5, 1)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'remove-fusion-limit', displayName: 'Remove the fusion limit, but fusion is slowed down when going beyond its limit.', description: '', auto: false, noMax: true,
    baseCost: new Num(7.5,1), cost: new Num(7.5, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('decrease holding greenSouls by', new Num(7.5, 1)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'super-increase-fusion', displayName: 'Increase Yellow Fusion by 1e5x.', description: '', auto: false, noMax: true,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('multiply multiplier yellowFusion by', new Num(1, 5)),
      new NewAction('decrease holding greenSouls by', new Num(1, 2)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'nerf-dark-age', displayName: 'Nerf dark age and set power to 0.35.', description: '', auto: false, noMax: true,
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('decrease holding greenSouls by', new Num(1, 2)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'yellow-idle-gain', displayName: 'Gain 1% of your yellows gained on yellow per second.', description: '', auto: false, noMax: true,
    baseCost: new Num(2,2), cost: new Num(2, 2), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: [
      new NewAction('decrease holding greenSouls by', new Num(2, 2)),
      new NewAction('increase holding limitedUpgradeCount by', new Num(1, 0))
    ], nav: 'green', subNav: 'greenSacrifice'
  },
]
