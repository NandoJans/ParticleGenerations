import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {UpgradeService} from "../../upgrade.service";


export const blackHoleUpgrades: Upgrade[] = [
  {
    name: 'unlock-black-hole', displayName: 'Unlock Black Hole', description: '', auto: false,
    baseCost: new Num(1,0), cost: new Num(1, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'purpleParticles',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'unlock-black-hole', resetId: 'unlock-black-hole', style: 'purple-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['purples', new Num(5, 0)],
    action: (self: Upgrade) => {
      UpgradeService.setValue('unlock-black-hole', 'requirement', ['never'])
    }, nav: 'red', subNav: 'redPurple'
  },
]
