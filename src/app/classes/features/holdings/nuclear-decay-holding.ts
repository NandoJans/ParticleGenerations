import {Holding} from "../holding";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../displays/holding-display";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {Styles} from "../../enums/styles";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";

export class NuclearDecayHolding extends Holding {
  name: string = 'nuclearDecay';
  abbreviation: string = 'ND';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Nuclear Decay')
    .build();

  override action(): Num | undefined {
    const redGeneratorBooster = UpgradeService.getUpgrade('red-generator-booster');
    // @ts-ignore
    let buffer: Num = amount.pow(new Num(3, -1).mul(GlobalMultipliersService.get('nuclearDecayPower'), false), false);
    // @ts-ignore
    redGeneratorBooster.buffer = redGeneratorBooster.buffer.mul(buffer, false);

    return buffer.copy();
  }

  getStyle(): Styles {
    return Styles.GREEN;
  }
}
