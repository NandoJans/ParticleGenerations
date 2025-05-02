import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../classes/features/automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
  selector: 'app-yellow-automators',
  templateUrl: './yellow-automators.component.html',
  styleUrls: ['./yellow-automators.component.css']
})
export class YellowAutomatorsComponent implements OnInit {
  yellowPrestigeAutomator: Automator[] = [
    AutomatorRecord.yellowPrestige
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
