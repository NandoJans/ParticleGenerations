import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGenerator} from "../generators/red-generator";
import {Upgrade} from "../upgrade";
import {YellowStarChallenge} from "./yellow-star-challenge";

export class SunStarChallenge extends YellowStarChallenge {
  name: string = 'sun-star-challenge';
  displayName: string = 'Sun';

  baseGoal: Num = new Num(1, 5000);
  goal: Num = new Num(1, 5000);

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  getRewardDescription(): string {
    return "Yellow power also boosts red accelerator generation ^"+this.buffer.toString(2)+".";
  }
  getDescription(): string {
    return "The sun, somehow lacks acceleration. Maybe something else will help you.";
  }

  style: Styles = Styles.LALANDE;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 4100), this)
  ];

  reward(): undefined {
    GeneratorRecord.redGenerators.forEach((generator: RedGenerator) => {
      const effect: Num = generator.amount.pow(this.buffer).floor();
      generator.getUpgrades().forEach((upgrade: Upgrade) => {
        upgrade.amount = upgrade.amount.add(effect);
      })
    })
    return;
  }

  override constantNerfs() {
    // GeneratorRecord.redGenerators.forEach((generator: RedGenerator) => {
    //   generator.getUpgrades().forEach((upgrade: Upgrade) => {
    //     upgrade.bought = new Num(0, 0);
    //     upgrade.unlocked = false;
    //   })
    // })
  }

  nerfs(): void {
    GeneratorRecord.redGenerators.forEach((generator: RedGenerator) => {
      generator.getUpgrades().forEach((upgrade: Upgrade) => {
        upgrade.unlocked = false;
        this.applyRequirementNerf(upgrade)
      })
    })
  }

  init() {

  }
}
