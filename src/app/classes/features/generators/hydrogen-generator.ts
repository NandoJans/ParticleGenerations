import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {Generator} from "../generator";

export class HydrogenGenerator extends Generator {
  name: string = "hydrogen-generator";
  displayName: string = 'Hydrogen Generator';

  baseMultiplier: Num = new Num(5, 0);
  type: string = "hydrogen-generator";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  softResetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  style: Styles = Styles.YELLOW;
  nav: string = "yellow";
  subNav: string = "yellowFusion";
  globalMultiplier: Multiplier = MultiplierRecord.hydrogenGenerators
  stringRank: string = "1";
  rank: number = 1;
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  increase: Num = new Num(1, 0);
  startIncrease: Num = new Num(1, 0);
  override amount: Num = new Num(1, 0);
  override bought: Num = new Num(1, 0);
  currency: Holding = HoldingRecord.yellowFusion;
  requirement: Requirement[] = [];

  barrier: Num = new Num(5, 3);

  speed: Num = new Num(1, -1);

  override run(speed: Num): any {
    this.speed = speed;
    return super.run(speed);
  }

  protected override getGenerateAmount(): Num {
    let amount: Num = super.getGenerateAmount();

    const speed   = this.speed;           // e.g. 0.1 (Num)
    const barrier = this.barrier;         // e.g. 5000 (Num)
    const hydrogen = HoldingRecord.hydrogen.amount;

    // 1) Raw effective gain this tick
    let gain = amount.mul(speed);
    if (gain.mantissa === 0) {
      return amount;
    }

    // 2) DYNAMIC HARD CAP based on power-transform
    //    cap = barrier * (gain / barrier)^p  (only if gain > barrier)
    const one = Num.ONE;
    const p = 0.05; // tuning: 0.3 ≈ 1e6→~24k, 1e7→~49k at barrier=5000

    if (gain.gt(barrier)) {
      const ratio = gain.div(barrier);      // >= 1
      const ratioPow = ratio.pow(p);        // (gain/barrier)^p
      const dynCap = barrier.mul(ratioPow); // dynamic cap

      if (gain.gt(dynCap)) {
        gain = dynCap;
      }
    }

    // 3) Per-barrier-halving: gain / 2^(hydrogen/barrier)
    const depth = hydrogen.div(barrier);        // hydrogen / barrier
    const exponent = depth.toNumber();          // normally small enough
    const factor = Num.TWO.pow(exponent);       // 2^(hydrogen/barrier)

    const softGain = gain.div(factor);

    // 4) Back to pre-speed space
    return softGain.div(speed);
  }

  override init() {
    this.generates = HoldingRecord.hydrogen;
  }
}
