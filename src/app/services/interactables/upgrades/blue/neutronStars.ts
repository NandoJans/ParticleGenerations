import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const blueNeutronStars: Upgrade[] = [
  {
    name: 'neutron-star', displayName: 'Neutron Star', description: 'Sets the scaling of red generator and accelerator costs to 2, but resets everything. Also starts the generation of blue light.', auto: false,
    baseCost: new Num(2,0), cost: new Num(2, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'neutron-star-upgrade', resetId: 'neutron-star-upgrade', style: 'blue-star', unlocked: false, oneTime: true, resets: 'neutron-star', requirement: ['blues', new Num(5, 0)],
    action: [
      new Action('amplifyGenerators', 'red-particles', new Num(2, 0), 'scaling'),
      new Action('amplifyGenerators', 'red-accelerators', new Num(2, 0), 'scaling'),
      new Action('amplifyUpgrades', 'red-accelerators', new Num(2, 0), 'scaling'),
      new Action('amplifyGenerator', 'blue-light-generator', new Num(1, 0), 'amount'),
    ]
  },
  {
    name: 'blue-light-amplifier', displayName: 'Blue Light Amplifier', description: 'Increases the blue light effect.', auto: false, scalingStart: new Num(1, 30), limit: new Num(1, 1),
    baseCost: new Num(1,4), cost: new Num(1, 4), increase: new Num(1,3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1.2, 0), buffer: new Num(1.2, 0), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue-light-upgrade', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(5, 0)],
    action: new Action('basedOnUpgrade', 'blueLightPower', new Num(1, 0), 'bought', 'blue-light-amplifier'), nav: 'blue', subNav: 'neutronStars'
  },
  {
    name: 'blue-light-increaser', displayName: 'Increase Blue Light', description: 'Generates 4x more blue light.', auto: false,
    baseCost: new Num(1,4), cost: new Num(1, 4), increase: new Num(1,2), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(4, 0), buffer: new Num(4, 0), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue-light-upgrade', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(5, 0)],
    action: new Action('basedOnUpgrade', 'blueLightGenerators', new Num(1, 0), 'bought', 'blue-light-increaser'), nav: 'blue', subNav: 'neutronStars'
  },
  {
    name: 'yellow-fusion-accelerator', displayName: 'Yellow Fusion Accelerator', description: 'Makes yellow fusion 1e10x faster.', auto: false, scalingStart: new Num(1, 100),
    baseCost: new Num(1,2), cost: new Num(1, 2), increase: new Num(1,2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1, 10), buffer: new Num(1, 10), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue-light-upgrade', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(5, 0)],
    action: new Action('basedOnUpgrade', 'yellowFusion', new Num(1, 0), 'bought', 'yellow-fusion-accelerator'), nav: 'blue', subNav: 'neutronStars'
  },
  {
    name: 'yellow-fusion-effect-increaser', displayName: 'Increase Fusion Effect', description: 'Increases the power of the yellow fusion effect.', auto: false, scalingStart: new Num(1, 100),
    baseCost: new Num(1,3), cost: new Num(1, 3), increase: new Num(1,3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue-light-upgrade', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(5, 0)],
    action: new Action('basedOnUpgradeMul', 'yellowFusionBlueLightEffect', new Num(0.2, 0), 'bought', 'yellow-fusion-effect-increaser'), nav: 'blue', subNav: 'neutronStars'
  },
]
