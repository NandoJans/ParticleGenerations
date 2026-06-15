import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ChargerRecord} from "../../records/charger/charger-record";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {Requirement} from "../interfaces/requirement";
import {Buyable} from "../buyable";
import {Automator} from "../automator";
import {DarkStarCharger} from "../chargers/dark-star-charger";
import {ChallengeService} from "../../../services/interactables/challenge.service";

export type DarkStarStepGoal = "darkStars" | "time";

export interface DarkStarAutomatorStep {
  id: number;
  name: string;
  goalType: DarkStarStepGoal;
  goal: string;
  delaySeconds: number;
  startDarkGalaxy: boolean;
  activeChargers: string[];
}

export class DarkStarChargerAutomator extends Automator {
  name = "dark-star-charger-automator";
  displayName = "Dark Star Charger Automator";
  style = Styles.DARK_GALAXY;
  resetId = ResetKey.NONE;
  goal = Num.ONE;
  goalString = "Gain 1e6 Nuclear Potential.";
  override completed = true;
  override active = false;
  override calculationOrder = 1050;

  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.nuclearPotential, new Num(1, 6), this)
  ];

  steps: DarkStarAutomatorStep[] = [this.createStep(1)];
  currentStepIndex = 0;
  elapsedSeconds = 0;
  delayElapsedSeconds = 0;
  stepApplied = false;
  loop = true;

  buyables(): Buyable[] {
    return [];
  }

  task(): Num {
    return HoldingRecord.nuclearPotential.amount;
  }

  createStep(id: number = Date.now()): DarkStarAutomatorStep {
    return {
      id,
      name: `Step ${this.steps?.length ? this.steps.length + 1 : 1}`,
      goalType: "darkStars",
      goal: "1",
      delaySeconds: 0,
      startDarkGalaxy: true,
      activeChargers: [],
    };
  }

  override run(speed: Num = Num.ZERO): boolean {
    if (!this.active || !this.isUnlocked() || this.steps.length === 0) {
      return false;
    }

    const seconds = Math.max(0, speed.toNumber());
    const step = this.steps[this.currentStepIndex];
    if (!step) {
      this.resetExecution();
      return false;
    }

    if (!this.stepApplied) {
      this.delayElapsedSeconds += seconds;
      if (this.delayElapsedSeconds < step.delaySeconds) {
        return false;
      }
      this.applyStep(step);
    }

    this.elapsedSeconds += seconds;
    if (this.isStepComplete(step)) {
      this.advanceStep();
      return false;
    }

    this.tierUpReadyChargers(step);
    return false;
  }

  private applyStep(step: DarkStarAutomatorStep): void {
    const selected = new Set(step.activeChargers);
    ChargerRecord.darkStarChargerList.forEach(charger => {
      if (selected.has(charger.saveName) && charger.isUnlocked()) {
        charger.startCharging();
      } else {
        charger.stopCharging();
      }
    });

    if (
      step.startDarkGalaxy &&
      ChallengeRecord.currentChallenges[ChallengeRecord.darkGalaxy.prestigeLayer] !== ChallengeRecord.darkGalaxy &&
      ChallengeRecord.darkGalaxy.isUnlocked()
    ) {
      ChallengeService.startChallenge(ChallengeRecord.darkGalaxy);
    }

    this.stepApplied = true;
    this.elapsedSeconds = 0;
  }

  private isStepComplete(step: DarkStarAutomatorStep): boolean {
    if (step.goalType === "time") {
      return this.elapsedSeconds >= this.parseSeconds(step.goal);
    }
    return ChallengeRecord.darkGalaxy.currentDarkStarGain.greq(this.parseNum(step.goal));
  }

  private tierUpReadyChargers(step: DarkStarAutomatorStep): void {
    const selected = new Set(step.activeChargers);
    ChargerRecord.darkStarChargerList.forEach(charger => {
      if (selected.has(charger.saveName) && charger.canTierUp()) {
        charger.tierUp();
      }
    });
  }

  private advanceStep(): void {
    if (this.currentStepIndex + 1 < this.steps.length) {
      this.currentStepIndex++;
    } else if (this.loop) {
      this.currentStepIndex = 0;
    } else {
      this.deactivate();
      return;
    }

    this.elapsedSeconds = 0;
    this.delayElapsedSeconds = 0;
    this.stepApplied = false;
    this.save();
  }

  private parseNum(value: string): Num {
    const normalized = String(value).trim().replace(/,/g, "");
    const parts = normalized.toLowerCase().split("e");
    const mantissa = Number(parts[0]);
    const exponent = parts.length > 1 ? Number(parts[1]) : 0;
    if (!Number.isFinite(mantissa) || !Number.isFinite(exponent)) {
      return Num.ZERO;
    }
    return new Num(mantissa, exponent);
  }

  private parseSeconds(value: string): number {
    const seconds = Number(value);
    return Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  }

  getCurrentStep(): DarkStarAutomatorStep | undefined {
    return this.steps[this.currentStepIndex];
  }

  getStepProgress(): string {
    const step = this.getCurrentStep();
    if (!step) return "No steps configured";
    if (!this.stepApplied) {
      return `Waiting ${this.delayElapsedSeconds.toFixed(1)} / ${step.delaySeconds.toFixed(1)}s`;
    }
    if (step.goalType === "time") {
      return `${this.elapsedSeconds.toFixed(1)} / ${this.parseSeconds(step.goal).toFixed(1)}s`;
    }
    return `${ChallengeRecord.darkGalaxy.currentDarkStarGain.toString(2)} / ${this.parseNum(step.goal).toString(2)} Dark Stars`;
  }

  getChargers(): DarkStarCharger[] {
    return ChargerRecord.darkStarChargerList;
  }

  addStep(): void {
    this.steps.push(this.createStep());
    this.save();
  }

  removeStep(index: number): void {
    if (this.steps.length === 1) return;
    this.steps.splice(index, 1);
    if (this.currentStepIndex >= this.steps.length) {
      this.currentStepIndex = 0;
    }
    this.resetExecution();
    this.save();
  }

  moveStep(index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= this.steps.length) return;
    [this.steps[index], this.steps[target]] = [this.steps[target], this.steps[index]];
    this.resetExecution();
    this.save();
  }

  setChargerActive(step: DarkStarAutomatorStep, chargerName: string, active: boolean): void {
    const chargers = new Set(step.activeChargers);
    active ? chargers.add(chargerName) : chargers.delete(chargerName);
    step.activeChargers = [...chargers];
    this.save();
  }

  override activate(): void {
    this.active = true;
    this.resetExecution();
    this.save();
  }

  override deactivate(): void {
    this.active = false;
    this.save();
  }

  resetExecution(): void {
    this.currentStepIndex = 0;
    this.elapsedSeconds = 0;
    this.delayElapsedSeconds = 0;
    this.stepApplied = false;
  }

  override reset(): void {
    this.deactivate();
    this.resetExecution();
  }

  override save(): void {
    super.save();
    this.localStorageHelper.save(this.steps, "steps");
    this.localStorageHelper.save(this.currentStepIndex, "currentStepIndex");
    this.localStorageHelper.save(this.elapsedSeconds, "elapsedSeconds");
    this.localStorageHelper.save(this.delayElapsedSeconds, "delayElapsedSeconds");
    this.localStorageHelper.save(this.stepApplied, "stepApplied");
    this.localStorageHelper.save(this.loop, "loop");
  }

  override tryLoad(): void {
    super.tryLoad();
    const savedSteps = this.localStorageHelper.load(this.steps, "steps");
    if (Array.isArray(savedSteps) && savedSteps.length > 0) {
      this.steps = savedSteps.map((step, index) => this.normalizeStep(step, index));
    }
    this.currentStepIndex = this.localStorageHelper.load(0, "currentStepIndex");
    this.elapsedSeconds = this.localStorageHelper.load(0, "elapsedSeconds");
    this.delayElapsedSeconds = this.localStorageHelper.load(0, "delayElapsedSeconds");
    this.stepApplied = this.localStorageHelper.load(false, "stepApplied");
    this.loop = this.localStorageHelper.load(true, "loop");
    this.completed = true;
    if (this.currentStepIndex >= this.steps.length) {
      this.resetExecution();
    }
  }

  private normalizeStep(step: Partial<DarkStarAutomatorStep>, index: number): DarkStarAutomatorStep {
    return {
      id: typeof step.id === "number" ? step.id : Date.now() + index,
      name: typeof step.name === "string" ? step.name : `Step ${index + 1}`,
      goalType: step.goalType === "time" ? "time" : "darkStars",
      goal: typeof step.goal === "string" ? step.goal : "1",
      delaySeconds: typeof step.delaySeconds === "number" ? Math.max(0, step.delaySeconds) : 0,
      startDarkGalaxy: step.startDarkGalaxy !== false,
      activeChargers: Array.isArray(step.activeChargers)
        ? step.activeChargers.filter(name => typeof name === "string")
        : [],
    };
  }
}
