import {Component} from '@angular/core';
import {AutomatorRecord} from '../../../classes/records/automators/automator-record';

@Component({
  selector: 'app-blue-automators-page',
  templateUrl: './blue-automators-page.component.html',
  styleUrls: ['./blue-automators-page.component.css', '../../automators-page.shared.css'],
  standalone: false,
})
export class BlueAutomatorsPageComponent {
  yellowOneTimeUpgrades = AutomatorRecord.yellowOneTimeUpgrades;
  infoText = [
    'Blue Automators coordinate automation unlocked on the approach to the blue phase.',
    'The pre-blue automator purchases affordable one-time yellow upgrades from both before and after the yellow barrier.',
    'It unlocks after you have bought yellow one-time upgrades a total of 500 times.',
  ];
}
