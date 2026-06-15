import {Component, Input} from "@angular/core";
import {
  DarkStarAutomatorStep,
  DarkStarChargerAutomator,
  DarkStarStepGoal
} from "../../../classes/features/automators/dark-star-charger-automator";
import {DarkStarCharger} from "../../../classes/features/chargers/dark-star-charger";

@Component({
  selector: "app-dark-star-automator",
  templateUrl: "./dark-star-automator.component.html",
  styleUrl: "./dark-star-automator.component.css",
  standalone: false
})
export class DarkStarAutomatorComponent {
  @Input({required: true}) automator!: DarkStarChargerAutomator;

  updateStep(): void {
    this.automator.save();
  }

  setGoalType(step: DarkStarAutomatorStep, value: string): void {
    step.goalType = value as DarkStarStepGoal;
    this.updateStep();
  }

  setDelay(step: DarkStarAutomatorStep, value: string): void {
    const delay = Number(value);
    step.delaySeconds = Number.isFinite(delay) ? Math.max(0, delay) : 0;
    this.updateStep();
  }

  isChargerActive(step: DarkStarAutomatorStep, charger: DarkStarCharger): boolean {
    return step.activeChargers.includes(charger.saveName);
  }

  setChargerActive(step: DarkStarAutomatorStep, charger: DarkStarCharger, event: Event): void {
    this.automator.setChargerActive(
      step,
      charger.saveName,
      (event.target as HTMLInputElement).checked
    );
  }

  toggleActive(): void {
    this.automator.active ? this.automator.deactivate() : this.automator.activate();
  }

  trackStep(_index: number, step: DarkStarAutomatorStep): number {
    return step.id;
  }
}
