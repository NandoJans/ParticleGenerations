import {YellowChallenge} from "./yellow-challenge";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {AcceleratorGeneratorRecord} from "../../records/generators/accelerator-generator-record";
import {AcceleratorUpgradeRecord} from "../../records/upgrades/accelerator-upgrade-record";

export class SecondYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-2';
  displayName: string = 'Yellow Challenge 2';

  baseGoal: Num = new Num(1, 1350);
  goal: Num = new Num(1, 1350);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 8))
  ];

  reward(): undefined {
    GeneratorRecord.secondAcceleratorGenerator.unlocked = true;
    return undefined;
  }

  nerfs(): void {
    HoldingRecord.redAccelerators.set(new Num(1, 0));
    this.getGameElementHelper().disableElements([
      ...AcceleratorGeneratorRecord.list,
      ...AcceleratorUpgradeRecord.list
    ]);
  }

  getRewardDescription(): string {
    return "Gain an extra red accelerator generator.";
  }

  getDescription(): string {
    return "Red Particles without any red accelerators.";
  }
}
