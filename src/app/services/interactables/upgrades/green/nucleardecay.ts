import {Num} from "../../../../num";
import {Upgrade} from "../../../../globals";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";
import {GeneratorService} from "../../generator.service";
import {UpgradeService} from "../../upgrade.service";
import {HoldingsService} from "../../../holdings.service";


export const nuclearDecayUpgrades: Upgrade[] = [
  {
    name: 'nuclear-decay-booster', displayName: 'Nuclear Boosting', description: 'Increases the buy multiplier of the nuclear decay generators and the Increase Multiplier upgrade.', auto: false, noMax: true,
    baseCost: new Num(1.5,2), cost: new Num(2, 2), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 35)],
    action: (self: Upgrade) => {
      const buff = self.buffer.pow(self.bought, false);
      GeneratorService.getValue('nuclear-decay-generator-1', 'baseMulMod').mul(buff)
      GeneratorService.getValue('nuclear-decay-generator-2', 'baseMulMod').mul(buff)
      GeneratorService.getValue('nuclear-decay-generator-3', 'baseMulMod').mul(buff)
      UpgradeService.getValue('nuclear-decay-increaser', 'buffer').mul(buff)
      // @ts-ignore
      HoldingsService.remove('greenSouls', self.baseCost.mul(self.increase.pow(self.bought, false), false).sub(self.baseCost, false));
      return buff;
    }, limit: new Num(2, 0), nav: 'green', subNav: 'nuclearDecay'
  },
  {
    name: 'nuclear-decay-increaser', displayName: 'Increase Multiplier', description: 'Increases the multiplier of the nuclear decay generator by 5x.', auto: false, noMax: true,
    baseCost: new Num(1,1), cost: new Num(1, 1), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(5, 0), buffer: new Num(5, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 35)],
    action: (self: Upgrade) => {
      const buff = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('nuclearDecayGenerators', buff)
      // @ts-ignore
      HoldingsService.remove('greenSouls', self.baseCost.mul(self.increase.pow(self.bought, false), false).sub(self.baseCost, false));
      return buff;
    }, limit: new Num(5, 0), nav: 'green', subNav: 'nuclearDecay'
  },
  {
    name: 'better-nuclear-decay', displayName: 'Better Nuclear Decay', description: 'Increase the nuclear decay effect.', auto: false, noMax: true,
    baseCost: new Num(7.5,1), cost: new Num(1, 2), increase: new Num(2,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'greenSouls',
    baseBuffer: new Num(1.25, 0), buffer: new Num(1.25, 0), amount: new Num(0, 0), type: 'nuclear-decay', resetId: 'nuclear', style: 'green-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['greenParticles', new Num(1, 35)],
    action: (self: Upgrade) => {
      const buff = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('nuclearDecayPower', buff)
      // @ts-ignore
      HoldingsService.remove('greenSouls', self.baseCost.mul(self.increase.pow(self.bought, false), false).sub(self.baseCost, false));
      return buff;
    }, limit: new Num(3, 0), nav: 'green', subNav: 'nuclearDecay'
  }
]
