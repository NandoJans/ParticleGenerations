import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";
import {HoldingsService} from "../../../services/holdings.service";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";

export class DarkPowerHolding extends Holding {
  name: string = 'darkPower';
  abbreviation: string = 'DP';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Dark Power')
    .build();

  override action(): Num | undefined {
    // @ts-ignore
    let amount = this.amount;
    if (HoldingsService.get('blues').greq(new Num(1, 2))) {
      // @ts-ignore
      let test = new Num(Math.floor(HoldingsService.get('yellowParticles').pow(new Num(0.07, 0), false).exp / 110), 0).add(new Num(0, 0), false);
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

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
