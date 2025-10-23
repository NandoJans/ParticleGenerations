import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../classes/features/automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
    selector: 'app-red-automators',
    templateUrl: './red-automators.component.html',
    styleUrls: ['./red-automators.component.css'],
    standalone: false
})
export class RedAutomatorsComponent implements OnInit {
  redGeneratorAutomators: Automator[] = [
    AutomatorRecord.firstRedGenerator,
    AutomatorRecord.secondRedGenerator,
    AutomatorRecord.thirdRedGenerator,
    AutomatorRecord.fourthRedGenerator,
    AutomatorRecord.fifthRedGenerator,
  ];
  redUpgradeAutomators: Automator[] = [
    AutomatorRecord.redGeneratorExtension,
    AutomatorRecord.redGeneratorBooster,
  ];
  redAcceleratorAutomators: Automator[] = [
    AutomatorRecord.multiplyRedAccelerationGeneration,
    AutomatorRecord.multiplyRedAcceleratorEffect,
    AutomatorRecord.improveRedAcceleratorsEffect,
    AutomatorRecord.improveRedParticlesToAccelerators,
    AutomatorRecord.boosterAcceleration,
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
