import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {AcceleratorGeneratorRecord} from "../../records/generators/accelerator-generator-record";
import {AcceleratorUpgradeRecord} from "../../records/upgrades/accelerator-upgrade-record";
import {RedGeneratorUpgradeRecord} from "../../records/upgrades/red-generator-upgrade-record";
import {RedUpgradeRecord} from "../../records/upgrades/red-upgrade-record";
import {YellowUpgradeRecord} from "../../records/upgrades/yellow-upgrade-record";
import { YellowChallenge } from "./yellow-challenge";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {YellowGeneratorRecord} from "../../records/generators/yellow-generator-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class FourthYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-4';
  displayName: string = 'Yellow Challenge 4';

  baseGoal: Num = new Num(1, 1750);
  goal: Num = new Num(1, 1750);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 15))
  ];

  reward(): Num {
    let buff: Num = HoldingRecord.yellowPower.amount.add(new Num(1, 0), false);
    if (buff.greq(new Num(1, 37500))) {
      // @ts-ignore
      const tempBuff: Num = buff.pow(new Num(1, -1), false);
      tempBuff.mul(new Num(1, 37500));
      buff = tempBuff;
    }
    MultiplierRecord.redAcceleratorGenerators.correct(buff)
    return buff;
  }

  nerfs(): void {
    HoldingRecord.yellowPower.set(new Num(0, 0));
    this.getGameElementHelper().disableElements([
      ...RedGeneratorUpgradeRecord.list,
      ...RedUpgradeRecord.list,
      ...YellowUpgradeRecord.list,
      ...YellowGeneratorRecord.list,
    ]);

    GeneratorRecord.secondAcceleratorGenerator.baseCost = new Num(1, 16);

    GeneratorRecord.firstAcceleratorGenerator.baseMultiplier = new Num(1, 2);
    GeneratorRecord.firstAcceleratorGenerator.baseMultiplier = new Num(1, 3);

    ([
      ...AcceleratorGeneratorRecord.list,
      ...AcceleratorUpgradeRecord.list,
    ]).forEach((element) => {
      element.scaling = element.scaling.pow(new Num(1, 1));
    })

    UpgradeRecord.firstRedAcceleratorMultiplier.buffer = new Num(1, 3);
    UpgradeRecord.secondRedAcceleratorMultiplier.buffer = new Num(1, 4);
    UpgradeRecord.thirdRedAcceleratorMultiplier.buffer = new Num(1, 5);

    UpgradeRecord.firstRedAcceleratorMultiplier.baseCost = new Num(1, 8);
    UpgradeRecord.secondRedAcceleratorMultiplier.baseCost = new Num(1, 70);
    UpgradeRecord.thirdRedAcceleratorMultiplier.baseCost = new Num(1, 152);

    if (!HoldingRecord.redAccelerators.amount.greq(new Num(1, 0))) {
      HoldingRecord.redAccelerators.set(new Num(1, 0));
    }

    if (HoldingRecord.greens.amount.greq(new Num(1, 0))) {
      MultiplierRecord.redAcceleratorGenerators.correct(HoldingRecord.greens.amount);
    }

    if (!HoldingRecord.greens.amount.greq(new Num(1, 0)) && !HoldingRecord.purples.amount.greq(new Num(2, 0))) {

    }
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
