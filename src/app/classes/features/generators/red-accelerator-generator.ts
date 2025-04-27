import {Generator} from "../generator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {Generatable} from "../interfaces/generatable";
import {Multiplier} from "../multiplier";
import {ResetKey} from "../../enums/reset-key";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export class RedAcceleratorGenerator extends Generator {
  baseCost: Num = new Num(1, 1e100);
  baseMultiplier: Num = new Num(1, 1);
  cost: Num = new Num(1, 1e100);
  currency: Holding = HoldingRecord.redParticles;
  displayName: string = 'Red Accelerator Generator';
  generates: Generatable = HoldingRecord.redAccelerators;
  globalMultiplier: Multiplier = MultiplierRecord.redAcceleratorGenerators;
  increase: Num = new Num(1, 0);
  name: string = 'redAcceleratorGenerator';
  nav: string = 'none';
  rank: number = 1;
  requirement: Requirement[] = [];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_BOOSTER_ACCELERATION, this);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  stringRank: string = '1';
  style: Styles = Styles.RED;
  subNav: string = 'none';
  type: string = 'generator';
  logEffect: Num = new Num(1, 1);
  redParticleEffect: Num = new Num(1, -2);

  protected override getGenerateAmount(): Num {
    let generate: Num = super.getGenerateAmount();

    const log = HoldingRecord.redParticles.amount
      .sub(new Num(1, 75))
      .log(this.logEffect);
    generate = generate.mul(log)
    generate = generate.mul(new Num(1, -2));

    if (generate.greq(new Num(1, 0))) {
      this.redParticleEffect = generate.copy();
      return generate
    } else {
      return new Num(1, 0)
    }
  }
}
