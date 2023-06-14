import {Num} from "../../../num";
import {HoldingsService} from "../../holdings.service";
import {UpgradeService} from "../upgrade.service";
import {GeneratorService} from "../generator.service";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {App} from "../../../App";
import {BlackHoleService} from "../../black-hole.service";

export const purpleHoldings = {
  purples: {amount: new Num(0, 0), effect: new Num(1, 0)},
  purpleParticles: {amount: new Num(0, 0), effect: new Num(1, 0)},
  purpleVoid: {amount: new Num(1, 0), effect: new Num(1, 0)},
  redPurple: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(4, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(1, 1), false), false);
      buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
      if (App.purplePhase) UpgradeService.setValue('red-generator-extension', 'buffer', buffer);
      return buffer
    }},
  yellowPurple: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(2, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(3, 2), false), false)
      buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
      if (App.purplePhase) UpgradeService.setValue('yellow-repeatable-multiplier', 'buffer', buffer);
      return buffer
    }},
  greenPurple: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(1, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(2, 2), false), false)
      buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
      if (App.purplePhase) GlobalMultipliersService.correct('greenSoulsGain', buffer);
      return buffer
    }},
  bluePurple: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(1, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(1, 1), false), false)
      buffer.mul(GlobalMultipliersService.get('purpleVoidEffect'))
      if (App.purplePhase) GlobalMultipliersService.correct('blueNeutronGenerators', buffer);
      return buffer
    }},
  blackHoleMass: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      if (UpgradeService.getValue('unlock-black-hole', 'bought').greq(new Num(1, 0)) && BlackHoleService.on) {
        let addMass: Num = new Num(1, 0);
        const holdings = ['redParticles', 'yellowParticles', 'greenParticles', 'blueParticles', 'purpleParticles']
        holdings.forEach(holding => {
          if (HoldingsService.get(holding).greq(new Num(1, 10))) {
            addMass.mul(HoldingsService.get(holding).log10(false).add(new Num(1, 0), false));
            HoldingsService.get(holding).pow(new Num(9, -1))
          }
        })
        addMass.mul(UpgradeService.getValue('purple-galaxy', 'buffer').pow(UpgradeService.getValue('purple-galaxy', 'bought').add(new Num(1, 0), false), false))
        addMass.mul(App.getSpeed())
        HoldingsService.add('blackHoleMass', addMass)
      }
    }},
  gravity: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      if (amount.greq(new Num(1, 110))) {
        HoldingsService.set('gravity', new Num(1, 110));
        amount = new Num(1, 110);
      }
      // @ts-ignore
      let buffer: Num = amount.log10(false)
      buffer.pow(new Num(1.1, 1))
      GlobalMultipliersService.correct('purpleParticleGenerators', buffer.add(new Num(1, 0), false));
      return buffer
    }
  }
}
