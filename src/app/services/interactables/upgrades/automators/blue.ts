import {Automator} from "../../../../globals";
import {Num} from "../../../../num";

export const blueAutomators: Automator[] = [
  {
    name: 'blue-neutron-generators-automator', displayName: 'Blue Neutron Generators Automator', cost: new Num(2, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-neutrons', targetType: 'generators', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-neutron-upgrades-automator', displayName: 'Blue Neutron Upgrades Automator', cost: new Num(3, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-neutron-upgrade', targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-light-upgrades-automator', displayName: 'Blue Light Upgrades Automator', cost: new Num(1, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: ['blue-light-upgrade', 'blue-light-upgrade-ontime'], targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-particle-generators-automator', displayName: 'Blue Particle Generator Automator', cost: new Num(1, 2), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-particles', targetType: 'generators', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-upgrades-automator', displayName: 'Blue Upgrades Automator', cost: new Num(2, 1), bought: new Num(0, 0), currency: 'purpleParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-upgrades', targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-purple-generator-automator', displayName: 'Blue Purple Generator Automator', cost: new Num(1, 110), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-purple-generator', targetType: 'generators', nav: 'automators', subNav: 'blueAutomators'
  },
  {
    name: 'blue-purple-upgrade-automator', displayName: 'Blue Purple Upgrade Automator', cost: new Num(1, 1100), bought: new Num(0, 0), currency: 'blueParticles',
    type: 'blue-automators', resetId: 'blue-automators', style: 'automator blue-automator', unlocked: false, active: false, requirement: ['purples', new Num(1, 0)],
    target: 'blue-purple-upgrade', targetType: 'upgrades', nav: 'automators', subNav: 'blueAutomators'
  }
]
