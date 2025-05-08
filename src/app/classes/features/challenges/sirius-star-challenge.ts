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
import {YellowStarChallengeUnlockUpgrade} from "./upgrades/yellow-star-challenge-unlock-upgrade";
import {Generator} from "../generator";

export class SiriusStarChallenge extends YellowStarChallenge {
  name: string = 'sirius-star-challenge';
  displayName: string = 'Sirius';

  baseGoal: Num = new Num(1, 12500);
  goal: Num = new Num(1, 12500);

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(2.06, 0);
  override baseBuffer: Num = new Num(2.06, 0);

  getRewardDescription(): string {
    return "Red generator extensions also boost yellow generators by "+this.buffer.toString(2)+"x.";
  }
  getDescription(): string {
    return "Sirius has a lot of energy. Somehow, it lacks upgrades. Maybe this energy is useful.";
  }

  style: Styles = Styles.SIRIUS;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 12500), this)
  ];

  reward(): Num|undefined {
    const effect = UpgradeRecord.redGeneratorExtension.amount.pow(this.buffer);
    MultiplierRecord.yellowGenerators.correct(effect ?? new Num(1, 0));
    return effect;
  }

  siriusGeneratorMultiplier: Num = new Num(1, 0);

  override constantNerfs() {
    this.challengeGenerators['siriusGenerator'].amount = new Num(1, 0);
    this.challengeGenerators['siriusGenerator'].bought = new Num(1, 0);

    this.siriusGeneratorMultiplier = HoldingRecord.redParticles.amount.pow(new Num(1, -3));
    this.challengeGenerators['siriusGenerator'].multiplier = this.siriusGeneratorMultiplier.copy();

    const sunParticleEffect: Num = this.challengeHoldings['siriusParticle'].amount.pow(new Num(3, 0)).floor();
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
      element.startUnlocked = false;
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
        new Num(1, 1),
        new Num(1, 0),
        new Num(2, 0),
        this.challengeHoldings['siriusParticle'],
        this.style,
        'yellow',
        'yellowStars',
        'siriusUpgrade',
        this.challengeGenerators['siriusGenerator'].globalMultiplier
      ),
      unlockFirstRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFirstRedGeneratorMultiplierUpgrade',
        'unlock-second-red-generator',
        'Unlock Second Red Generator Multiplier Upgrade',
        new Num(2, 2),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.firstRedGenerator.multiplierUpgrade,
      ),
      unlockFirstRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFirstRedGeneratorBuyMultiplierUpgrade',
        'unlock-first-red-generator-multiplier-upgrade',
        'Unlock First Red Generator Buy Multiplier Upgrade',
        new Num(5, 2),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.firstRedGenerator.buyMultiplierUpgrade,
      ),
      unlockSecondRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGeneratorSirius',
        'unlock-second-red-generator-sirius',
        'Unlock Second Red Generator',
        new Num(1, 3),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.secondRedGenerator,
      ),
      unlockSecondRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGeneratorMultiplierUpgrade',
        'unlock-second-red-generator-multiplier-upgrade',
        'Unlock Second Red Generator Multiplier Upgrade',
        new Num(2, 3),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.secondRedGenerator.multiplierUpgrade,
      ),
      unlockSecondRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGeneratorBuyMultiplierUpgrade',
        'unlock-second-red-generator-buy-multiplier-upgrade',
        'Unlock Second Red Generator Buy Multiplier Upgrade',
        new Num(5, 3),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.secondRedGenerator.buyMultiplierUpgrade,
      ),
      unlockThirdRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGeneratorSirius',
        'unlock-third-red-generator-sirius',
        'Unlock Third Red Generator',
        new Num(1, 4),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.thirdRedGenerator,
      ),
      unlockThirdRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGeneratorMultiplierUpgrade',
        'unlock-third-red-generator-multiplier-upgrade',
        'Unlock Third Red Generator Multiplier Upgrade',
        new Num(2, 4),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.thirdRedGenerator.multiplierUpgrade,
      ),
      unlockThirdRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGeneratorBuyMultiplierUpgrade',
        'unlock-third-red-generator-buy-multiplier-upgrade',
        'Unlock Third Red Generator Buy Multiplier Upgrade',
        new Num(5, 4),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.thirdRedGenerator.buyMultiplierUpgrade,
      ),
      unlockFourthRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGeneratorSirius',
        'unlock-fourth-red-generator-sirius',
        'Unlock Fourth Red Generator',
        new Num(1, 5),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fourthRedGenerator,
      ),
      unlockFourthRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGeneratorMultiplierUpgrade',
        'unlock-fourth-red-generator-multiplier-upgrade',
        'Unlock Fourth Red Generator Multiplier Upgrade',
        new Num(2, 5),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fourthRedGenerator.multiplierUpgrade,
      ),
      unlockFourthRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGeneratorBuyMultiplierUpgrade',
        'unlock-fourth-red-generator-buy-multiplier-upgrade',
        'Unlock Fourth Red Generator Buy Multiplier Upgrade',
        new Num(5, 5),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fourthRedGenerator.buyMultiplierUpgrade,
      ),
      unlockFifthRedGeneratorSirius: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGeneratorSirius',
        'unlock-fifth-red-generator-sirius',
        'Unlock Fifth Red Generator',
        new Num(1, 6),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fifthRedGenerator,
      ),
      unlockFifthRedGeneratorMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGeneratorMultiplierUpgrade',
        'unlock-fifth-red-generator-multiplier-upgrade',
        'Unlock Fifth Red Generator Multiplier Upgrade',
        new Num(2, 6),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fifthRedGenerator.multiplierUpgrade,
      ),
      unlockFifthRedGeneratorBuyMultiplierUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGeneratorBuyMultiplierUpgrade',
        'unlock-fifth-red-generator-buy-multiplier-upgrade',
        'Unlock Fifth Red Generator Buy Multiplier Upgrade',
        new Num(5, 6),
        this.challengeHoldings['siriusParticle'],
        this.style,
        GeneratorRecord.fifthRedGenerator.buyMultiplierUpgrade,
      ),
      unlockRedGeneratorBooster: new YellowStarChallengeUnlockUpgrade(
        'unlockRedGeneratorBooster',
        'unlock-red-generator-booster',
        'Unlock Red Generator Booster',
        new Num(1, 7),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.redGeneratorBooster,
      ),
      unlockUnlockRedAccelerators: new YellowStarChallengeUnlockUpgrade(
        'unlockUnlockRedAccelerators',
        'unlock-unlock-red-accelerators',
        'Unlock Unlock Red Accelerators',
        new Num(2, 7),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.unlockRedAccelerators,
      ),
      unlockMultiplyRedAcceleratorGeneration: new YellowStarChallengeUnlockUpgrade(
        'unlockMultiplyRedAcceleratorGeneration',
        'unlock-multiply-red-accelerator-generation',
        'Unlock Multiply Red Accelerator Generation',
        new Num(5, 7),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.multiplyRedAcceleratorGeneration,
      ),
      unlockMultiplyRedAcceleratorEffectUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockMultiplyRedAcceleratorEffectUpgrade',
        'unlock-multiply-red-accelerator-effect-upgrade',
        'Unlock Multiply Red Accelerator Effect Upgrade',
        new Num(1, 8),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.multiplyRedAcceleratorEffectUpgrade,
      ),
      unlockBoosterAccelerationUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockBoosterAccelerationUpgrade',
        'unlock-booster-acceleration-upgrade',
        'Unlock Booster Acceleration Upgrade',
        new Num(2, 8),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.boosterAccelerationUpgrade,
      ),
      unlockImproveRedAcceleratorsEffect: new YellowStarChallengeUnlockUpgrade(
        'unlockImproveRedAcceleratorsEffect',
        'unlock-improve-red-accelerators-effect',
        'Unlock Improve Red Accelerators Effect',
        new Num(5, 8),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.improveRedAcceleratorsEffect,
      ),
      unlockImproveRedParticlesToAcceleratorsUpgrade: new YellowStarChallengeUnlockUpgrade(
        'unlockImproveRedParticlesToAcceleratorsUpgrade',
        'unlock-improve-red-particles-to-accelerators-upgrade',
        'Unlock Improve Red Particles To Accelerators Upgrade',
        new Num(1, 9),
        this.challengeHoldings['siriusParticle'],
        this.style,
        UpgradeRecord.improveRedParticlesToAcceleratorsUpgrade,
      ),
    }

    this.challengeUpgrades['siriusGeneratorMultiplierUpgrade'].setCustomBuyAction(() => {
  // Reset all Sirius unlock upgrades
  Object.values(this.challengeUpgrades).forEach(upgrade => {
      if (upgrade instanceof YellowStarChallengeUnlockUpgrade) {
          upgrade.unlocked = false;
          upgrade.startUnlocked = false;
          upgrade.bought = new Num(0, 0);
      }
  });
});
  }
}
