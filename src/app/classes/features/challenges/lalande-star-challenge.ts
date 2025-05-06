import {YellowStarChallenge} from "./yellow-star-challenge";
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

export class LalandeStarChallenge extends YellowStarChallenge {
  name: string = 'lalande-star-challenge';
  displayName: string = 'Lalande 21185';

  baseGoal: Num = new Num(1, 2750);
  goal: Num = new Num(1, 2750);

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(0.39, 0);
  override baseBuffer: Num = new Num(0.39, 0);

  getRewardDescription(): string {
    return "Every purchase of a red generator also adds free amount to their sub-upgrades by raising their amount to ^"+this.buffer.toString(2)+".";
  }
  getDescription(): string {
    return "Lalande 21185 lacks sub upgrades for red generators. They are no where to be found.";
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
