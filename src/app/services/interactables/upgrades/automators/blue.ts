import {Automator} from "../../../../globals";
import {Num} from "../../../../num";

export const blueAutomators: Automator[] = [
  {
    name: 'blue-neutron-generators-automator', displayName: 'Blue Neutron Generators Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-neutrons', targetType: 'generators', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-neutron-upgrades-automator', displayName: 'Blue Neutron Upgrades Automator', cost: new Num(3, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-neutron-upgrade', targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-light-upgrades-automator', displayName: 'Blue Light Upgrades Automator', cost: new Num(1, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: ['blue-light-upgrade', 'blue-light-upgrade-ontime'], targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-particle-generators-automator', displayName: 'Blue Particle Generator Automator', cost: new Num(1, 2), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-particles', targetType: 'generators', nav: 'automators', subNav: 'blueAutomators'
  },



  {
    name: 'red-upgrades-automator', displayName: 'Red Upgrades Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-upgrade-automators', resetId: 'blue-automators', style: 'red-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'red-upgrades', targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },{
    name: 'yellow-upgrades-automator', displayName: 'Yellow Upgrades Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-upgrade-automators', resetId: 'blue-automators', style: 'yellow-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: ['yellow-upgrades', 'yellow-fusion'], targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'green-upgrades-automator', displayName: 'Green Sacrifice Upgrades Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-upgrade-automators', resetId: 'blue-automators', style: 'green-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'green-limited-upgrades', targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-upgrades-automator', displayName: 'Blue Upgrades Automator', cost: new Num(2, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-upgrade-automators', resetId: 'blue-automators', style: 'blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-upgrades', targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
]
