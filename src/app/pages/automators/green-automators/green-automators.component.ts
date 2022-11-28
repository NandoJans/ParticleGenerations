import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../globals";
import {AutomatorService} from "../../../services/interactables/automator.service";

@Component({
  selector: 'app-green-automators',
  templateUrl: './green-automators.component.html',
  styleUrls: ['./green-automators.component.css']
})
export class GreenAutomatorsComponent implements OnInit {
  automators: Automator[] = [];
  constructor() { }

  ngOnInit(): void {
    this.automators = AutomatorService.getAutomators('green-automators')
  }
}
