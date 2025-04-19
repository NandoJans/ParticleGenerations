import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../globals";
import {AutomatorService} from "../../../services/interactables/automator.service";

@Component({
  selector: 'app-prestige-automators',
  templateUrl: './prestige-automators.component.html',
  styleUrls: ['./prestige-automators.component.css']
})
export class PrestigeAutomatorsComponent implements OnInit {
  automators: Automator[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
