import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {BlackHoleService} from "../../../services/black-hole.service";
import {HoldingsService} from "../../../services/holdings.service";
import {App} from "../../../App";

export class BlackHoleMassHolding extends Holding {
  name = 'blackHoleMass'
  abbreviation = 'BHM'
  amount: Num = new Num(1, 0);
  startAmount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Black Hole Mass')
    .build()

  override action(): Num | undefined {
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
      addMass.mul(App.getSpeed())
      HoldingsService.add('blackHoleMass', addMass)
    }
    return undefined;
  }

  getStyle(): Styles {
    return Styles.PURPLE;
  }

}
