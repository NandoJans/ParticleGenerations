import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const prePurpleUpgrades: Upgrade[] = [
  {
    name: 'red-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase the red purple generator buy multiplier by 1', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,110), scaling: new Num(1, 220), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'red-purple-upgrade', resetId: 'red-purple-upgrade', style: 'red-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(1, 0)],
    action: new Action('', ''), nav: 'red', subNav: 'redPurple'
  },



  {
    name: 'yellow-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase the yellow purple generator buy multiplier by 1', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,110), scaling: new Num(1, 220), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'yellow-purple-upgrade', resetId: 'yellow-purple-upgrade', style: 'yellow-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(1, 0)],
    action: new Action('', ''), nav: 'yellow', subNav: 'yellowPurple'
  },

  {
    name: 'green-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase the green purple generator buy multiplier by 1', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,110), scaling: new Num(1, 220), bought: new Num(0, 0), currency: 'greenParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-purple-upgrade', resetId: 'green-purple-upgrade', style: 'green-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(1, 0)],
    action: new Action('', ''), nav: 'green', subNav: 'greenPurple'
  },

  {
    name: 'blue-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase the blue purple generator buy multiplier by 1', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,110), scaling: new Num(1, 220), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-purple-upgrade', resetId: 'blue-purple-upgrade', style: 'blue-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(1, 0)],
    action: new Action('', ''), nav: 'blue', subNav: 'bluePurple'
  },
]
