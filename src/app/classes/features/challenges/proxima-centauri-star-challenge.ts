import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
import { Holding } from "../holding";
import { Requirement } from "../interfaces/requirement";
import {YellowStarChallenge} from "./yellow-star-challenge";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {YellowStarChallengeUnlockUpgrade} from "./upgrades/yellow-star-challenge-unlock-upgrade";

export class ProximaCentauriStarChallenge extends YellowStarChallenge {
  name: string = 'proxima-centauri-star-challenge';
  displayName: string = 'Proxima Centauri';

  baseGoal: Num = new Num(1, 2700);
  goal: Num = new Num(1, 2700);
  override goalIncrease: Num[] = [
    new Num(1, 13200),
    new Num(1, 20200),
    new Num(1, 50200),
  ];
  override difficultyIncrease: Num[] = [
    new Num(1, 0),
    new Num(4, 0),
    new Num(3.75, 0),
    new Num(3.5, 0),
  ];

  currency: Holding = HoldingRecord.redParticles;

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  override completionBuffer: Num[] = [
    new Num(0.6, 0),
    new Num(0.65, 0),
    new Num(0.35, 0),
    new Num(0.3, 0),
  ];

  override strongerBuffer(completionBuffer: Num): Num | void {
    if (this.completed instanceof Num) {
      this.buffer = this.baseBuffer.mul(completionBuffer.mul(this.completed));
    }
  }

  getRewardDescription(): string {
    return "Yellow generators multiplied based on star particles by raising them to ^"+this.buffer.toString(2);
  }
  getDescription(): string {
    return "Proxima Centauri Star hides its red generators across its solar system.";
  }

  style: Styles = Styles.PROXIMA_CENTAURI;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 3), this)
  ];

  reward(): Num {
    const effect = HoldingRecord.yellowParticles.amount.pow(this.buffer);
    MultiplierRecord.yellowGenerators.correct(effect);
    return effect;
  }

  override effectString(): string {
    if (this.effect) {
      return this.effect.toString(2)+"x" ?? "";
    }
    return "";
  }

  nerfs(): void {
    GeneratorRecord.secondRedGenerator.unlocked = false;
    GeneratorRecord.thirdRedGenerator.unlocked = false;
    GeneratorRecord.fourthRedGenerator.unlocked = false;
    GeneratorRecord.fifthRedGenerator.unlocked = false;

    this.applyRequirementNerf(GeneratorRecord.secondRedGenerator)
    this.applyRequirementNerf(GeneratorRecord.thirdRedGenerator)
    this.applyRequirementNerf(GeneratorRecord.fourthRedGenerator)
    this.applyRequirementNerf(GeneratorRecord.fifthRedGenerator)

    ResetHelper.softReset(ResetKey.RED_EXTENSION);
  }

  init() {
    this.challengeUpgrades = {
      unlockSecondRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGenerator',
        'unlock-second-red-generator-proxima-centauri',
        'Unlock Second Red Generator',
        new Num(1, 50),
        HoldingRecord.redParticles,
        this.style,
        GeneratorRecord.secondRedGenerator,
        this.getDifficultyIncrease(new Num(1.6, 0)),
      ),
      unlockThirdRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGenerator',
        'unlock-third-red-generator-proxima-centauri',
        'Unlock Third Red Generator',
        new Num(1, 23),
        HoldingRecord.redAccelerators,
        this.style,
        GeneratorRecord.thirdRedGenerator,
        this.getDifficultyIncrease(new Num(1.8, 0)),
      ),
      unlockFourthRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGenerator',
        'unlock-fourth-red-generator-proxima-centauri',
        'Unlock Fourth Red Generator',
        new Num(1, 1300),
        HoldingRecord.redParticles,
        this.style,
        GeneratorRecord.fourthRedGenerator,
        this.getDifficultyIncrease(new Num(0.8, 0)),
      ),
      unlockFifthRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGenerator',
        'unlock-fifth-red-generator-proxima-centauri',
        'Unlock Fifth Red Generator',
        new Num(1, 118),
        HoldingRecord.redAccelerators,
        this.style,
        GeneratorRecord.fifthRedGenerator,
        this.getDifficultyIncrease(new Num(0.9, 0)),
      ),
    }
  }
}
