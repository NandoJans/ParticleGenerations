import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const limitedGreenUpgrades: Upgrade[] = [
  {
    name: 'red-accelerator-buffer', displayName: 'Buff red accelerators', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'green-limited-upgrades', resetId: 'green-limited-upgrades', style: 'limited-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['greens', new Num(1, 0)],
    action: new Action('decreaseHolding', 'greenSouls', new Num(1, 0), 'cost', 'red-accelerator-buffer')
  },
]
