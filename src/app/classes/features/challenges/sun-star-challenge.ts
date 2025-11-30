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
import {BuffSoftCapHelper} from "../../helpers/buff-soft-cap-helper";

export class SunStarChallenge extends YellowStarChallenge {
  name: string = 'sun-star-challenge';
  displayName: string = 'Sun';

  baseGoal: Num = new Num(1, 17000);
  goal: Num = new Num(1, 17000);
  override goalIncrease: Num[] = [
    new Num(1, 15200),
    new Num(1, 46000),
    new Num(1, 45300),
  ];
  override difficultyIncrease: Num[] = [
    new Num(1, 0),
    new Num(1.95, 0),
    new Num(1.55, 0),
  ];

  override buffer: Num = new Num(1.1, 0);
  override baseBuffer: Num = new Num(1.1, 0);
  override completionBuffer: Num[] = [
    new Num(1, 0),
    new Num(1, 0),
    new Num(0.7, 0),
    new Num(0.6, 0),
  ];

  override strongerBuffer(completionBuffer: Num): Num | void {
    if (this.completed instanceof Num) {
      this.buffer = this.baseBuffer.mul(completionBuffer.mul(this.completed));
    }
  }

  getRewardDescription(): string {
    return "Yellow power also boosts red accelerator generation ^"+this.buffer.toString(3)+".";
  }
  getDescription(): string {
    return "The sun, somehow lacks acceleration. Maybe something else will help you.";
  }

  override effectString(): string {
    const effectString = super.effectString();
    return (effectString) ? effectString+"x" : "";
  }

  style: Styles = Styles.SUN;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [];

  rewardSoftCap: Num = new Num(1, 300_000)

  reward(): Num {
    let effect = HoldingRecord.yellowPower.effect?.pow(this.buffer) ?? new Num(1, 0)
    // Apply challenge buff boost from Star Challenge Charger
    effect = effect.mul(MultiplierRecord.challengeBuffBoost.getNum());
    effect = BuffSoftCapHelper.applyPowerSoftCap(effect, this.rewardSoftCap, new Num(0.25, 0));
    MultiplierRecord.redAcceleratorGenerators.correct(effect);
    return effect;
  }

  private sunParticleGeneration: Num = new Num(1, 0);

  override constantNerfs() {
    HoldingRecord.redAccelerators.amount = new Num(1, 0);
    UpgradeRecord.unlockRedAccelerators.bought = new Num(0, 0);

    this.challengeGenerators['sunGenerator'].bought = new Num(1, 0);

    const resetUpgradePower = this.challengeUpgrades['strongerSunParticleEffect'].buffer
      .pow(this.challengeUpgrades['strongerSunParticleEffect'].amount);

    this.sunParticleGeneration = HoldingRecord.redParticles.amount.pow(new Num(7, -4))
      .mul(this.challengeGenerators['sunGenerator'].globalMultiplier.getNum());
    this.challengeGenerators['sunGenerator'].baseMulMod = this.sunParticleGeneration;
    // this.challengeHoldings['sunParticle'].amount = new Num(1, 8);
    const sunParticleEffect: Num = this.challengeHoldings['sunParticle'].amount.pow(new Num(1.5, 0).mul(resetUpgradePower)).floor();
    this.challengeHoldings['sunParticle'].effect = sunParticleEffect;
    MultiplierRecord.redParticleGenerators.correct(sunParticleEffect);
  }

  nerfs(): void {
    this.challengeGenerators['sunGenerator'].amount = new Num(1, 0);
    UpgradeRecord.unlockRedAccelerators.unlocked = false;
    this.applyRequirementNerf(UpgradeRecord.unlockRedAccelerators);
  }

  override init() {
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
        new Num(1, 7),
        new Num(1, 4),
        new Num(1.2, 0),
        undefined,
        new Num(3, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
        this.challengeGenerators['sunGenerator'].globalMultiplier,
        [
          this.getDifficultyIncrease(),
          this.getDifficultyIncrease(new Num(.9, 0)),
          this.getDifficultyIncrease(new Num(.9, 0)),
        ],
        this.getCompletions().toNumber()
      ),
      sunGeneratorMultiplierUpgrade2: new MultiplierChallengeUpgrade(
        'sunGeneratorMultiplierUpgrade2',
        'sun-generator-multiplier-upgrade-2',
        'Sun mass',
        new Num(1, 8),
        new Num(1, 4),
        new Num(1.2, 0),
        undefined,
        new Num(5, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
        this.challengeGenerators['sunGenerator'].globalMultiplier,
        [
          this.getDifficultyIncrease(),
          this.getDifficultyIncrease(new Num(.9, 0)),
          this.getDifficultyIncrease(new Num(.9, 0)),
        ],
        this.getCompletions().toNumber()
      ),
      sunGeneratorMultiplierUpgrade3: new MultiplierChallengeUpgrade(
        'sunGeneratorMultiplierUpgrade3',
        'sun-generator-multiplier-upgrade-3',
        'Sun hydrogen',
        new Num(1, 9),
        new Num(1, 4),
        new Num(1.2, 0),
        undefined,
        new Num(9, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
        this.challengeGenerators['sunGenerator'].globalMultiplier,
        [
          this.getDifficultyIncrease(),
          this.getDifficultyIncrease(new Num(.9, 0)),
          this.getDifficultyIncrease(new Num(.9, 0)),
        ],
        this.getCompletions().toNumber()
      ),
      strongerSunParticleEffect: new CustomChallengeUpgrade(
        'strongerSunParticleEffect',
        'stronger-sun-particle-effect',
        'Supernova',
        new Num(1, 10),
        new Num(1, 6),
        new Num(1, 1),
        undefined,
        new Num(2, 0),
        this.challengeHoldings['sunParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'sunUpgrade',
        [
          this.getDifficultyIncrease(),
          this.getDifficultyIncrease(new Num(1, 0)),
          this.getDifficultyIncrease(new Num(1, 0)),
        ],
        this.getCompletions().toNumber()
      )
    }

    if (this.challengeUpgrades['strongerSunParticleEffect'] instanceof CustomChallengeUpgrade) {
      this.challengeUpgrades['strongerSunParticleEffect'].limit = new Num(3, 0);
      this.challengeUpgrades['strongerSunParticleEffect'].setDescription(() => {
        return "Reset sun particles to enhance their power by "+this.challengeUpgrades['strongerSunParticleEffect'].buffer.toString(2)+"x."
      });
      this.challengeUpgrades['strongerSunParticleEffect'].setCustomBuyAction(() => {
        this.challengeHoldings['sunParticle'].reset();
        this.challengeGenerators['sunGenerator'].globalMultiplier.reset();
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade1'].reset();
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade1'].unlock()
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade2'].reset()
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade2'].unlock()
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade3'].reset();
        this.challengeUpgrades['sunGeneratorMultiplierUpgrade3'].unlock()
        return undefined;
      });
    }

  this.requirement = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 8500), this)
  ];
  }
}
