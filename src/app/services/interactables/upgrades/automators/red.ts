import {Num} from "../../../../num";
import {Automator} from "../../../../globals";

export const redAutomators: Automator[] = [
  {
    name: 'red-generators-automator', displayName: 'Red Generators Automator', cost: new Num(5, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, active: false, requirement: ['yellows', new Num(1, 0)],
    target: 'red-particles', targetType: 'generators', nav: 'automators', subNav: 'redAutomators'
  },
  {
    name: 'red-accelerators-automator', displayName: 'Red Accelerators Automator', cost: new Num(5, 0), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, active: false, requirement: ['yellows', new Num(1, 0)],
    target: 'red-accelerators', targetType: 'generators', nav: 'automators', subNav: 'redAutomators'
  },
  {
    name: 'red-booster-automator', displayName: 'Red Booster Automator', cost: new Num(1, 1), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, active: false, requirement: ['yellows', new Num(1, 0)],
    target: 'red-generator-booster', targetType: 'upgrade', nav: 'automators', subNav: 'redAutomators'
  },
  {
    name: 'red-extension-automator', displayName: 'Red Extension Automator', cost: new Num(1, 1), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, active: false, requirement: ['yellows', new Num(1, 0)],
    target: 'red-generator-extension', targetType: 'upgrade', nav: 'automators', subNav: 'redAutomators'
  },
  {
    name: 'red-accelerator-upgrades-automator', displayName: 'Red Accelerator Upgrades Automator', cost: new Num(1, 2), bought: new Num(0, 0), currency: 'yellowParticles',
    type: 'red-automators', resetId: 'red-automators', style: 'automator', unlocked: false, active: false, requirement: ['yellows', new Num(1, 0)],
    target: 'red-accelerators', targetType: 'upgrades', nav: 'automators', subNav: 'redAutomators'
  }
]
