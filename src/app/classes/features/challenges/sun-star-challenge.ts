import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {YellowStarChallenge} from "./yellow-star-challenge";
import {ChallengeHolding} from "./holdings/challenge-holding";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ChallengeGenerator} from "./generators/challenge-generator";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class SunStarChallenge extends YellowStarChallenge {
  name: string = 'sun-star-challenge';
  displayName: string = 'Sun';

  baseGoal: Num = new Num(1, 2600);
  goal: Num = new Num(1, 2600);

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  getRewardDescription(): string {
    return "Yellow power also boosts red accelerator generation ^"+this.buffer.toString(2)+".";
  }
  getDescription(): string {
    return "The sun, somehow lacks acceleration. Maybe something else will help you.";
  }

  style: Styles = Styles.SUN;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 8250), this)
  ];

  reward(): undefined {
    MultiplierRecord.redAcceleratorGenerators.correct(
      HoldingRecord.yellowPower.effect ?? new Num(1, 0)
    );
    return;
  }

  override constantNerfs() {
    HoldingRecord.redAccelerators.amount = new Num(1, 0);
    UpgradeRecord.unlockRedAccelerators.bought = new Num(0, 0);

    this.challengeGenerators['sunGenerator'].amount = new Num(1, 0);
    this.challengeGenerators['sunGenerator'].bought = new Num(1, 0);

    this.challengeGenerators['sunGenerator'].multiplier = HoldingRecord.yellowPower.amount.sqrt();

    const sunParticleEffect: Num = this.challengeHoldings['sunParticle'].amount.pow(new Num(3, 0)).floor();
    this.challengeHoldings['sunParticle'].effect = sunParticleEffect;
    MultiplierRecord.redParticleGenerators.correct(sunParticleEffect);
  }

  nerfs(): void {
    UpgradeRecord.unlockRedAccelerators.unlocked = false;
    this.applyRequirementNerf(UpgradeRecord.unlockRedAccelerators);
  }

  init() {
    this.challengeHoldings = {
      sunParticle: new ChallengeHolding(
        'sunParticle',
        'Sun Particle',
        'LP',
        new Num(1, 0),
        new Num(1, 0),
        this.style,
      ),
    }

    this.challengeHoldings['sunParticle'].setHoldingDisplay(
      HoldingDisplayFactory.start(this.challengeHoldings['sunParticle'])
        .withAmountPrefix('You have ')
        .withAmountSuffix(' Sun Particles')
        .withEffectPrefix('They multiply red generators by ')
        .withEffectSuffix('')
        .addLine('Their generation is boosted by yellow power', () => {}, '')
        .build()
    )

    this.challengeGenerators = {
      sunGenerator: new ChallengeGenerator(
        'sunGenerator',
        'sun-generator',
        'Sun Generator',
        this.challengeHoldings['sunParticle'],
        new Num(1, 0),
        'sun-generator',
        this.style,
        'yellow',
        'yellowStars',
        new Num(1, 0),
        new Num(1, 0),
        HoldingRecord.redParticles
      )
    }

    this.challengeGenerators['sunGenerator'].hidden = true;

    this.challengeUpgrades = {

    }
  }
}
