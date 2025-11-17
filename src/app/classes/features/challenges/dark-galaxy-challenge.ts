import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {Challenge} from "../challenge";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";

export class DarkGalaxyChallenge extends Challenge {
    displayName: string = "Dark Galaxy Challenge";
    baseGoal: Num = new Num(1, 1000);
    goal: Num = new Num(1, 1000);

  override getCurrency(): Holding {
    return HoldingRecord.yellowParticles;
  }

    prestige: ResetKey = ResetKey.YELLOW
    prestigeLayer: string = 'green';

    nerfPower: Num = new Num(5, -1)

    override getRewardDescription(): string {
      return "Gather dark stars (1 per 1e1000 yellow particles)"
    }

    override getDescription(): string {
      return `In the dark galaxy, all multipliers are ^${this.nerfPower.toString(2)}`;
    }
    style: Styles = Styles.DARK_GALAXY;
    type: string = 'darkGalaxy';
    resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);

    override reward(): Num | undefined {
        return HoldingRecord.darkStarHolding.amount;
    }

    override nerfs(): void {
      // Install a global multiplier retrieval hook that applies the nerf power
      Multiplier.globalGetHook = (value: Num, _ctx) => value.pow(this.nerfPower);
    }

    override end(): void {
      super.end();
      // Clear global hook when leaving the challenge
      Multiplier.globalGetHook = undefined;
    }

    override tick(): void {
      super.tick();
      // Award dark stars for every 1e1000 yellow particles
      this.updateDarkStars();
    }

    private updateDarkStars(): void {
      const yellowParticles = HoldingRecord.yellowParticles.amount;
      const milestone = new Num(1, 1000);
      
      // Calculate how many dark stars should be earned based on yellow particles
      const darkStarsEarned = yellowParticles.div(milestone).floor();
      
      // Update dark star holding if we've earned more
      if (darkStarsEarned.gt(HoldingRecord.darkStarHolding.amount)) {
        HoldingRecord.darkStarHolding.amount = darkStarsEarned;
      }
    }

    requirement: Requirement[] = [];
    name: string = "dark-galaxy-challenge";

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.greenParticles, new Num(1, 2), this)
    ];
  }
}
