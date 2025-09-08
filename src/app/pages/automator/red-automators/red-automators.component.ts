import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../classes/features/automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
  selector: 'app-red-automators',
  templateUrl: './red-automators.component.html',
  styleUrls: ['./red-automators.component.css']
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
  infoText: string[] = [
    'Red Automators handle automatic purchasing of red layer upgrades and generators.',
    'Generator Automators automatically buy red generators when you can afford them.',
    'Upgrade Automators manage red extensions and boosters automatically.',
    'Accelerator Automators handle all red accelerator-related purchases.',
    'Configure automators to optimize your idle progression and reduce manual clicking.',
    'Automators unlock as you progress and can dramatically improve your efficiency!'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
