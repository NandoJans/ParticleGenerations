import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../globals";
import {AutomatorService} from "../../../services/interactables/automator.service";

@Component({
  selector: 'app-blue-automators',
  templateUrl: './blue-automators.component.html',
  styleUrls: ['./blue-automators.component.css']
})
export class BlueAutomatorsComponent implements OnInit {
  automators: Automator[] = [];
  upgradeAutomators: Automator[] = [];

  constructor() { }

  ngOnInit(): void {
    this.automators = AutomatorService.getAutomators('blue-automators')
    this.upgradeAutomators = AutomatorService.getAutomators('blue-upgrade-automators')
  }

}
