import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../globals";
import {AutomatorService} from "../../../services/interactables/automator.service";

@Component({
  selector: 'app-yellow-automators',
  templateUrl: './yellow-automators.component.html',
  styleUrls: ['./yellow-automators.component.css']
})
export class YellowAutomatorsComponent implements OnInit {
  automators: Automator[] = [];
  constructor() { }

  ngOnInit(): void {
    this.automators = AutomatorService.getAutomators('yellow-automators')
  }
}
