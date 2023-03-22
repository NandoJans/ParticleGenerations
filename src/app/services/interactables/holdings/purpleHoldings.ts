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
      let buffer: Num = new Num(2, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(1, 1), false), false);
      if (App.purplePhase) UpgradeService.setValue('red-generator-extension', 'buffer', buffer);
      return buffer
    }},
  yellowPurple: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(2, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(3, 2), false), false)
      if (App.purplePhase) UpgradeService.setValue('yellow-repeatable-multiplier', 'buffer', buffer);
      return buffer
    }},
  greenPurple: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(1, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(2, 2), false), false)
      if (App.purplePhase) GlobalMultipliersService.correct('greenSoulsGain', buffer);
      return buffer
    }},
  bluePurple: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(1, 0).add(amount.pow(HoldingsService.get('purpleVoid').log10(false), false).log(new Num(1, 1), false), false)
      if (App.purplePhase) GlobalMultipliersService.correct('blueNeutronGenerators', buffer);
      return buffer
    }},
  blackHoleMass: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      if (UpgradeService.getValue('unlock-black-hole', 'bought').greq(new Num(1, 0)) && BlackHoleService.on) {
        let addMass: Num = HoldingsService.get('redParticles').log10(false);
        addMass.mul(HoldingsService.get('yellowParticles').log10(false), false);
        addMass.mul(HoldingsService.get('greenParticles').log10(false), false);
        addMass.mul(HoldingsService.get('blueParticles').log10(false), false);
        HoldingsService.add('blackHoleMass', addMass)
        HoldingsService.get('redParticles').pow(new Num(9, -1))
        HoldingsService.get('yellowParticles').pow(new Num(9, -1))
        HoldingsService.get('greenParticles').pow(new Num(9, -1))
        HoldingsService.get('blueParticles').pow(new Num(9, -1))
      }
      // @ts-ignore
      let buffer: Num = amount.pow(new Num(5, -1), false)
      GlobalMultipliersService.correct('purpleParticleGenerators', buffer);
      return buffer
    }},
}
