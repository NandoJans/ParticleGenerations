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
import {StatsService} from "../../services/stats.service";
import {ChallengeRecord} from "../records/challenges/challenge-record";

export abstract class Challenge extends GameElement implements Resetable, Storable, Require {
  abstract displayName: string
  abstract baseGoal: Num
  abstract goal: Num
  abstract prestige: ResetKey
  abstract prestigeLayer: string;
  abstract getRewardDescription(): string
  abstract getDescription(): string
  abstract style: Styles
  abstract type: string
  abstract resetId: ResetKey
  softResetId: ResetKey = ResetKey.NONE;
  instantComplete: boolean = false
  difficultyIncrease: Num|Num[] = new Num(1, 0)
  abstract reward(): Num | undefined
  nerfFunctions: {[key: string]: () => void} = {};
  constantNerfs(): void {
    // Call all registered nerf functions
    Object.values(this.nerfFunctions).forEach(nerfFunction => {
      nerfFunction();
    });
  };
  abstract nerfs(): void;
  completed: boolean | Num = false
  effect: Num | undefined = undefined
  maxEffect: Num | undefined = undefined
  dynamic: boolean | undefined = undefined
  maxCompletions: Num | undefined = undefined
  goalIncrease: Num | Num[] | undefined = undefined
  buffer: Num = new Num(0, 0)
  baseBuffer: Num = new Num(0, 0)
  completionBuffer: Num | Num[] = new Num(1, 0);
  override calculationOrder: number = 200;
  challengeUpgrades: {[key: string]: ChallengeUpgrade} = {};
  challengeHoldings: {[key: string]: ChallengeHolding} = {};
  challengeGenerators: {[key: string]: ChallengeGenerator} = {};

  abstract getCurrency(): Holding;

  strongerBuffer(completionBuffer: Num): Num | void {
    if (this.completed instanceof Num) {
      this.buffer = this.baseBuffer.mul(completionBuffer.pow(this.completed));
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
    if (this.maxCompletions instanceof Num && this.completed instanceof Num) {
      if (this.goalIncrease instanceof Num) {
        this.goal = this.baseGoal.mul(
          this.goalIncrease.pow(this.completed)
        );
      } else if (this.goalIncrease instanceof Array) {
        const index = Math.floor(this.completed.toNumber());
        if (this.goalIncrease[index] !== undefined) {
          this.goal = this.baseGoal.mul(
            this.goalIncrease[index].pow(this.completed)
          );
        } else {
          this.goal = this.baseGoal.mul(
            this.goalIncrease[this.goalIncrease.length - 1].pow(this.completed)
          );
        }
      }
    }
  }

  protected correctBuffer() {
    this.buffer = this.baseBuffer.copy();

    if (this.completed instanceof Num && this.completed.greq(new Num(2, 0))) {
      if (this.completionBuffer instanceof Num) {
        this.strongerBuffer(this.completionBuffer);
      } else {
        const index = Math.floor(this.completed.toNumber());
        if (this.completionBuffer[index] !== undefined) {
          this.strongerBuffer(this.completionBuffer[index]);
        } else {
          this.strongerBuffer(this.completionBuffer[this.completionBuffer.length - 1]);
        }
      }
    }
  }

  getDifficultyIncrease(modifier: Num = new Num(1, 0)): Num {
    if (this.completed instanceof Num) {
      if (this.difficultyIncrease instanceof Num) {
        return this.difficultyIncrease.mul(modifier).mul(this.completed)
      } else {
        const index = Math.floor(this.completed.toNumber());
        if (this.difficultyIncrease[index] !== undefined) {
          return this.difficultyIncrease[index].mul(modifier).mul(this.completed);
        } else {
          return this.difficultyIncrease[this.difficultyIncrease.length - 1].mul(modifier).mul(this.completed);
        }
      }
    }
    return new Num(1, 0);
  }

  tick(): void {
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
    this.unlocked = this.startUnlocked;
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

    this.localStorageHelper.save(this.firstUnlock, "firstUnlock");
    this.localStorageHelper.save(this.unlocked, "unlocked");
    if (this.completed instanceof Num) {
      this.localStorageHelper.saveNum(this.completed, "completed");
    } else {
      this.localStorageHelper.save(this.completed, "completed");
    }

    this.saveChallengeElements();
  }

  tryLoad(): void {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())
    this.firstUnlock = this.localStorageHelper.load(this.firstUnlock, "firstUnlock");
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

    this.tryLoadChallengeElements();
  }

  saveChallengeElements(): void {
    this.getChallengeElements().forEach((value) => {
      value.save()
    })
  }

  tryLoadChallengeElements() {
    this.getChallengeElements().forEach((value) => {
      value.tryLoad()
    })
  }

  reached(): boolean {
    return this.getCurrency().amount.greq(this.goal);
  }

  appliedNerfs: {[key: string]: {[key: string]: { element: GameElement, initial?: any } }} = {
    'requirements': {},
    'disabled': {}
  }

  protected applyRequirementNerf(gameElement: GameElement, requirement: {require: Require, amount: Num}|[] = []): void {
    this.appliedNerfs['requirements'][gameElement.name] = {
      element: gameElement
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

  protected applyDisableNerf(gameElement: GameElement | GameElement[], enabled: boolean = false): void {
    if (Array.isArray(gameElement)) {
      for (const element of gameElement) {
        this.applyDisableNerfSingle(element, enabled);
      }
    } else {
      this.applyDisableNerfSingle(gameElement, enabled);
    }
  }

  private applyDisableNerfSingle(gameElement: GameElement, enabled: boolean = false): void {
    this.appliedNerfs['disabled'][gameElement.name] = {
      element: gameElement,
      initial: gameElement.enabled,
    };
    if (enabled) {
      gameElement.enable();
    } else {
      gameElement.disable();
    }
  }

  revert() {
    this.revertRequirementNerfs();
    this.revertDisableNerfs();
  }

  revertRequirementNerfs(): void {
    Object.values(this.appliedNerfs['requirements']).forEach((value) => {
      value.element.unlocked = value.element.startUnlocked;
      value.element.init();
    })
    this.appliedNerfs['requirements'] = {};
  }

  revertDisableNerfs(): void {
    Object.values(this.appliedNerfs['disabled']).forEach((value) => {
      value.element.enabled = value.initial;
    })
    this.appliedNerfs['disabled'] = {};
  }

  getChallengeElements(): (ChallengeGenerator | ChallengeUpgrade | ChallengeHolding)[] {
    return [
      ...Object.values(this.challengeGenerators),
      ...Object.values(this.challengeUpgrades),
      ...Object.values(this.challengeHoldings),
    ];
  }

  start(): void {
    this.init();
    this.tryLoadChallengeElements();
    this.nerfs()
    this.getChallengeElements().forEach((value: ChallengeGenerator | ChallengeUpgrade | ChallengeHolding) => {
      if (!(value instanceof Holding)) {
        value.unlock();
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
    if (!this.isCompleted()) {
      StatsService.addNum(this.name, 'totalCompletions', new Num(1, 0));

      if (this.completed instanceof Num) {
        this.completed = this.completed.add(new Num(1, 0));
      } else {
        this.completed = true;
      }
    }
  }

  requirementSatisfied(amount: Num): boolean {
    return amount.greq(this.getCompletions());
  }

  getCompletions(): Num {
    if (this.completed instanceof Num) {
      return this.completed;
    } else if (this.completed) {
      return new Num(1, 0);
    } else {
      return new Num(0, 0);
    }
  }

  /**
   * Register a nerf function that will be called during constantNerfs()
   * @param key Unique identifier for the nerf function
   * @param nerfFunction The function to call
   */
  registerNerfFunction(key: string, nerfFunction: () => void): void {
    this.nerfFunctions[key] = nerfFunction;
  }

  /**
   * Unregister a specific nerf function
   * @param key The identifier of the nerf function to remove
   */
  unregisterNerfFunction(key: string): void {
    delete this.nerfFunctions[key];
  }

  /**
   * Unregister all nerf functions
   */
  unregisterAllNerfFunctions(): void {
    this.nerfFunctions = {};
  }
}
