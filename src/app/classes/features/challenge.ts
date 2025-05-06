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
import {Generator} from "./generator";
import {App} from "../../App";
import {Upgrade} from "./upgrade";

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
  override calculationOrder: number = 200;
  challengeUpgrades: {[key: string]: Upgrade} = {};
  challengeHoldings: {[key: string]: Holding} = {};
  challengeGenerators: {[key: string]: Generator} = {};

  override run(): Num | undefined {
    if (this.completed) {
      const reward = this.reward();
      if (reward) {
        this.effect = reward;
      }
      return reward;
    }
    this.buffer = this.baseBuffer.copy();
    return;
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
    this.init();
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey())
    this.unlocked = this.localStorageHelper.load(this.unlocked, "unlocked");

    if (this.completed instanceof Num) {
      this.completed = this.localStorageHelper.loadNum(this.completed, "completed");
    } else {
      this.completed = this.localStorageHelper.load(this.completed, "completed");
    }

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
      gameElement.requirement = value.value;
      gameElement.requirement.forEach((requirement) => {
        requirement.register();
      });
    })
    this.appliedNerfs['requirements'] = {};
  }

  getChallengeElements(): (Generator | ChallengeUpgrade | Holding)[] {
    return [
      ...Object.values(this.challengeGenerators),
      ...Object.values(this.challengeUpgrades),
      ...Object.values(this.challengeHoldings),
    ];
  }

  start(): void {
    this.nerfs()
    this.getChallengeElements().forEach((value: Generator | ChallengeUpgrade | Holding) => {
      if (!(value instanceof Holding)) {
        value.unlocked = true;
      }
      value.reset();
    })
  }

  end(): void {
    this.revert();
    this.getChallengeElements().forEach((value: Generator | ChallengeUpgrade | Holding) => {
      if (!(value instanceof Holding)) {
        value.unlocked = false;
      }
      value.reset();
    })
  }

  private runChallengeUpgrades() {
    this.getChallengeElements().forEach((value: Generator | ChallengeUpgrade | Holding) => {
      value.run(App.gameSpeed);
    })
  }

  getUpgrades(): Upgrade[] {
    return Object.values(this.challengeUpgrades);
  }
}
