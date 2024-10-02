import {YellowChallenge} from "./yellow-challenge";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {RedUpgradeRecord} from "../../records/upgrades/red-upgrade-record";
import {RedGeneratorUpgradeRecord} from "../../records/upgrades/red-generator-upgrade-record";
import {YellowUpgradeRecord} from "../../records/upgrades/yellow-upgrade-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class SeventhYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-7';
  displayName: string = 'Yellow Challenge 7';

  baseGoal: Num = new Num(1, 15000);
  goal: Num = new Num(1, 15000);

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
    this.getGameElementHelper().disableElements([
      ...RedUpgradeRecord.list,
      ...RedGeneratorUpgradeRecord.list,
      ...YellowUpgradeRecord.list,
    ])
    UpgradeRecord.accelerateYellowFusion.buffer = new Num(1.05, 0);
    UpgradeRecord.increaseYellowFusion.buffer = new Num(1.075, 0);
  }

  getRewardDescription(): string {
    return "Gain a multiplier on red generators based on yellow fusion.";
  }

  getDescription(): string {
    return "Red Particles with only generators, accelerators and reduced fusion";
  }

  override effectString(): string {
    return this.reward()+"x";
  }
}
