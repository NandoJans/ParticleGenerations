import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const greenSacrifice: Upgrade[] = [
  {
    name: 'red-particles-sacrifice', displayName: 'Sacrifice Red Particles', description: 'Sacrifice red particles to gain a green soul.', auto: false,
    baseCost: new Num(1,10000), cost: new Num(1, 10000), increase: new Num(1,10000), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-sacrifices', resetId: 'green-sacrifices', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: new Action('increaseHolding', 'greenSouls', new Num(1, 0), 'bought', 'red-particles-sacrifice'), nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'yellow-particles-sacrifice', displayName: 'Sacrifice Yellow Particles', description: 'Sacrifice yellow particles to gain a green soul.', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,50), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-sacrifices', resetId: 'green-sacrifices', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: new Action('increaseHolding', 'greenSouls', new Num(1, 0), 'bought', 'yellow-particles-sacrifice'), nav: 'green', subNav: 'greenSacrifice'
  },
  {
    name: 'green-particles-sacrifice', displayName: 'Sacrifice Green Particles', description: 'Sacrifice yellow particles to gain a green soul.', auto: false,
    baseCost: new Num(2,0), cost: new Num(2, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-sacrifices', resetId: 'green-sacrifices', style: 'sacrifice-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: new Action('increaseHolding', 'greenSouls', new Num(1, 0), 'bought', 'green-particles-sacrifice'), nav: 'green', subNav: 'greenSacrifice'
  },
]
