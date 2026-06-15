import { Component } from '@angular/core';
import {GreenPrestigeAutomator} from "../../../classes/features/automators/green-prestige-automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";
import {DarkStarChargerAutomator} from "../../../classes/features/automators/dark-star-charger-automator";

@Component({
  selector: 'app-green-automators-page',
  templateUrl: './green-automators-page.component.html',
  styleUrls: ['./green-automators-page.component.css', '../../automators-page.shared.css'],
  standalone: false
})
export class GreenAutomatorsPageComponent {
  greenPrestigeAutomator: GreenPrestigeAutomator = AutomatorRecord.greenPrestige;
  darkStarChargerAutomator: DarkStarChargerAutomator = AutomatorRecord.darkStarCharger;
  infoText: string[] = [
    'Green Automators manage the reset cycle for the cosmic layer.',
    'The Green Prestige Automator can trigger a prestige at a target value, after a delay, or relative to your best run.',
    'The Dark Star Charger Automator runs a programmable sequence of charger configurations, delays, Dark Star goals, and Dark Galaxy entries.',
    'Use the global control to quickly enable or disable every available green automation system.',
  ];

  getToggleAllText(): string {
    return this.greenPrestigeAutomator.active || this.darkStarChargerAutomator.active ? 'Deactivate All' : 'Activate All';
  }

  toggleAll(): void {
    if (this.greenPrestigeAutomator.active || this.darkStarChargerAutomator.active) {
      this.greenPrestigeAutomator.deactivate();
      this.darkStarChargerAutomator.deactivate();
    } else {
      this.greenPrestigeAutomator.activate();
      this.darkStarChargerAutomator.activate();
    }
  }

  getToggleColor(): string {
    return this.greenPrestigeAutomator.active || this.darkStarChargerAutomator.active ? 'red' : 'green';
  }
}
