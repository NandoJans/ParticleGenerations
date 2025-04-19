import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../globals";
import {AutomatorService} from "../../../services/interactables/automator.service";

@Component({
  selector: 'app-red-automators',
  templateUrl: './red-automators.component.html',
  styleUrls: ['./red-automators.component.css']
})
export class RedAutomatorsComponent implements OnInit {
  automators: Automator[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}
