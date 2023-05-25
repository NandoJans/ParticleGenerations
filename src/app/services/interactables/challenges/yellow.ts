import {Challenge, Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {Action} from "../../../action";
import {NewAction} from "../../../NewAction";
import {UpgradeService} from "../upgrade.service";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {HoldingsService} from "../../holdings.service";
import {GeneratorService} from "../generator.service";
import {greenHoldings} from "../holdings/greenHoldings";
import {AutomatorService} from "../automator.service";
import {BuyableService} from "../buyable.service";

export const yellowChallenges: Challenge[] = [
  {
    name: 'yellow-challenge-1', displayName: 'Yellow Challenge 1', description: 'without the red generator booster.', goal: new Num(1, 1100), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Gain a multiplier to red accelerators based on red generator boosts.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 5)],
    reward: (self: Challenge) => {
      const buff: Num = UpgradeService.getValue('red-generator-booster', 'buffer').add(new Num(1, 0), false);
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff)
      return buff;
    },
    nerfs: (self: Challenge) => {
      UpgradeService.disableUpgrade('red-generator-booster')
    }
  },
  {
    name: 'yellow-challenge-2', displayName: 'Yellow Challenge 2', description: 'without any red accelerators.', goal: new Num(1, 1350), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Gain an extra red accelerator generator.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 8)],
    reward: (self: Challenge) => {
      GeneratorService.setValue('red-accelerator-generator-2', 'unlocked', true)
    },
    nerfs: (self: Challenge) => {
      HoldingsService.set('redAccelerators', new Num(1, 0));
      GeneratorService.disableGenerators('red-accelerators');
      UpgradeService.disableUpgrades('red-accelerators');
    }
  },
  {
    name: 'yellow-challenge-3', displayName: 'Yellow Challenge 3', description: 'while only having red and yellow generators.', goal: new Num(1, 1350), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Yellow generators are multiplied by the amount of fifth red generators.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 11)],
    reward: (self: Challenge) => {
      const buff: Num = GeneratorService.getValue('red-generator-5', 'amount').pow(new Num(2, 0), false);
      GlobalMultipliersService.correct('yellowParticleGenerators', buff)
      return buff;
    },
    nerfs: (self: Challenge) => {
      HoldingsService.set('redAccelerators', new Num(1, 0));
      GeneratorService.disableGenerators('red-accelerators');
      UpgradeService.disableUpgrades('red-accelerators');
      UpgradeService.disableUpgrades('red-particles');
      UpgradeService.disableUpgrades('red-upgrades');
      UpgradeService.disableUpgrades('yellow-upgrades');
    }
  },
  {
    name: 'yellow-challenge-4', displayName: 'Yellow Challenge 4', description: 'while only having red generators, but red accelerators are insanely powerfull.', goal: new Num(1, 1750), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Red accelerators gain a multiplier based on yellow power.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 15)],
    reward: (self: Challenge) => {
      const buff: Num = HoldingsService.get('yellowPower').add(new Num(1, 0), false);
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff)
      return buff;
    },
    nerfs: (self: Challenge) => {
      HoldingsService.set('yellowPower', new Num(0, 0));
      GeneratorService.disableGenerators('yellow-particles');
      UpgradeService.disableUpgrades('red-particles');
      UpgradeService.disableUpgrades('red-upgrades');
      UpgradeService.disableUpgrades('yellow-upgrades');

      GeneratorService.setValue('red-accelerator-generator-2', 'baseCost', new Num(1,16));

      GeneratorService.setValue('red-accelerator-generator-1', 'baseMultiplier', new Num(1,2));
      GeneratorService.setValue('red-accelerator-generator-2', 'baseMultiplier', new Num(1,3));

      UpgradeService.setValues('red-accelerators', 'scaling', new Num(1,2))
      GeneratorService.setValues('red-accelerators', 'scaling', new Num(1,2))

      UpgradeService.setValue('red-accelerator-multiplier-1', 'buffer', new Num(1,3))
      UpgradeService.setValue('red-accelerator-multiplier-2', 'buffer', new Num(1,4))
      UpgradeService.setValue('red-accelerator-multiplier-3', 'buffer', new Num(1,5))

      UpgradeService.setValue('red-accelerator-multiplier-1', 'baseCost', new Num(1,8))
      UpgradeService.setValue('red-accelerator-multiplier-2', 'baseCost', new Num(1,70))
      UpgradeService.setValue('red-accelerator-multiplier-3', 'baseCost', new Num(1,152))

      GeneratorService.setValue('red-accelerator-generator-1', 'requirement', ['holding', 'redAccelerators', new Num(0, 0)])
      GeneratorService.setValue('red-accelerator-generator-2', 'requirement', ['holding', 'redAccelerators', new Num(1, 16)])

      UpgradeService.setValue('red-accelerator-multiplier-1', 'requirement', ['redAccelerators', new Num(1, 8)])
      UpgradeService.setValue('red-accelerator-multiplier-2', 'requirement', ['redAccelerators', new Num(1, 70)])
      UpgradeService.setValue('red-accelerator-multiplier-3', 'requirement', ['redAccelerators', new Num(1, 152)])

      if (!HoldingsService.get('greens').greq(new Num(1, 0))) {
        AutomatorService.setActive('red-accelerators-automator', false);
        AutomatorService.setActive('red-accelerator-upgrades-automator', false);
      }
    }
  },
  {
    name: 'yellow-challenge-5', displayName: 'Yellow Challenge 5', description: 'when generators won\'t multiply themselfs.', goal: new Num(1, 2400), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'First red generators boost the other generators.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,    requirement: ['yellowParticles', new Num(1, 23)],
    reward: (self: Challenge) => {
      const buff: Num = GeneratorService.getValue('red-generator-1', 'amount').pow(new Num(2, -2), false);
      GlobalMultipliersService.correct('redParticleGenerators', buff)
      return buff;
    },
    nerfs: (self: Challenge) => {
      GeneratorService.setValues('red-particles', 'baseMulMod', new Num(0, 0));
      GeneratorService.setValues('yellow-particles', 'baseMulMod', new Num(0, 0));
    }
  },
  {
    name: 'yellow-challenge-6', displayName: 'Yellow Challenge 6', description: 'without red generators 2-5.', goal: new Num(1, 925), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'The Accelerator Particles upgrade is a lot more powerfull.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 29)],
    reward: (self: Challenge) => {
      UpgradeService.setValue('red-accelerators-particles-based', 'action', (self: Upgrade) => {
        const buff: Num = HoldingsService.get('redParticles').pow(new Num(1, -2), false);
        GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
        return buff
      })
    },
    nerfs: (self: Challenge) => {
      GeneratorService.disableGenerator('red-generator-2');
      GeneratorService.disableGenerator('red-generator-3');
      GeneratorService.disableGenerator('red-generator-4');
      GeneratorService.disableGenerator('red-generator-5');
    }
  },
  {
    name: 'yellow-challenge-7', displayName: 'Yellow Challenge 7', description: 'with only generators, accelerators and reduced fusion', goal: new Num(1, 14200), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Gain a multiplier on red generators based on yellow fusion.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 70)],
    reward: (self: Challenge) => {
      const buff: Num = HoldingsService.get('yellowFusion').add(new Num(1, 0), false);
      GlobalMultipliersService.correct('redAcceleratorGenerators', buff);
      return buff
    },
    nerfs: (self: Challenge) => {
      UpgradeService.disableUpgrades('red-particles');
      UpgradeService.disableUpgrades('red-upgrades');
      UpgradeService.disableUpgrades('yellow-upgrades');
      UpgradeService.setValue('accelerate-yellow-fusion', 'buffer', new Num(1.05, 0));
      UpgradeService.setValue('increase-yellow-fusion', 'buffer', new Num(1.075, 0));
    }
  },
  {
    name: 'yellow-challenge-8', displayName: 'Yellow Challenge 8', description: 'when yellow generators generate second red accelerator generators.', goal: new Num(1, 5500), currency: 'redParticles', completed: false, disabled: false,
    rewardDescription: 'Make yellow fusion much more powerfull.', style: 'yellow-challenge', resetId: 'yellow', type: 'yellow-challenges', prestige: 'yellow', unlocked: false, instantComplete: false,
    requirement: ['yellowParticles', new Num(1, 75)],
    reward: (self: Challenge) => {
      HoldingsService.set('yellowFusionPower', new Num(4, -1));
    },
    nerfs: (self: Challenge) => {
      GeneratorService.setValue('yellow-generator-1', 'generates', 'red-accelerator-generator-2')
      UpgradeService.setValue('accelerate-yellow-fusion', 'buffer', new Num(1.05, 0));
      UpgradeService.setValue('increase-yellow-fusion', 'buffer', new Num(1.075, 0));
    }
  },
]
