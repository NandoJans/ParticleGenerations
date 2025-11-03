import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class RedGeneratorMultiplierYellowPrestigeYellowUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'red-generator-multiplier-yellow-prestige-yellow');
  }
  displayName: string = 'Yellow Prestige Boost';

  override buffer: Num = new Num(0.25, 0);
  override baseBuffer: Num = new Num(0.25, 0);

  getDescription(): string {
    if (UpgradeRecord.ultraYellowPrestigeBoostStarKey.hasBought()) {
      return `Every yellow prestige multiplies red generators by ${UpgradeRecord.ultraYellowPrestigeBoostStarKey.buffer.toString(2)}x`
    } else {
      return "Every yellow prestige gives red generators a " + this.buffer.toString(2) + "x multiplier";
    }
  }
  action(): Num {
    if (this.hasBought()) {
      if (UpgradeRecord.ultraYellowPrestigeBoostStarKey.hasBought()) {
        const effect = this.handleCap(UpgradeRecord.ultraYellowPrestigeBoostStarKey.buffer.pow(HoldingRecord.yellowPrestiges.amount));
        MultiplierRecord.redParticleGenerators.correct(effect);
        return effect
      } else {
        const effect: Num = this.buffer.mul(HoldingRecord.yellowPrestiges.amount).add(new Num(1, 0));
        MultiplierRecord.redParticleGenerators.correct(effect);
        return effect;
      }
    }
    return new Num(1, 0);
  }

  private handleCap(num: Num): Num {
    // When the effect reaches above 1e10,000x, there should be a slowdown to prevent infinite multiplier
    const cap = new Num(1, 10_000);
    if (num.greq(cap)) {
      return num.div(cap).pow(0.1).mul(cap);
    }
    return num;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(3, 0);
  cost: Num = new Num(3, 0);
}
