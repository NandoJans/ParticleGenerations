import {YellowChallenge} from "./yellow-challenge";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class SixthYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-6';
  displayName: string = 'Yellow Challenge 6';

  baseGoal: Num = new Num(1, 1150);
  goal: Num = new Num(1, 1150);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 29))
  ];

  reward(): undefined {
    UpgradeRecord.redAcceleratorParticleBased.action = () => {
      const buff = HoldingRecord.redParticles.amount.pow(new Num(1, -2), false);
      MultiplierRecord.redAcceleratorGenerators.correct(buff);
      return buff;
    }
    return undefined
  }

  nerfs(): void {
    this.getGameElementHelper().disableElements([
      GeneratorRecord.secondRedGenerator,
      GeneratorRecord.thirdRedGenerator,
      GeneratorRecord.fourthRedGenerator,
      GeneratorRecord.fifthRedGenerator,
    ])
  }

  getRewardDescription(): string {
    return "The Accelerator Particles upgrade is a lot more powerful.";
  }

  getDescription(): string {
    return "Red Particles without red generators 2-5.";
  }
}
