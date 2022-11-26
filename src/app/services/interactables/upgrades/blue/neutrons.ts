import {Num} from "../../../../num";
import {Action} from "../../../../action";

export const blueNeutronUpgrades = [
  {
    name: 'blue-neutron-amplifier', displayName: 'Neutron Amplifier', description: 'Amplify the power of blue neutrons.', auto: false,
    baseCost: new Num(2,0), cost: new Num(2, 0), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-neutron-upgrade', resetId: 'blue-neutron-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(1, 0)],
    action: new Action('', '')
  },
]
