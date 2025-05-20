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
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class LalandeStarChallenge extends YellowStarChallenge {
  name: string = 'lalande-star-challenge';
  displayName: string = 'Lalande 21185';

  baseGoal: Num = new Num(1, 2700);
  goal: Num = new Num(1, 2700);
  override goalIncrease: Num[] = [
    new Num(1, 3300),
    new Num(1, 4300),
    new Num(1, 4300),
    new Num(1, 4300),
  ];
  override difficultyIncrease: Num[] = [
    new Num(1, 0),
    new Num(2, 0),
    new Num(1.7, 0),
  ];

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);
  override completionBuffer: Num = new Num(1.02, 0);

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
      const effect: Num = generator.bought.pow(this.buffer).floor();
      generator.getUpgrades().forEach((upgrade: Upgrade) => {
        upgrade.amount = upgrade.amount.add(effect);
      })
    })
    return;
  }

  override constantNerfs() {
    UpgradeRecord.unlockRedAccelerators.bought = new Num(1, 0);
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
