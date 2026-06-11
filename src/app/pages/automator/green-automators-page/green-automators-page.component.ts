import { Component } from '@angular/core';
import {GreenPrestigeAutomator} from "../../../classes/features/automators/green-prestige-automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
  selector: 'app-green-automators-page',
  templateUrl: './green-automators-page.component.html',
  styleUrls: ['./green-automators-page.component.css', '../../automators-page.shared.css'],
  standalone: false
})
export class GreenAutomatorsPageComponent {
  greenPrestigeAutomator: GreenPrestigeAutomator = AutomatorRecord.greenPrestige;
  infoText: string[] = [
    'Green Automators manage the reset cycle for the cosmic layer.',
    'The Green Prestige Automator can trigger a prestige at a target value, after a delay, or relative to your best run.',
    'Use the global control to quickly enable or disable every available green automation system.',
    'Additional green automation modules will appear here as the phase expands.'
  ];

  getToggleAllText(): string {
    return this.greenPrestigeAutomator.active ? 'Deactivate All' : 'Activate All';
  }

  toggleAll(): void {
    if (this.greenPrestigeAutomator.active) {
      this.greenPrestigeAutomator.deactivate();
    } else {
      this.greenPrestigeAutomator.activate();
    }
  }

  getToggleColor(): string {
    return this.greenPrestigeAutomator.active ? 'red' : 'green';
  }
}
