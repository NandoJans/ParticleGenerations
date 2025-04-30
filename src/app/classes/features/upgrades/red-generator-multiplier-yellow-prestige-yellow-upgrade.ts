import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedGeneratorMultiplierYellowPrestigeYellowUpgrade extends YellowUpgrade {
  constructor(saveName: string) {
    super(saveName, 'red-generator-multiplier-yellow-prestige-yellow');
  }
  displayName: string = 'Yellow Prestige Boost';

  override buffer: Num = new Num(0.25, 0);
  override baseBuffer: Num = new Num(0.25, 0);

  getDescription(): string {
    return "Every yellow prestige gives red generators a " + this.buffer.toString(2) + "x multiplier";
  }
  action(): Num {
    if (this.hasBought()) {
      const effect: Num = this.buffer.mul(HoldingRecord.yellowPrestiges.amount).add(new Num(1, 0));
      MultiplierRecord.redParticleGenerators.correct(effect);
      return effect;
    }
    return new Num(1, 0);
  }

  limit: Num = new Num(1, 0);
  baseCost: Num = new Num(3, 0);
  cost: Num = new Num(3, 0);
}
