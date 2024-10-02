import {YellowChallenge} from "./yellow-challenge";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {YellowGeneratorRecord} from "../../records/generators/yellow-generator-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGeneratorRecord} from "../../records/generators/red-generator-record";

export class FifthYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-5';
  displayName: string = 'Yellow Challenge 5';

  baseGoal: Num = new Num(1, 3000);
  goal: Num = new Num(1, 3000);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 23))
  ];

  reward(): Num {
    let buff: Num = GeneratorRecord.firstRedGenerator.amount.pow(new Num(2, -2), false);
    if (buff.greq(new Num(1, 37500))) {
      // @ts-ignore
      const tempBuff: Num = buff.pow(new Num(1, -1), false);
      tempBuff.mul(new Num(1, 37500));
      buff = tempBuff;
    }
    MultiplierRecord.redParticleGenerators.correct(buff)
    return buff;
  }

  nerfs(): void {
    ([
      ...RedGeneratorRecord.list,
      ...YellowGeneratorRecord.list,
    ]).forEach((element) => {
      element.increase = element.increase.pow(new Num(1, 1));
    })
  }

  getRewardDescription(): string {
    return "First red generators boost the other generators.";
  }

  getDescription(): string {
    return "Red Particles when generators won't multiply themselves.";
  }

  override effectString(): string {
    return this.reward()+"x";
  }
}
