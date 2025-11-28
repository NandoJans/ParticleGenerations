import { Num } from "src/app/num";
import { ResetKey } from "../../enums/reset-key";
import { Styles } from "../../enums/styles";
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

  baseGoal: Num = new Num(1, 2750);
  goal: Num = new Num(1, 2750);
  override goalIncrease: Num[] = [
    new Num(1, 13200),
    new Num(1, 32250),
    new Num(1, 41625),
  ];
  override difficultyIncrease: Num[] = [
    new Num(1, 0),
    new Num(5, 0),
    new Num(3.75, 0),
    new Num(3.5, 0),
  ];

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);
  override completionBuffer: Num[] = [
    new Num(0.6, 0),
    new Num(0.65, 0),
    new Num(0.35, 0),
    new Num(0.35, 0),
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
  requirement: Requirement[] = [];

  override maxEffect = new Num(1, 200);

  reward(): Num {
    let effect = HoldingRecord.yellowParticles.amount.pow(this.buffer);
    // Apply challenge buff boost from Star Challenge Charger
    effect = effect.mul(MultiplierRecord.challengeBuffBoost.getNum());
    if (effect.greq(this.maxEffect)) {
      effect = this.maxEffect.copy();
    }
    MultiplierRecord.yellowGenerators.correct(effect);
    return effect;
  }

  override effectString(): string {
    if (this.effect) {
      return this.effect.toString(2)+"x";
    }
    return "";
  }

  nerfs(): void {
    this.applyDisableNerf([
      GeneratorRecord.secondRedGenerator,
      GeneratorRecord.thirdRedGenerator,
      GeneratorRecord.fourthRedGenerator,
      GeneratorRecord.fifthRedGenerator,
      ...GeneratorRecord.secondRedGenerator.getUpgrades(),
      ...GeneratorRecord.thirdRedGenerator.getUpgrades(),
      ...GeneratorRecord.fourthRedGenerator.getUpgrades(),
      ...GeneratorRecord.fifthRedGenerator.getUpgrades(),
    ])

    ResetHelper.softReset(ResetKey.RED_EXTENSION);
  }

  override init() {
    this.challengeUpgrades = {
      unlockSecondRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockSecondRedGenerator',
        'unlock-second-red-generator-proxima-centauri',
        'Unlock Second Red Generator',
        new Num(1, 45),
        HoldingRecord.redParticles,
        this.style,
        [
          GeneratorRecord.secondRedGenerator,
          ...GeneratorRecord.secondRedGenerator.getUpgrades(),
        ],
        [
          this.getDifficultyIncrease(new Num(1.6, 1)),
          this.getDifficultyIncrease(new Num(1.5, 0)),
          this.getDifficultyIncrease(new Num(1.5, 0)),
        ],
        this.getCompletions().toNumber()
      ),
      unlockThirdRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockThirdRedGenerator',
        'unlock-third-red-generator-proxima-centauri',
        'Unlock Third Red Generator',
        new Num(1, 23),
        HoldingRecord.redAccelerators,
        this.style,
        [
          GeneratorRecord.thirdRedGenerator,
          ...GeneratorRecord.thirdRedGenerator.getUpgrades(),
        ],
        [
          this.getDifficultyIncrease(new Num(1.6, 1)),
          this.getDifficultyIncrease(new Num(1.59, 0)),
          this.getDifficultyIncrease(new Num(1.59, 0)),
        ],
        this.getCompletions().toNumber()
      ),
      unlockFourthRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockFourthRedGenerator',
        'unlock-fourth-red-generator-proxima-centauri',
        'Unlock Fourth Red Generator',
        new Num(1, 1400),
        HoldingRecord.redParticles,
        this.style,
        [
          GeneratorRecord.fourthRedGenerator,
          ...GeneratorRecord.fourthRedGenerator.getUpgrades(),
        ],
        [
          this.getDifficultyIncrease(new Num(1.6, 1)),
          this.getDifficultyIncrease(new Num(0.57, 0)),
          this.getDifficultyIncrease(new Num(0.57, 0)),
        ],
        this.getCompletions().toNumber()
      ),
      unlockFifthRedGenerator: new YellowStarChallengeUnlockUpgrade(
        'unlockFifthRedGenerator',
        'unlock-fifth-red-generator-proxima-centauri',
        'Unlock Fifth Red Generator',
        new Num(1, 130),
        HoldingRecord.redAccelerators,
        this.style,
        [
          GeneratorRecord.fifthRedGenerator,
          ...GeneratorRecord.fifthRedGenerator.getUpgrades(),
        ],
        [
          this.getDifficultyIncrease(new Num(1.6, 1)),
          this.getDifficultyIncrease(new Num(0.8, 0)),
          this.getDifficultyIncrease(new Num(0.8, 0)),
        ],
        this.getCompletions().toNumber()
      ),
    }
    this.requirement = [
      new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 3), this)
    ];
  }
}
