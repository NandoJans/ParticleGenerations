import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {Challenge} from "../challenge";
import {Holding} from "../holding";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {Multiplier} from "../multiplier";
import {PrestigeLayer} from "../prestiges/prestige-layer";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";

export class DarkGalaxyChallenge extends Challenge {
    displayName: string = "Dark Galaxy";
    baseGoal: Num = new Num(1, 1000);
    goal: Num = new Num(1, 1000);

    override getCurrency(): Holding {
      return HoldingRecord.redParticles;
    }

    prestige: ResetKey = ResetKey.YELLOW
    prestigeLayer: string = 'green';

    nerfPower: Num = new Num(5, -1)

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
      return HoldingRecord.darkStarHolding.amount;
    }

    override nerfs(): void {
      // Install a global multiplier retrieval hook that applies the nerf power
      Multiplier.globalGetHook = (value: Num, _ctx) => value.pow(this.nerfPower);
    }

    override end(): void {
      super.end();
      // Clear global hook when leaving the challenge
      this.awardDarkStars();
      Multiplier.globalGetHook = undefined;
    }

    private awardDarkStars(): void {
      // Update dark star holding if we've earned more
      if (this.currentDarkStarGain.gt(HoldingRecord.darkStarHolding.amount)) {
        HoldingRecord.darkStarHolding.amount.add(this.currentDarkStarGain);
      }
    }

  currentDarkStarGain: Num = new Num(0, 0);

  override constantNerfs() {
    // Dark star gain is calculated based on:
    // log10(log10(RP)) x log10(log10(RA)) x log10(log10(YP)) x log10(log10(YPow)) x log10(SK) / 10
    const rp = HoldingRecord.redParticles.amount.log10().log10().add(Num.ONE);
    const ra = HoldingRecord.redAccelerators.amount.log10().log10().add(Num.ONE);
    const yp = HoldingRecord.yellowParticles.amount.log10().log10().add(Num.ONE);
    const ypow = HoldingRecord.yellowPower.amount.log10().log10().add(Num.ONE);
    const sk = HoldingRecord.starKeys.amount.log10().add(Num.ONE);
    const gain = rp.mul(ra).mul(yp).mul(ypow).mul(sk).sub(Num.ONE).div(new Num(1, 1)).sub(HoldingRecord.darkStarHolding.amount);

    if (gain.gt(this.currentDarkStarGain)) {
      this.currentDarkStarGain = gain;
    }

    PrestigeLayersService.greenPrestigeLayer.customPrestigeButtonText = [
      'You are in the dark galaxy.',
      `Award ${this.currentDarkStarGain.toString(2)} Dark Stars`
    ]

    return true;
  }

  requirement: Requirement[] = [];
  name: string = "dark-galaxy-challenge";

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.greenParticles, new Num(1, 2), this)
    ];
  }
}
