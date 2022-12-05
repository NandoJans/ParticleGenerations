import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const blueNeutronStars: Upgrade[] = [
  {
    name: 'red-neutron-star', displayName: 'Red Neutron Star', description: 'Sets the scaling of red generator and accelerator costs to 3, but resets everything.', auto: false,
    baseCost: new Num(2,0), cost: new Num(2, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'neutron-star-upgrade', resetId: 'neutron-star-upgrade', style: 'red-star', unlocked: false, oneTime: true, resets: 'neutron-star', requirement: ['blues', new Num(5, 0)],
    action: [
      new Action('amplifyGenerators', 'red-particles', new Num(3, 0), 'scaling'),
      new Action('amplifyGenerators', 'red-accelerators', new Num(3, 0), 'scaling'),
      new Action('amplifyUpgrades', 'red-accelerators', new Num(3, 0), 'scaling'),
    ]
  },
  {
    name: 'yellow-neutron-star', displayName: 'Yellow Neutron Star', description: 'Sets the scaling of yellow generator costs to 3, but resets everything.', auto: false,
    baseCost: new Num(2,100), cost: new Num(2, 100), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'neutron-star-upgrade', resetId: 'neutron-star-upgrade', style: 'yellow-star', unlocked: false, oneTime: true, resets: 'neutron-star', requirement: ['blues', new Num(5, 0)],
    action: new Action('amplifyGenerators', 'yellow-particles', new Num(3, 0), 'scaling')
  },
  {
    name: 'green-neutron-star', displayName: 'Green Neutron Star', description: 'Sets the scaling of green generator costs to 3, but resets everything.', auto: false,
    baseCost: new Num(2,200), cost: new Num(2, 200), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'neutron-star-upgrade', resetId: 'neutron-star-upgrade', style: 'green-star', unlocked: false, oneTime: true, resets: 'neutron-star', requirement: ['blues', new Num(5, 0)],
    action: new Action('amplifyGenerators', 'green-particles', new Num(3, 0), 'scaling')
  },
  {
    name: 'blue-neutron-star', displayName: 'Blue Neutron Star', description: 'Sets the scaling of blue generator costs to 3, but resets everything.', auto: false,
    baseCost: new Num(1,500), cost: new Num(1, 500), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'neutron-star-upgrade', resetId: 'neutron-star-upgrade', style: 'blue-star', unlocked: false, oneTime: true, resets: 'neutron-star', requirement: ['blues', new Num(5, 0)],
    action: new Action('amplifyGenerators', 'green-particles', new Num(3, 0), 'scaling')
  },
]
