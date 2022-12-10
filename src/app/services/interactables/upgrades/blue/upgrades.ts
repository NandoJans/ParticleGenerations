import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const blueUpgrades = [
  {
    name: 'more-powerfull-dark-age', displayName: 'Dark age to 10', description: 'Dark power multiplies dark energy to the power of 10.', auto: false,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 1), buffer: new Num(1, 1), amount: new Num(0, 0), type: 'blue-upgrades', resetId: 'blue-upgrade', style: 'blue-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blueParticles', new Num(1, 1)],
    action: new Action('globalMultiplier', 'darkPowerPower', new Num(1, 1))
  }
]
