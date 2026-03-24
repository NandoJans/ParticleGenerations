import { Component } from '@angular/core';
import {AppModule} from "../../../app.module";
import {GreenPrestigeAutomator} from "../../../classes/features/automators/green-prestige-automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
  selector: 'app-green-automators-page',
  templateUrl: './green-automators-page.component.html',
  styleUrl: './green-automators-page.component.css',
  standalone: false
})
export class GreenAutomatorsPageComponent {
  greenPrestigeAutomator: GreenPrestigeAutomator = AutomatorRecord.greenPrestige;

}
