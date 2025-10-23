import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../classes/features/automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
    selector: 'app-yellow-automators',
    templateUrl: './yellow-automators.component.html',
    styleUrls: ['./yellow-automators.component.css'],
    standalone: false
})
export class YellowAutomatorsComponent implements OnInit {
  yellowPrestigeAutomator: Automator[] = [
    AutomatorRecord.yellowPrestige
  ]
  yellowUpgradeAutomators: Automator[] = [
    AutomatorRecord.multiplyRedGeneratorsYellow,
    AutomatorRecord.multiplyYellowParticlesYellow,
    AutomatorRecord.multiplyYellowKeysYellow,
    AutomatorRecord.fusionBoosterAcceleration
  ];
  yellowGeneratorAutomators: Automator[] = [
    AutomatorRecord.firstYellowGenerator,
    AutomatorRecord.secondYellowGenerator,
    AutomatorRecord.thirdYellowGenerator,
    AutomatorRecord.fourthYellowGenerator,
    AutomatorRecord.fifthYellowGenerator,
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
