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
import {GeneratorRecord} from "../../records/generators/generator-record";
import {MultiplierChallengeUpgrade} from "./upgrades/multiplier-challenge-upgrade";
import {YellowStarChallengeUnlockUpgrade} from "./upgrades/yellow-star-challenge-unlock-upgrade";

export class SiriusStarChallenge extends YellowStarChallenge {
  name: string = 'sirius-star-challenge';
  displayName: string = 'Sirius A';

  baseGoal: Num = new Num(1, 10400);
  goal: Num = new Num(1, 10400);
  override goalIncrease: Num[] = [
    new Num(1, 10400),
    new Num(1, 40400),
    new Num(1, 61000),
    new Num(1, 49400),
  ];

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  override completionBuffer: Num[] = [
    new Num(1.11, 0),
    new Num(1.12, 0),
    new Num(1.13, 0),
  ];
  override difficultyIncrease: Num[] = [
    new Num(1, 0),
    new Num(1.4, 0),
    new Num(0.86, 0),
    new Num(0.69, 0),
  ];

  getRewardDescription(): string {
    return "Red generator extensions also boost yellow generators by "+this.buffer.toString(2)+"x.";
  }
  getDescription(): string {
    return "Sirius locks up a lot of energy. Somehow, it lacks extensions. Maybe it\'s energy is useful.";
  }

  override effectString(): string {
    return super.effectString()+"x";
  }

  style: Styles = Styles.SIRIUS;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 11000), this)
  ];

  reward(): Num|undefined {
    const effect = this.buffer.pow(UpgradeRecord.redGeneratorExtension.amount);
    MultiplierRecord.yellowGenerators.correct(effect ?? new Num(1, 0));
    return effect;
  }

  siriusGeneratorMultiplier: Num = new Num(1, 0);

  override constantNerfs() {
    this.challengeGenerators['siriusGenerator'].bought = new Num(1, 0);

    this.siriusGeneratorMultiplier = HoldingRecord.redParticles.amount.pow(new Num(2, -4)).mul(this.challengeUpgrades['siriusGeneratorMultiplierUpgrade'].effect ?? new Num(1, 0));
    this.challengeGenerators['siriusGenerator'].baseMulMod = this.siriusGeneratorMultiplier.copy();

    const sunParticleEffect: Num = this.challengeHoldings['siriusParticle'].amount.pow(new Num(4, 0)).floor();
    this.challengeHoldings['siriusParticle'].effect = sunParticleEffect;
    MultiplierRecord.redParticleGenerators.correct(sunParticleEffect);
  }

  nerfs(): void {
    const elementsToDisable = [
      GeneratorRecord.secondRedGenerator,
      GeneratorRecord.thirdRedGenerator,
      GeneratorRecord.fourthRedGenerator,
      GeneratorRecord.fifthRedGenerator,
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

  override init() {
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
        .addLine('Their generation is boosted by red particles', () => {
          return this.siriusGeneratorMultiplier.toString(2) + 'x';
        }, '')
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

    this.challengeGenerators['siriusGenerator'].hidden = true;

    this.challengeUpgrades = {
      siriusGeneratorMultiplierUpgrade: new MultiplierChallengeUpgrade(
        'siriusGeneratorMultiplierUpgrade',
        'sirius-generator-multiplier-upgrade',
        'Sirius fusion',
        new Num(1, 3),
        new Num(2, 1),
        new Num(1, 1),
        new Num(1, 40),
        new Num(3, 0),
        this.challengeHoldings['siriusParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'siriusUpgrade',
        this.challengeGenerators['siriusGenerator'].globalMultiplier,
        this.getDifficultyIncrease(new Num(1, 0)),
      ),
      unlockFirstRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFirstRedGeneratorMultiplierUpgrade',
        'unlock-first-red-generator-multiplier-upgrade',
        'Unlock First Red Generator Multiplier Upgrade',
        new Num(2, 2),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.firstRedGenerator.multiplierUpgrade,
        this.getDifficultyIncrease(),
      ),
      unlockFirstRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFirstRedGeneratorBuyMultiplierUpgrade',
        'unlock-first-red-generator-buy-multiplier-upgrade',
        'Unlock First Red Generator Buy Multiplier Upgrade',
        new Num(5, 2),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.firstRedGenerator.buyMultiplierUpgrade,
        this.getDifficultyIncrease(),
      ),
      unlockSecondRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGeneratorSirius',
        'unlock-second-red-generator-sirius',
        'Unlock Second Red Generator',
        new Num(1, 3),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.secondRedGenerator,
        this.getDifficultyIncrease(),
      ),
      unlockSecondRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGeneratorMultiplierUpgrade',
        'unlock-second-red-generator-multiplier-upgrade',
        'Unlock Second Red Generator Multiplier Upgrade',
        new Num(2, 3),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.secondRedGenerator.multiplierUpgrade,
        this.getDifficultyIncrease(),
      ),
      unlockSecondRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGeneratorBuyMultiplierUpgrade',
        'unlock-second-red-generator-buy-multiplier-upgrade',
        'Unlock Second Red Generator Buy Multiplier Upgrade',
        new Num(5, 3),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.secondRedGenerator.buyMultiplierUpgrade,
        this.getDifficultyIncrease(),
      ),
      unlockThirdRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGeneratorSirius',
        'unlock-third-red-generator-sirius',
        'Unlock Third Red Generator',
        new Num(2, 4),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.thirdRedGenerator,
        this.getDifficultyIncrease(new Num(1.05, 0)),
      ),
      unlockThirdRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGeneratorMultiplierUpgrade',
        'unlock-third-red-generator-multiplier-upgrade',
        'Unlock Third Red Generator Multiplier Upgrade',
        new Num(1, 5),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.thirdRedGenerator.multiplierUpgrade,
        this.getDifficultyIncrease(new Num(1.1, 0)),
      ),
      unlockThirdRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGeneratorBuyMultiplierUpgrade',
        'unlock-third-red-generator-buy-multiplier-upgrade',
        'Unlock Third Red Generator Buy Multiplier Upgrade',
        new Num(5, 5),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.thirdRedGenerator.buyMultiplierUpgrade,
        this.getDifficultyIncrease(new Num(1.15, 0)),
      ),
      unlockFourthRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGeneratorSirius',
        'unlock-fourth-red-generator-sirius',
        'Unlock Fourth Red Generator',
        new Num(2, 6),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fourthRedGenerator,
        this.getDifficultyIncrease(new Num(1.2, 0)),
      ),
      unlockFourthRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGeneratorMultiplierUpgrade',
        'unlock-fourth-red-generator-multiplier-upgrade',
        'Unlock Fourth Red Generator Multiplier Upgrade',
        new Num(1, 7),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fourthRedGenerator.multiplierUpgrade,
        this.getDifficultyIncrease(new Num(1.25, 0)),
      ),
      unlockFourthRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGeneratorBuyMultiplierUpgrade',
        'unlock-fourth-red-generator-buy-multiplier-upgrade',
        'Unlock Fourth Red Generator Buy Multiplier Upgrade',
        new Num(5, 7),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fourthRedGenerator.buyMultiplierUpgrade,
        this.getDifficultyIncrease(new Num(1.3, 0)),
      ),
      unlockFifthRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGeneratorSirius',
        'unlock-fifth-red-generator-sirius',
        'Unlock Fifth Red Generator',
        new Num(2, 8),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fifthRedGenerator,
        this.getDifficultyIncrease(new Num(1.35, 0)),
      ),
      unlockFifthRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGeneratorMultiplierUpgrade',
        'unlock-fifth-red-generator-multiplier-upgrade',
        'Unlock Fifth Red Generator Multiplier Upgrade',
        new Num(1, 9),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fifthRedGenerator.multiplierUpgrade,
        this.getDifficultyIncrease(new Num(1.4, 0)),
      ),
      unlockFifthRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGeneratorBuyMultiplierUpgrade',
        'unlock-fifth-red-generator-buy-multiplier-upgrade',
        'Unlock Fifth Red Generator Buy Multiplier Upgrade',
        new Num(5, 9),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fifthRedGenerator.buyMultiplierUpgrade,
        this.getDifficultyIncrease(new Num(1.45, 0)),
      ),
      unlockRedGeneratorBooster: new YellowStarChallengeUnlockUpgrade(
        'unlockRedGeneratorBooster',
        'unlock-red-generator-booster',
        'Unlock Red Generator Booster',
        new Num(2, 10),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.redGeneratorBooster,
        this.getDifficultyIncrease(new Num(1.45, 0)),
      ),
      unlockUnlockRedAccelerators: new YellowStarChallengeUnlockUpgrade(
        'unlockUnlockRedAccelerators',
        'unlock-unlock-red-accelerators',
        'Unlock Unlock Red Accelerators',
        new Num(1, 11),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.unlockRedAccelerators,
        this.getDifficultyIncrease(new Num(1.45, 0)),
      ),
      unlockMultiplyRedAcceleratorGeneration: new YellowStarChallengeUnlockUpgrade(
        'unlockMultiplyRedAcceleratorGeneration',
        'unlock-multiply-red-accelerator-generation',
        'Unlock Multiply Red Accelerator Generation',
        new Num(5, 11),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.multiplyRedAcceleratorGeneration,
        this.getDifficultyIncrease(new Num(1.5, 0)),
      ),
      unlockMultiplyRedAcceleratorEffectUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockMultiplyRedAcceleratorEffectUpgrade',
        'unlock-multiply-red-accelerator-effect-upgrade',
        'Unlock Multiply Red Accelerator Effect Upgrade',
        new Num(2, 13),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.multiplyRedAcceleratorEffectUpgrade,
        this.getDifficultyIncrease(new Num(1.5, 0)),
      ),
      unlockImproveRedAcceleratorsEffect: new YellowStarChallengeUnlockUpgrade(
        'unlockImproveRedAcceleratorsEffect',
        'unlock-improve-red-accelerators-effect',
        'Unlock Improve Red Accelerators Effect',
        new Num(1, 14),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.improveRedAcceleratorsEffect,
        this.getDifficultyIncrease(new Num(1.5, 0)),
      ),
      unlockImproveRedParticlesToAcceleratorsUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockImproveRedParticlesToAcceleratorsUpgrade',
        'unlock-improve-red-particles-to-accelerators-upgrade',
        'Unlock Improve Red Particles To Accelerators Upgrade',
        new Num(5, 15),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade,
        this.getDifficultyIncrease(new Num(1.43, 0)),
      ),
      unlockBoosterAccelerationUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockBoosterAccelerationUpgrade',
        'unlock-booster-acceleration-upgrade',
        'Unlock Booster Acceleration Upgrade',
        new Num(2, 16),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.boosterAccelerationUpgrade,
        [
          this.getDifficultyIncrease(new Num(1.42, 0))
        ],
        this.getCompletions().toNumber()
      ),
    }
this.requirement = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 11000), this)
  ];
  }
}
