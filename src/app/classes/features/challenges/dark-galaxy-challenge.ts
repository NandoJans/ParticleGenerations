import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {Challenge} from "../challenge";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";

export class DarkGalaxyChallenge extends Challenge {
    displayName: string = "Dark Galaxy Challenge";
    baseGoal: Num = new Num(1, 1000);
    goal: Num = new Num(1, 1000);

  override getCurrency(): Holding {
    return HoldingRecord.yellowParticles;
  }

    prestige: ResetKey = ResetKey.YELLOW
    prestigeLayer: string = 'green';

    nerfPower: Num = new Num(1, -1)

    override getRewardDescription(): string {
      return "Gather dark stars"
    }

    override getDescription(): string {
      return `In the dark galaxy, all multipliers are ^${this.nerfPower.toString(2)}`;
    }
    style: Styles = Styles.DARK_GALAXY;
    type: string = 'darkGalaxy';
    resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
    override reward(): Num | undefined {
        throw new Error("Method not implemented.");
    }
    override nerfs(): void {
        throw new Error("Method not implemented.");
    }
    requirement: Requirement[] = [];
    name: string = "dark-galaxy-challenge";

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.greenParticles, new Num(1, 2), this)
    ];
  }
}
