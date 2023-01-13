import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const redGeneratorUpgrades: Upgrade[] = [
  {
    name: 'red-generator-extension', displayName: 'Red Generator Extension', description: 'Get a new generator that generates generators below it.', auto: false,
    baseCost: new Num(1,4), cost: new Num(1, 4), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-particles', resetId: 'red-particles', style: 'red-style', unlocked: true, oneTime: false, resets: 'redParticleGenerators', requirement: ['none', new Num(0, 0)],
    action: new Action('basedOnUpgrade', 'redParticleGenerators', new Num(2, 0), 'bought', 'red-generator-extension', ['red-generator-extension-upgrade', 'bought', new Num(1, 0)]), nav: 'red', subNav: 'redParticles'
  },
  {
    name: 'red-generator-booster', displayName: 'Red Generator Booster', description: 'Boosts generators', auto: false,
    baseCost: new Num(1,3), cost: new Num(1, 3), increase: new Num(2,0), scaling: new Num(3, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'red-particles', resetId: 'red-particles', style: 'red-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['never', new Num(1, 0)],
    action: new Action('basedOnUpgrade', 'redParticleGenerators', new Num(1.2, 0), 'amount', 'red-generator-booster'), nav: 'red', subNav: 'redParticles'
  },
]
