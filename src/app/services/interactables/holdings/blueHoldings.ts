import {Num} from "../../../num";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {HoldingsService} from "../../holdings.service";
import { UpgradeService } from "../upgrade.service";
import {GeneratorService} from "../generator.service";

export const blueHoldings = {
  blueParticles: {amount: new Num(0, 0), effect: new Num(1, 0)},
  blues: {amount: new Num(0, 0), effect: new Num(1, 0)},
  blueNeutrons: {amount: new Num(0, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = amount.pow(new Num(5, 0).mul(GlobalMultipliersService.get('blueNeutronPower'), false), false);

      GeneratorService.setValues('red-particles', 'baseMulMod', buffer);

      return buffer.copy();
    }},
  blueLight: {amount: new Num(0, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = amount.pow(new Num(1, -1).mul(GlobalMultipliersService.get('blueLightPower'), false), false);

      if (HoldingsService.get('blues').greq(new Num(1, 0))) {
        GlobalMultipliersService.correct('greenParticleGenerators', buffer);
      }

      return buffer.copy();
    }},
  blueHydrogen: {amount: new Num(1, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = amount.pow(new Num(5, 0), false).div(amount.mul(amount.log10(false), false).add(new Num(1, 0), false), false).add(new Num(1, 0), false);

      GlobalMultipliersService.correct('blueLightGenerators', buffer);

      return buffer.copy();
    }},
}
