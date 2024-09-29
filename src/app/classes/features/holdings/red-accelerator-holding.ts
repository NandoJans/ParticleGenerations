import {Holding} from "../holding";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {HoldingDisplay} from "../../displays/holding-display";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";

export class RedAcceleratorHolding extends Holding {
  name = 'redAccelerators';
  abbreviation = 'RA';
  amount = new Num(1, 1);
  override effect = new Num(1, 0);
  startAmount: Num = new Num(1, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Red Accelerators')
    .withEffectPrefix('They multiply Red Particle Generators by')
    .build();

  override action(): Num {
    // @ts-ignore
    let buffer: Num = (UpgradeService.getValue('red-accelerator-buffer', 'bought').greq(new Num(1, 0))) ? amount.pow(new Num(1.5, 0), false) : amount.div(new Num(1, 3), false).add(new Num(1, 0), false);
    GlobalMultipliersService.correct('redParticleGenerators', buffer)
    return buffer.copy();
  }

  getStyle(): Styles {
    return Styles.RED;
  }
}
