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
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

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
  requirement: Requirement[] = [
    new Requirement(UpgradeRecord.unlockRedAccelerators, new Num(1, 0), this),
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_BOOSTER_ACCELERATION, this);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  stringRank: string = '1';
  style: Styles = Styles.RED;
  subNav: string = 'none';
  type: string = 'generator';
  redParticleEffect: Num = new Num(1, -2);

  protected override getGenerateAmount(): Num {
    let generate: Num = super.getGenerateAmount();

    let log = HoldingRecord.redParticles.amount
      .div(new Num(1, 75))
      .log(10);
    if (log.lt(new Num(1, 0))) {
      log = new Num(1, 0);

    }
    generate = generate.mul(log)

    generate = generate.mul(new Num(1, -2));

    if (generate.mantissa > 0 && generate.greq(new Num(1, -2))) {
      this.redParticleEffect = generate.copy();
      return generate
    } else {
      this.redParticleEffect = new Num(1, -2);
      return new Num(1, -2)
    }
  }

  override reset() {
    this.redParticleEffect = new Num(1, -2);
    super.reset();
  }

  override unlock(): void | { title: string; message: string } {
    this.redParticleEffect = new Num(1, -2);
    return super.unlock();
  }
}
