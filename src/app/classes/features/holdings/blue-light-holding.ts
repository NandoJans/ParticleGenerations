import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {HoldingsService} from "../../../services/holdings.service";
import {Styles} from "../../enums/styles";

export class BlueLightHolding extends Holding {
  name = 'blueLight';
  abbreviation: string = 'BL';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Blue Light')
    .withEffectPrefix('Green Particle Generators are')
    .withEffectSuffix('more effective')
    .build();

  override action(): Num {
    // @ts-ignore
    let buffer: Num = amount.pow(new Num(1, -1).mul(GlobalMultipliersService.get('blueLightPower'), false), false);

    if (HoldingsService.get('blues').greq(new Num(1, 0))) {
      GlobalMultipliersService.correct('greenParticleGenerators', buffer);
    }

    return buffer;
  }

  getStyle(): Styles {
    return Styles.BLUE;
  }
}
