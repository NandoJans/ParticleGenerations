import {YellowStarChallenge} from "./yellow-star-challenge";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";

export class LalandeStarChallenge extends YellowStarChallenge {
  name: string = 'lalande-star-challenge';
  displayName: string = 'Lalande 21185';

  baseGoal: Num = new Num(1, 15000);
  goal: Num = new Num(1, 15000);

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(0.39, 0);
  override baseBuffer: Num = new Num(0.39, 0);

  getRewardDescription(): string {
    return "Every purchase of a red generator also adds 1 free amount to their sub-upgrades.";
  }
  getDescription(): string {
    return "Lalande 21185 lacks sub upgrades for red generators. They are no where to be found.";
  }

  style: Styles = Styles.LALANDE;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 3500), this)
  ];

  reward(): undefined {
    return;
  }

  override effectString(): string {
    if (this.effect) {
      return this.effect.toString(2)+"x" ?? "";
    }
    return "";
  }

  override constantNerfs() {

  }

  nerfs(): void {

  }
}
