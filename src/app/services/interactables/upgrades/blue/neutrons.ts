import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {NewAction} from "../../../../NewAction";

export const blueNeutronUpgrades = [
  {
    name: 'blue-neutron-amplifier', displayName: 'Neutron Amplifier', description: 'Amplify the power of blue neutrons.', auto: false, limit: new Num(1, 1),
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,1), scaling: new Num(1, 2), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1.1, 0), buffer: new Num(1.1, 0), amount: new Num(0, 0), type: 'blue-neutron-upgrade', resetId: 'blue-neutron-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(2, 0)],
    action: new NewAction('multiply multiplier blueNeutronPower basedon upgrade this pow' ,new Num(1, 0)), nav: 'blue', subNav: 'blueNeutrons', noMax: true,
  },
  {
    name: '2x-blue-neutron-generator-boost', displayName: '2x Multiplier', description: 'Multiply the blue neutron generators by 2.', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(5,0), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-neutron-upgrade', resetId: 'blue-neutron-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: new NewAction('multiply multiplier blueNeutronGenerators basedon upgrade this pow', new Num(1, 0)), nav: 'blue', subNav: 'blueNeutrons'
  },
  {
    name: '5x-blue-neutron-generator-boost', displayName: '5x Multiplier', description: 'Multiply the blue neutron generators by 5.', auto: false,
    baseCost: new Num(2,0), cost: new Num(2, 0), increase: new Num(2,1), scaling: new Num(2, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(5, 0), buffer: new Num(5, 0), amount: new Num(0, 0), type: 'blue-neutron-upgrade', resetId: 'blue-neutron-upgrade', style: 'blue-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(4, 0)],
    action: new NewAction('multiply multiplier blueNeutronGenerators basedon upgrade this pow', new Num(1, 0)), nav: 'blue', subNav: 'blueNeutrons'
  }
]
