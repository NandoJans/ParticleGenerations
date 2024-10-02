import {YellowChallenge} from "./yellow-challenge";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {RedGeneratorUpgradeRecord} from "../../records/upgrades/red-generator-upgrade-record";
import {RedUpgradeRecord} from "../../records/upgrades/red-upgrade-record";
import {YellowUpgradeRecord} from "../../records/upgrades/yellow-upgrade-record";
import {YellowGeneratorRecord} from "../../records/generators/yellow-generator-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {AcceleratorGeneratorRecord} from "../../records/generators/accelerator-generator-record";
import {AcceleratorUpgradeRecord} from "../../records/upgrades/accelerator-upgrade-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {RedGeneratorRecord} from "../../records/generators/red-generator-record";

export class FifthYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-4';
  displayName: string = 'Yellow Challenge 4';

  baseGoal: Num = new Num(1, 1750);
  goal: Num = new Num(1, 1750);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 15))
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
    return "Red accelerators gain a multiplier based on yellow power.";
  }

  getDescription(): string {
    return "Red Particles while only having red generators, but red accelerators are insanely powerful.";
  }

  override effectString(): string {
    return this.reward()+"x";
  }
}
