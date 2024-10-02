import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {AcceleratorGeneratorRecord} from "../../records/generators/accelerator-generator-record";
import {AcceleratorUpgradeRecord} from "../../records/upgrades/accelerator-upgrade-record";
import {YellowChallenge} from "./yellow-challenge";
import {RedGeneratorUpgradeRecord} from "../../records/upgrades/red-generator-upgrade-record";
import {RedUpgradeRecord} from "../../records/upgrades/red-upgrade-record";
import {YellowUpgradeRecord} from "../../records/upgrades/yellow-upgrade-record";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class ThirdYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-3';
  displayName: string = 'Yellow Challenge 3';

  baseGoal: Num = new Num(1, 1250);
  goal: Num = new Num(1, 1250);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 11))
  ];

  override maxEffect: Num = new Num(1, 10);

  reward(): Num {
    let buff: Num = GeneratorRecord.fifthRedGenerator.amount.pow(new Num(4, 0), false)
    if (buff.greq(this.maxEffect)) {
      buff = this.maxEffect.copy();
    }
    GlobalMultipliersService.correct('yellowParticleGenerators', buff)
    return buff;
  }

  nerfs(): void {
    HoldingRecord.redAccelerators.set(new Num(1, 0));
    this.getGameElementHelper().disableElements([
      ...AcceleratorGeneratorRecord.list,
      ...AcceleratorUpgradeRecord.list,
      ...RedGeneratorUpgradeRecord.list,
      ...RedUpgradeRecord.list,
      ...YellowUpgradeRecord.list
    ]);
  }

  getRewardDescription(): string {
    return "Yellow generators are multiplied by the amount of fifth red generators.";
  }

  getDescription(): string {
    return "Red Particles while only having red and yellow generators.";
  }

  override effectString(): string {
    return this.reward()+"x";
  }
}
