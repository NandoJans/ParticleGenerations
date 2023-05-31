import {Num} from "../../../num";
import {HoldingsService} from "../../holdings.service";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {UpgradeService} from "../upgrade.service";
import {GeneratorService} from "../generator.service";
import {max} from "rxjs";

export const greenHoldings = {
  greenParticles: {amount: new Num(0, 0), effect: new Num(1, 0)},
  greens: {amount: new Num(0, 0), effect: new Num(1, 0)},
  greenEnergy: {amount: new Num(0, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = amount.log(new Num(0.8, 0), false).floor(false);
      return buffer.copy();
    }},
  greenSouls: {amount: new Num(0, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      if (!amount.greq(new Num(0, 0))) HoldingsService.set('greenSouls', new Num(0, 0))
      return amount
    }
  },
  darkEnergy: {amount: new Num(0, 0), effect: new Num(1, 0)},
  darkEnergySubtract: {amount: new Num(0, 0), effect: new Num(1, 0)},
  darkAgeMax: {amount: new Num(1, 110), effect: new Num(1, 0)},
  darkPower: {amount: new Num(0, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      // @ts-ignore
      if (HoldingsService.get('blues').greq(new Num(1, 2))) {
        // @ts-ignore
        let test = new Num(Math.floor(HoldingsService.get('yellowParticles').pow(new Num(0.07, 0), false).exp/110) , 0).add(new Num(0, 0), false);
        // @ts-ignore
        if (test.greq(amount)) {
          // @ts-ignore
          amount = test;
        }
      }
      let maxDarkPower = HoldingsService.get('maxDarkPower')
      if (amount.greq(maxDarkPower)) {
        amount = maxDarkPower.copy();
      }
      HoldingsService.set('darkPower', amount);
      // @ts-ignore
      let buffer: Num = GlobalMultipliersService.get('darkPowerPower').pow(amount, false);
      HoldingsService.set('darkEnergy', buffer);
      // @ts-ignore
      return buffer.copy();
    }
  },
  maxDarkPower: {amount: new Num(2, 2), effect: new Num(1, 0)},
  nuclearDecay: {amount: new Num(0, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      const redGeneratorBooster = UpgradeService.getUpgrade('red-generator-booster');
      // @ts-ignore
      let buffer: Num = amount.pow(new Num(1.5, -1).mul(GlobalMultipliersService.get('nuclearDecayPower'), false), false);
      // @ts-ignore
      redGeneratorBooster.buffer = redGeneratorBooster.buffer.mul(buffer, false);

      return buffer.copy();
    }
  },
  limitedUpgradeCount: {amount: new Num(1, 0), effect: new Num(1, 0),
    beforeAction: (amount: Num) => {
      if (!amount.greq(new Num(1, 1))) {
        GlobalMultipliersService.set('nuclearDecayGenerators', new Num(0, 0));
      }
      HoldingsService.set('limitedUpgradeCount', new Num(0, 0));
      return amount;
    }
  }
}
