import {Num} from "../../num";
import {GameElement} from "./game-element";
import {Holding} from "./holding";
import {ResetKey} from "../enums/reset-key";
import {Styles} from "../enums/styles";
import {Resetable} from "./interfaces/resetable";
import {Storable} from "./interfaces/storable";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {Require} from "./interfaces/require";
import {Requirement} from "./interfaces/requirement";
import {ChallengeUpgrade} from "./challenges/upgrades/challenge-upgrade";
import {App} from "../../App";
import {ChallengeHolding} from "./challenges/holdings/challenge-holding";
import {ChallengeGenerator} from "./challenges/generators/challenge-generator";

export abstract class Challenge extends GameElement implements Resetable, Storable {
  abstract displayName: string
  abstract baseGoal: Num
  abstract goal: Num
  abstract currency: Holding
  abstract prestige: ResetKey
  abstract prestigeLayer: string;
  abstract getRewardDescription(): string
  abstract getDescription(): string
  abstract style: Styles
  abstract type: string
  abstract resetId: ResetKey
  softResetId: ResetKey = ResetKey.NONE;
  instantComplete: boolean = false
  difficultyIncrease: Num = new Num(1, 0)
  abstract reward(): Num | undefined
  constantNerfs(): void {};
  abstract init(): void;
  abstract nerfs(): void;
  completed: boolean | Num = false
  effect: Num | undefined = undefined
  maxEffect: Num | undefined = undefined
  dynamic: boolean | undefined = undefined
  maxCompletions: Num | undefined = undefined
  goalIncrease: Num | undefined = undefined
  buffer: Num = new Num(0, 0)
  baseBuffer: Num = new Num(0, 0)
  completionBuffer: Num = new Num(1, 0);
  override calculationOrder: number = 200;
  challengeUpgrades: {[key: string]: ChallengeUpgrade} = {};
  challengeHoldings: {[key: string]: ChallengeHolding} = {};
  challengeGenerators: {[key: string]: ChallengeGenerator} = {};

  strongerBuffer(): Num | void {
    if (this.completed instanceof Num) {
      this.buffer = this.baseBuffer.mul(this.completionBuffer.pow(this.completed));
    }
  }

  override run(): Num | undefined {
    if (this.completed) {

      const reward = this.reward();
      if (reward) {
        this.effect = reward;
      }

      this.correctCompleted();
      this.correctGoal()
      this.correctBuffer();

      return reward;
    }
    return;
  }

  private correctCompleted() {
    if (this.maxCompletions instanceof Num && !(this.completed instanceof Num)) {
      this.completed = new Num(1, 0);
    }
  }

  private correctGoal() {
    if (this.maxCompletions instanceof Num && this.goalIncrease instanceof Num && this.completed instanceof Num) {
      this.goal = this.baseGoal.mul(
        this.goalIncrease.pow(this.completed)
      );
    }
  }

  protected correctBuffer() {
    this.buffer = this.baseBuffer.copy();

    if (this.completed instanceof Num && this.completed.greq(new Num(2, 0))) {
      this.strongerBuffer();
    }
  }

  getDifficultyIncrease(modifier: Num = new Num(1, 0)): Num {
    if (this.completed instanceof Num) {
      return this.difficultyIncrease.mul(modifier).mul(this.completed)
    }
    return new Num(1, 0);
  }

  tick() {
    this.constantNerfs();
    this.runChallengeUpgrades();
  }

  effectString(): string {
    return this.effect ? this.effect.toString() : "";
  }

  getEffectDisplay(): string {
    return this.effectString();
  }

  reset(): void {
    this.completed = false;
    this.getChallengeElements().forEach((challengeElement) => {
      challengeElement.reset();
    })
  }

  softReset(): void {
  }

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())

  getSaveCategory(): string {
    return "challenges";
  }

  getSaveKey(): string {
    return this.name;
  }

  save(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())

    this.localStorageHelper.save(this.unlocked, "unlocked");
    if (this.completed instanceof Num) {
      this.localStorageHelper.saveNum(this.completed, "completed");
    } else {
      this.localStorageHelper.save(this.completed, "completed");
    }

    this.saveChallengeUpgrades();
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())
    this.unlocked = this.localStorageHelper.load(this.unlocked, "unlocked");
    if (this.completed instanceof Num) {

      this.completed = this.localStorageHelper.loadNum(this.completed, "completed");
    } else {
      this.completed = this.localStorageHelper.load(this.completed, "completed");

      if (typeof this.completed === "object") {
        if (this.completed['mantissa'] !== undefined && this.completed['exponent'] !== undefined) {
          this.completed = new Num(this.completed['mantissa'], this.completed['exponent']);
        }
      }
    }

    this.init();
    this.tryLoadChallengeUpgrades();
  }

  saveChallengeUpgrades(): void {
    this.getChallengeElements().forEach((value) => {
      value.save()
    })
  }

  tryLoadChallengeUpgrades() {
    this.getChallengeElements().forEach((value) => {
      value.tryLoad()
    })
  }

  reached(): boolean {
    return this.currency.amount.greq(this.goal);
  }

  appliedNerfs: {[key: string]: {[key: string]: { element: GameElement, value: any } }} = {
    'requirements': {},
  }

  protected applyRequirementNerf(gameElement: GameElement, requirement: {require: Require, amount: Num}|[] = []): void {
    this.appliedNerfs['requirements'][gameElement.name] = {
      element: gameElement,
      value: gameElement.requirement
    };
    if (Array.isArray(requirement)) {
      gameElement.requirement = requirement;
      Requirement.clear(gameElement);
    } else {
      gameElement.requirement = [
        new Requirement(requirement.require, requirement.amount, gameElement),
      ]
    }
  }

  revert() {
    this.revertRequirementNerfs();
  }

  revertRequirementNerfs(): void {
    Object.values(this.appliedNerfs['requirements']).forEach((value) => {
      const gameElement = value.element;
      gameElement.unlocked = gameElement.startUnlocked;
      gameElement.requirement = value.value;
      gameElement.requirement.forEach((requirement) => {
        requirement.register();
      });
    })
    this.appliedNerfs['requirements'] = {};
  }

  getChallengeElements(): (ChallengeGenerator | ChallengeUpgrade | ChallengeHolding)[] {
    return [
      ...Object.values(this.challengeGenerators),
      ...Object.values(this.challengeUpgrades),
      ...Object.values(this.challengeHoldings),
    ];
  }

  start(): void {
    this.nerfs()
    this.getChallengeElements().forEach((value: ChallengeGenerator | ChallengeUpgrade | ChallengeHolding) => {
      if (!(value instanceof Holding)) {
        value.unlocked = true;
      }
    })
  }

  end(): void {
    this.revert();
    this.getChallengeElements().forEach((value: ChallengeGenerator | ChallengeUpgrade | ChallengeHolding) => {
      value.reset();
      if (!(value instanceof Holding)) {
        value.unlocked = false;
      }
    })
  }

  private runChallengeUpgrades() {
    this.getChallengeElements().forEach((value: ChallengeGenerator | ChallengeUpgrade | ChallengeHolding) => {
      value.run(App.gameSpeed);
      if (value instanceof ChallengeGenerator) {
        value.globalMultiplier.reset();
      }
    })
  }

  getUpgrades(): ChallengeUpgrade[] {
    return Object.values(this.challengeUpgrades);
  }

  getHoldings(): ChallengeHolding[] {
    return Object.values(this.challengeHoldings);
  }

  getGenerators(): ChallengeGenerator[] {
    return Object.values(this.challengeGenerators);
  }

  isCompleted(): boolean {
    if (this.completed instanceof Num) {
      return this.completed.greq(this.maxCompletions ?? new Num(1, 0));
    } else {
      return this.completed;
    }
  }

  complete(): void {
    if (this.completed instanceof Num) {
      this.completed = this.completed.add(new Num(1, 0));
    } else {
      this.completed = true;
    }
  }
}
