import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {NewAction} from "../../../../NewAction";

export const darkenergyUpgrades: Upgrade[] = [
  {
    name: 'dark-energy-compressor', displayName: 'Compressor', description: 'Compresses Green Energy into Dark Energy', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenEnergy',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'dark-compressor', resetId: 'dark-compressor', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      //new NewAction('multiply holding darkEnergy by', new Num(0, 0)),
      new NewAction('multiply holding darkEnergy basedon upgrade dark-energy-compressor bought', new Num(1, 0)),
    ], nav: 'green', subNav: 'darkEnergy'
  },

  {
    name: 'dark-yellow-fusion', displayName: 'Dark yellow fusion', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 5), buffer: new Num(1, 5), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new NewAction('multiply holding yellowFusionMax basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding darkEnergy basedon upgrade dark-yellow-fusion bought incremental', new Num(2, 0))
    ], nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-green-generators', displayName: 'Dark green generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(3, 0), buffer: new Num(3, 0), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new NewAction('multiply multiplier greenParticleGenerators basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding darkEnergy basedon upgrade dark-green-generators bought incremental', new Num(2, 0)),
    ], nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-yellow-generators', displayName: 'Dark yellow generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 15), buffer: new Num(1, 15), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new NewAction('multiply multiplier yellowParticleGenerators basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding darkEnergy basedon upgrade dark-yellow-generators bought incremental', new Num(2, 0))
    ], nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-red-generators', displayName: 'Dark red generators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 300), buffer: new Num(1, 300), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new NewAction('multiply multiplier redParticleGenerators basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding darkEnergy basedon upgrade dark-red-generators bought incremental', new Num(2, 0))
    ], nav: 'green', subNav: 'darkEnergy'
  },
  {
    name: 'dark-red-accelerators', displayName: 'Dark red accelerators', description: '', auto: false, noMax: true,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'darkEnergy',
    baseBuffer: new Num(1, 130), buffer: new Num(1, 130), amount: new Num(0, 0), type: 'dark-upgrade', resetId: 'dark-upgrade', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 1)],
    action: [
      new NewAction('multiply multiplier redAcceleratorGenerators basedon upgrade this pow', new Num(1, 0)),
      new NewAction('decrease holding darkEnergy basedon upgrade dark-red-accelerators bought incremental', new Num(2, 0))
    ], nav: 'green', subNav: 'darkEnergy'
  }
]
