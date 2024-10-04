import {Challenge} from "../challenge";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class DarkAgeChallenge extends Challenge {
  name: string = 'dark-age-challenge';
  displayName: string = 'Dark Age Challenge';

  goal: Num = new Num(1, 110);
  baseGoal: Num = new Num(1, 110);

  buffer: Num = new Num(3, 0);
  baseBuffer: Num = new Num(3, 0);

  currency: Holding = HoldingRecord.yellowParticles;
  prestige: ResetKey = ResetKey.YELLOW;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greenParticles, new Num(1, 10)),
  ];

  resetId: ResetKey = ResetKey.GREEN;
  style: Styles = Styles.GREEN;
  type: string = 'dark-age';

  getDescription(): string {
    return "All generator multipliers are raised to the power of 0.4";
  }

  getRewardDescription(): string {
    return "Dark energy gain is increased by "+this.buffer.toString()+"x";
  }

  nerfs(): void {

  }

  reward(): Num | undefined {
    return undefined;
  }

  override effectString(): string {
    return super.effectString()+"x";
  }
}
