import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
import { Holding } from "../holding";
import { Requirement } from "../interfaces/requirement";
import {YellowStarChallenge} from "./yellow-star-challenge";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {AutomatorRecord} from "../../records/automators/automator-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class ProximaCentauriStarChallenge extends YellowStarChallenge {
  name: string = 'proxima-centauri-star-challenge';
  displayName: string = 'Proxima Centauri';

  baseGoal: Num = new Num(1, 6000);
  goal: Num = new Num(1, 6000);

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(0.12, 0);
  override baseBuffer: Num = new Num(0.12, 0);

  getRewardDescription(): string {
    return "Yellow generators multiplied based on yellow particles by raising them to ^"+this.buffer.toString(2);
  }
  getDescription(): string {
    return "Proxixa Centauri Star hides its red generators across its solar system. availables: " +
      "Second generators are available at 1e35 red particles" +
      ", third generators are available at 1e70 red accelerators"
  }

  style: Styles = Styles.PROXIMA_CENTAURI;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 3), this)
  ];

  reward(): Num {
    const effect = HoldingRecord.yellowParticles.amount.pow(this.buffer);
    MultiplierRecord.yellowGenerators.correct(effect);
    return effect;
  }

  override effectString(): string {
    if (this.effect) {
      return this.effect.toString(2)+"x" ?? "";
    }
    return "";
  }

  nerfs(): void {
    GeneratorRecord.secondRedGenerator.unlocked = false;
    GeneratorRecord.thirdRedGenerator.unlocked = false;
    GeneratorRecord.fourthRedGenerator.unlocked = false;
    GeneratorRecord.fifthRedGenerator.unlocked = false;

    this.applyRequirementNerf(GeneratorRecord.secondRedGenerator, {
      require: HoldingRecord.redParticles, amount: new Num(1, 35)
    })
    this.applyRequirementNerf(GeneratorRecord.thirdRedGenerator, {
      require: HoldingRecord.redAccelerators, amount: new Num(1, 70)
    })
    this.applyRequirementNerf(GeneratorRecord.fourthRedGenerator, {
      require: HoldingRecord.redParticles, amount: new Num(1, 2250)
    })
    this.applyRequirementNerf(GeneratorRecord.fifthRedGenerator, {
      require: HoldingRecord.redAccelerators, amount: new Num(1, 4000)
    })
  }
}
