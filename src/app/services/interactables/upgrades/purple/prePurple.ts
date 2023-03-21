import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {Action} from "../../../../action";
import {NewAction} from "../../../../NewAction";

export const prePurpleUpgrades: Upgrade[] = [
  {
    name: 'red-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase all red purple buy multipliers by 0.02', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,110000), scaling: new Num(1, 220000), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(1.02, 0), buffer: new Num(1.02, 0), amount: new Num(0, 0), type: 'red-purple-upgrade', resetId: 'red-purple-upgrade', style: 'red-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(2, 0)],
    action: [
      new NewAction('multiply generator red-purple-generator-1 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator red-purple-generator-2 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator red-purple-generator-3 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply upgrade red-purple-booster buffer basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'red', subNav: 'redPurple'
  },

  {
    name: 'red-purple-booster', displayName: 'Red Purple Booster', description: 'Multiply the red purple generators by 2', auto: false,
    baseCost: new Num(1,40), cost: new Num(1, 40), increase: new Num(1,160000), scaling: new Num(1, 340000), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-purple-upgrade', resetId: 'red-purple-upgrade', style: 'red-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(4, 0)],
    action: [
      new NewAction('multiply multiplier redPurpleGenerators basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'red', subNav: 'redPurple'
  },

  {
    name: 'yellow-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase all yellow purple buy multipliers by 0.03', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,800), scaling: new Num(1, 1600), bought: new Num(0, 0), currency: 'yellowParticles',
    baseBuffer: new Num(1.03, 0), buffer: new Num(1.03, 0), amount: new Num(0, 0), type: 'yellow-purple-upgrade', resetId: 'yellow-purple-upgrade', style: 'yellow-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(2, 0)],
    action: [
      new NewAction('multiply generator yellow-purple-generator-1 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator yellow-purple-generator-2 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator yellow-purple-generator-3 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply upgrade yellow-purple-booster buffer basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'yellow', subNav: 'yellowPurple'
  },

  {
    name: 'yellow-purple-booster', displayName: 'Yellow Purple Booster', description: 'Multiply the yellow purple generators by 2', auto: false,
    baseCost: new Num(1,40), cost: new Num(1, 40), increase: new Num(1,1600), scaling: new Num(1, 3200), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-purple-upgrade', resetId: 'red-purple-upgrade', style: 'red-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(4, 0)],
    action: [
      new NewAction('multiply multiplier yellowPurpleGenerators basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'red', subNav: 'redPurple'
  },

  {
    name: 'green-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase all green purple buy multipliers by 0.05', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,50), scaling: new Num(1, 100), bought: new Num(0, 0), currency: 'greenParticles',
    baseBuffer: new Num(1.05, 0), buffer: new Num(1.05, 0), amount: new Num(0, 0), type: 'green-purple-upgrade', resetId: 'green-purple-upgrade', style: 'green-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(2, 0)],
    action: [
      new NewAction('multiply generator green-purple-generator-1 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator green-purple-generator-2 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator green-purple-generator-3 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply upgrade green-purple-booster buffer basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'green', subNav: 'greenPurple'
  },

  {
    name: 'greeb-purple-booster', displayName: 'Green Purple Booster', description: 'Multiply the green purple generators by 2', auto: false,
    baseCost: new Num(1,40), cost: new Num(1, 40), increase: new Num(1,100), scaling: new Num(1, 200), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-purple-upgrade', resetId: 'red-purple-upgrade', style: 'red-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(4, 0)],
    action: [
      new NewAction('multiply multiplier greenPurpleGenerators basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'red', subNav: 'redPurple'
  },

  {
    name: 'blue-purple-buffer-increaser', displayName: 'Buy Multiplier Increaser', description: 'Increase all blue purple buy multipliers by 0.1', auto: false,
    baseCost: new Num(1,20), cost: new Num(1, 20), increase: new Num(1,20), scaling: new Num(1, 40), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1.1, 0), buffer: new Num(1.1, 0), amount: new Num(0, 0), type: 'blue-purple-upgrade', resetId: 'blue-purple-upgrade', style: 'blue-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(2, 0)],
    action: [
      new NewAction('multiply generator blue-purple-generator-1 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator blue-purple-generator-2 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply generator blue-purple-generator-3 baseMulMod basedon upgrade this pow', new Num(1, 0)),
      new NewAction('multiply upgrade blue-purple-booster buffer basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'blue', subNav: 'bluePurple'
  },

  {
    name: 'blue-purple-booster', displayName: 'Blue Purple Booster', description: 'Multiply the blue purple generators by 2', auto: false,
    baseCost: new Num(1,40), cost: new Num(1, 40), increase: new Num(1,40), scaling: new Num(1, 80), bought: new Num(0, 0), currency: 'redParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'red-purple-upgrade', resetId: 'red-purple-upgrade', style: 'red-purple-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['purples', new Num(4, 0)],
    action: [
      new NewAction('multiply multiplier bluePurpleGenerators basedon upgrade this pow', new Num(1, 0)),
    ], nav: 'red', subNav: 'redPurple'
  },
]
