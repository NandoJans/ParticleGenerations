import {YellowChallenge} from "./yellow-challenge";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class FirstYellowChallenge extends YellowChallenge {
  name: string = 'yellow-challenge-1';
  displayName: string = 'Yellow Challenge 1';

  baseGoal: Num = new Num(1, 1100);
  goal: Num = new Num(1, 1100);

  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowParticles, new Num(1, 5))
  ];

  reward(): Num {
    const effect: Num = UpgradeRecord.redGeneratorBooster.effect || new Num(1, 0);
    let buff: Num = effect.add(new Num(1, 0), false).pow(new Num(2, 0), false);

    if (buff.greq(new Num(1, 1000))) {
      const tempBuff: Num = buff.pow(new Num(1, -1), false);
      tempBuff.mul(new Num(1, 1000));
      buff = tempBuff;
    }

    MultiplierRecord.redAcceleratorGenerators.correct(buff)

    return buff;
  }

  nerfs(): void {
    UpgradeRecord.redGeneratorExtension.disabled = true;
  }

  getRewardDescription(): string {
    return "Gain a multiplier to red accelerators based on red generator boosts.";
  }

  getDescription(): string {
    return "Red Particles without the red generator booster.";
  }

}
