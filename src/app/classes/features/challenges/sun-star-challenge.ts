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
import {MultiplierChallengeUpgrade} from "./upgrades/multiplier-challenge-upgrade";
import {CustomChallengeUpgrade} from "./upgrades/custom-challenge-upgrade";

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

  private sunParticleGeneration: Num = new Num(1, 0);

  override constantNerfs() {
    HoldingRecord.redAccelerators.amount = new Num(1, 0);
    UpgradeRecord.unlockRedAccelerators.bought = new Num(0, 0);

    this.challengeGenerators['sunGenerator'].amount = new Num(1, 0);
    this.challengeGenerators['sunGenerator'].bought = new Num(1, 0);

    const resetUpgradePower = this.challengeUpgrades['strongerSunParticleEffect'].buffer
      .pow(this.challengeUpgrades['strongerSunParticleEffect'].amount);

    this.sunParticleGeneration = HoldingRecord.redParticles.amount.pow(new Num(1, -3))
      .mul(this.challengeGenerators['sunGenerator'].globalMultiplier.getNum());
    this.challengeGenerators['sunGenerator'].multiplier = this.sunParticleGeneration;
    // this.challengeHoldings['sunParticle'].amount = new Num(1, 8);
    const sunParticleEffect: Num = this.challengeHoldings['sunParticle'].amount.pow(new Num(3, 0).mul(resetUpgradePower)).floor();
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
        'SP',
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
        .addLine('Their generation is boosted by Red Particles', () => {
          return this.sunParticleGeneration.toString(2) + "x"
        }, '')
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
      sunGeneratorMultiplierUpgrade1: new MultiplierChallengeUpgrade(
        'sunGeneratorMultiplierUpgrade1',
        'sun-generator-multiplier-upgrade-1',
        'Sun fusion',
        new Num(1, 4),
        new Num(1, 3),
        new Num(1, 0),
        new Num(3, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
        this.challengeGenerators['sunGenerator'].globalMultiplier
      ),
      sunGeneratorMultiplierUpgrade2: new MultiplierChallengeUpgrade(
        'sunGeneratorMultiplierUpgrade2',
        'sun-generator-multiplier-upgrade-2',
        'Sun mass',
        new Num(1, 5),
        new Num(1, 3),
        new Num(1, 0),
        new Num(5, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
        this.challengeGenerators['sunGenerator'].globalMultiplier
      ),
      sunGeneratorMultiplierUpgrade3: new MultiplierChallengeUpgrade(
        'sunGeneratorMultiplierUpgrade3',
        'sun-generator-multiplier-upgrade-3',
        'Sun hydrogen',
        new Num(1, 6),
        new Num(1, 3),
        new Num(1, 0),
        new Num(9, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
        this.challengeGenerators['sunGenerator'].globalMultiplier
      ),
      strongerSunParticleEffect: new CustomChallengeUpgrade(
        'strongerSunParticleEffect',
        'stronger-sun-particle-effect',
        'Supernova',
        new Num(1, 8),
        new Num(1, 4),
        new Num(1, 0),
        new Num(2, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
      )
    }

    if (this.challengeUpgrades['strongerSunParticleEffect'] instanceof CustomChallengeUpgrade) {
      this.challengeUpgrades['strongerSunParticleEffect'].setDescription(() => {
        return "Reset sun particles to enhance their power by "+this.challengeUpgrades['strongerSunParticleEffect'].buffer.toString(2)+"x."
      });
      this.challengeUpgrades['strongerSunParticleEffect'].setCustomBuyAction(() => {
        this.challengeHoldings['sunParticle'].reset();
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade1'].reset();
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade1'].unlocked = true
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade2'].reset()
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade2'].unlocked = true
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade3'].reset();
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade3'].unlocked = true
        return undefined;
      });
    }
  }
}
