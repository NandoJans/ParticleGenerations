import {Num} from "../../../num";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {HoldingsService} from "../../holdings.service";


export const yellowHoldings = {
  yellowParticles: {amount: new Num(0, 0), effect: new Num(1, 0)},
  yellows: {amount: new Num(0, 0), effect: new Num(1, 0)},
  yellowPower: {amount: new Num(0, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = new Num(1, 0);
      if (amount.greq(new Num(1, 0))) {
        // @ts-ignore
        buffer = amount.pow(GlobalMultipliersService.get('yellowPowerPower'), false).add(new Num(1, 0), false);
      }
      GlobalMultipliersService.correct('redParticleGenerators', buffer);
      return buffer.copy();
    }},
  yellowFusion: {amount: new Num(1, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = amount.pow(HoldingsService.get('yellowFusionPower'), false).add(new Num(1, 0), false);
      if (amount.num < 1) HoldingsService.get('yellowFusion').num = 1;
      GlobalMultipliersService.correct('yellowParticleGenerators', buffer);
      return buffer.copy();
    }},
  yellowFusionMax: {amount: new Num(1, 110), effect: new Num(1, 0)},
  yellowFusionPower: {amount: new Num(2, -1), effect: new Num(1, 0)},
}
