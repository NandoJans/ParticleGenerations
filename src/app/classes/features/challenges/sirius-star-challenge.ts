import {YellowStarChallenge} from "./yellow-star-challenge";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Requirement} from "../interfaces/requirement";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {ChallengeHolding} from "./holdings/challenge-holding";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {ChallengeGenerator} from "./generators/challenge-generator";
import {Upgrade} from "../upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class SiriusStarChallenge extends YellowStarChallenge {
  name: string = 'sirius-star-challenge';
  displayName: string = 'Sirius';

  baseGoal: Num = new Num(1, 10000);
  goal: Num = new Num(1, 10000);

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(1, 0);
  override baseBuffer: Num = new Num(1, 0);

  getRewardDescription(): string {
    return "Yellow power also boosts red accelerator generation ^"+this.buffer.toString(2)+".";
  }
  getDescription(): string {
    return "Sirius has a lot of energy. Somehow, it lacks upgrades. Maybe this energy is useful.";
  }

  style: Styles = Styles.SUN;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 12500), this)
  ];

  reward(): undefined {
    MultiplierRecord.redAcceleratorGenerators.correct(
      HoldingRecord.yellowPower.effect ?? new Num(1, 0)
    );
    return;
  }

  override constantNerfs() {
    this.challengeGenerators['siriusGenerator'].amount = new Num(1, 0);
    this.challengeGenerators['siriusGenerator'].bought = new Num(1, 0);

    this.challengeGenerators['siriusGenerator'].multiplier = HoldingRecord.redParticles.amount.pow(new Num(1, -1));

    const sunParticleEffect: Num = this.challengeHoldings['siriusParticle'].amount.pow(new Num(3, 0)).floor();
    this.challengeHoldings['siriusParticle'].effect = sunParticleEffect;
    MultiplierRecord.redParticleGenerators.correct(sunParticleEffect);
  }

  nerfs(): void {
    const elementsToDisable = [
      GeneratorRecord.firstRedGenerator.buyMultiplierUpgrade,
      GeneratorRecord.firstRedGenerator.multiplierUpgrade,
      GeneratorRecord.secondRedGenerator.buyMultiplierUpgrade,
      GeneratorRecord.secondRedGenerator.multiplierUpgrade,
      GeneratorRecord.thirdRedGenerator.buyMultiplierUpgrade,
      GeneratorRecord.thirdRedGenerator.multiplierUpgrade,
      GeneratorRecord.fourthRedGenerator.buyMultiplierUpgrade,
      GeneratorRecord.fourthRedGenerator.multiplierUpgrade,
      GeneratorRecord.fifthRedGenerator.buyMultiplierUpgrade,
      GeneratorRecord.fifthRedGenerator.multiplierUpgrade,
      UpgradeRecord.redGeneratorExtension,
      UpgradeRecord.redGeneratorBooster,
      UpgradeRecord.unlockRedAccelerators,
      UpgradeRecord.multiplyRedAcceleratorGeneration,
      UpgradeRecord.multiplyRedAcceleratorEffectUpgrade,
      UpgradeRecord.improveRedAcceleratorsEffect,
      UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade,
      UpgradeRecord.boosterAccelerationUpgrade,
    ];
    elementsToDisable.forEach(element => {
      element.unlocked = false;
      element.bought = new Num(0, 0);
      this.applyRequirementNerf(element);
    })
  }

  init() {
    this.challengeHoldings = {
      siriusParticle: new ChallengeHolding(
        'siriusParticle',
        'Sirius Particle',
        'SP',
        new Num(1, 0),
        new Num(1, 0),
        this.style,
      ),
    }

    this.challengeHoldings['siriusParticle'].setHoldingDisplay(
      HoldingDisplayFactory.start(this.challengeHoldings['siriusParticle'])
        .withAmountPrefix('You have ')
        .withAmountSuffix(' Sirius Particles')
        .withEffectPrefix('They multiply red generators by ')
        .withEffectSuffix('')
        .addLine('Their generation is boosted by yellow power', () => {}, '')
        .build()
    )

    this.challengeGenerators = {
      siriusGenerator: new ChallengeGenerator(
        'siriusGenerator',
        'sirius-generator',
        'Sirius Generator',
        this.challengeHoldings['siriusParticle'],
        new Num(1, 0),
        'sirius-generator',
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
