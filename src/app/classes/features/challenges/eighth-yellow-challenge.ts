import {YellowChallenge} from "./yellow-challenge";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class EighthYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-8';
  displayName: string = 'Yellow Challenge 8';

  baseGoal: Num = new Num(1, 5500);
  goal: Num = new Num(1, 5500);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 70))
  ];


  reward(): Num {
    const buff: Num = HoldingRecord.yellowFusion.amount
      .add(new Num(1, 0), false)
      .pow(new Num(5, -1), false);
    MultiplierRecord.redAcceleratorGenerators.correct(buff);
    return buff
  }

  nerfs(): void {
    GeneratorRecord.firstYellowGenerator.generates = GeneratorRecord.secondAcceleratorGenerator;
    UpgradeRecord.accelerateYellowFusion.buffer = new Num(1.05, 0);
    UpgradeRecord.increaseYellowFusion.buffer = new Num(1.075, 0);
  }

  getRewardDescription(): string {
    return "Make yellow fusion much more powerful.";
  }

  getDescription(): string {
    return "Red Particles when yellow generators generate second red accelerator generators.";
  }

  override effectString(): string {
    return this.reward()+"x";
  }
}
