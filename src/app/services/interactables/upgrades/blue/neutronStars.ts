import {Upgrade} from "../../../../globals";
import {Num} from "../../../../num";
import {GlobalMultipliersService} from "../../../globals/global-multipliers.service";
import {GeneratorService} from "../../generator.service";
import {HoldingsService} from "../../../holdings.service";
import {UpgradeService} from "../../upgrade.service";

export const blueNeutronStars: Upgrade[] = [
  {
    name: 'neutron-star', displayName: 'Neutron Star', description: 'Starts the generation of blue light.', auto: false,
    baseCost: new Num(2,0), cost: new Num(2, 0), increase: new Num(1,0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'blueParticles',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'neutron-star-upgrade', resetId: 'blue', style: 'blue-star', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      GeneratorService.setValue('blue-light-generator', 'amount', new Num(1, 0))
    },
  },



  {
    name: 'blue-light-amplifier', displayName: 'Blue Light Amplifier', description: 'Increases the blue light effect.', auto: false, limit: new Num(5.6, 1), scalingStart: new Num(5  , 50),
    baseCost: new Num(1,6), cost: new Num(1, 6), increase: new Num(1,1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1.05, 0), buffer: new Num(1.02, 0), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('blueLightPower', buff);
      return buff;
    }, nav: 'blue', subNav: 'neutronStars',
  },
  {
    name: 'blue-light-increaser', displayName: 'Increase Blue Light', description: 'Generates 2x more blue light.', auto: false, scalingStart: new Num(1, 50), limit: new Num(3.5, 1),
    baseCost: new Num(1,4), cost: new Num(1, 4), increase: new Num(2.5,2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(2, 0), buffer: new Num(2, 0), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('blueLightGenerators', buff);
      return buff;
    }, nav: 'blue', subNav: 'neutronStars'
  },
  {
    name: 'yellow-fusion-accelerator', displayName: 'Yellow Fusion Accelerator', description: 'Makes yellow fusion 1e5x faster.', auto: false, scalingStart: new Num(1, 50),
    baseCost: new Num(1,5), cost: new Num(1, 5), increase: new Num(1,2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1, 5), buffer: new Num(1, 5), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('yellowFusion', buff);
      return buff;
    }, nav: 'blue', subNav: 'neutronStars'
  },
  {
    name: 'yellow-fusion-effect-increaser', displayName: 'Increase Fusion Effect', description: 'Increases the power of the yellow fusion effect.', auto: false, scalingStart: new Num(1, 20), limit: new Num(1.3, 1),
    baseCost: new Num(1,7), cost: new Num(1, 7), increase: new Num(1,3), scaling: new Num(1, 2), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1.25, 0), buffer: new Num(1.25, 0), amount: new Num(0, 0), type: 'blue-light-upgrade', resetId: 'blue', style: 'light-style', unlocked: false, oneTime: false, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = self.buffer.pow(self.bought, false);
      GlobalMultipliersService.correct('yellowFusionBlueLightEffect', buff);
      return buff;
    }, nav: 'blue', subNav: 'neutronStars'
  },



  {
    name: 'light-neutron-multiplier', displayName: 'Light Neutrons', description: 'Blue neutrons boost blue light.', auto: false,
    baseCost: new Num(1,15), cost: new Num(1, 15), increase: new Num(1,3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1.5, -1), buffer: new Num(1.5, -1), amount: new Num(0, 0), type: 'blue-light-upgrade-onetime', resetId: 'blue', style: 'light-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      const buff: Num | undefined = HoldingsService.get('blueNeutrons').pow(self.buffer, false);
      GlobalMultipliersService.correct('blueLightGenerators', buff);
      return buff;
    }, nav: 'blue', subNav: 'neutronStars'
  },
  {
    name: 'buff-nuclear-decay', displayName: 'Better Nuclear Decay', description: 'Be able to buy more nuclear decay upgrades.', auto: false,
    baseCost: new Num(1,25), cost: new Num(1, 25), increase: new Num(1,3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-light-upgrade-onetime', resetId: 'blue', style: 'light-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      UpgradeService.setValue('nuclear-decay-booster', 'limit', new Num(3, 0));
      UpgradeService.setValue('nuclear-decay-increaser', 'limit', new Num(7, 0));
      UpgradeService.setValue('better-nuclear-decay', 'limit', new Num(4, 0));
    }, nav: 'blue', subNav: 'neutronStars'
  },
  {
    name: 'more-dark-power', displayName: 'More Dark Power', description: 'Increase the limit of dark power by 66, but make dark age harder again.', auto: false,
    baseCost: new Num(1,50), cost: new Num(1, 50), increase: new Num(1,3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'blueLight',
    baseBuffer: new Num(1, 0), buffer: new Num(1, 0), amount: new Num(0, 0), type: 'blue-light-upgrade-onetime', resetId: 'blue', style: 'light-style', unlocked: false, oneTime: true, resets: 'none', requirement: ['blues', new Num(3, 0)],
    action: (self: Upgrade) => {
      HoldingsService.set('maxDarkPower', new Num(2.66, 2));
    }, nav: 'blue', subNav: 'neutronStars'
  },
]
