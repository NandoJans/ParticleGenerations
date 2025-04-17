import {Upgrade} from "../upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class GreenParticleMultiplierUpgrade extends Upgrade {
  baseCost: Num = new Num(5, 0);
  bought: Num = new Num(0, 0);
  cost: Num = new Num(5, 0);
  currency: Holding = HoldingRecord.greenParticles;
  displayName: string = "Multiply particles by 2";
  increase: Num = new Num(1, 1);
  name: string = "green-particle-multiplier";
  nav: string = "green";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greens, new Num(1, 0))
  ];
  resetId: ResetKey = ResetKey.GREEN;
  style: Styles = Styles.GREEN_STYLE;
  subNav: string = "greenGenerators";
  type: string = "green-upgrade";

  action(): Num | undefined {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.greenParticlesGain.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Multiply green particles by ${this.baseBuffer.toString()}x`;
  }

}
