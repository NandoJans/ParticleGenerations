import {Holding} from "../holding";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {HoldingDisplay} from "../../displays/holding-display";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

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

  buffed: boolean = false;

  override action(): Num {
    let buffer: Num = (this.buffed)
      ? this.amount.pow(new Num(1.5, 0), false)
      : this.amount.div(new Num(1, 3), false).add(new Num(1, 0), false);
    MultiplierRecord.redParticleGenerators.correct(buffer);
    return buffer.copy();
  }

  getStyle(): Styles {
    return Styles.RED;
  }
}
