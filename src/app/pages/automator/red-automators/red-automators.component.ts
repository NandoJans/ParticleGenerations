import { Component, OnInit } from '@angular/core';
import {Automator} from "../../../classes/features/automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
  selector: 'app-red-automators',
  templateUrl: './red-automators.component.html',
  styleUrls: ['./red-automators.component.css']
})
export class RedAutomatorsComponent implements OnInit {
  automators: Automator[] = [
    AutomatorRecord.firstRedGenerator,
    AutomatorRecord.secondRedGenerator,
    AutomatorRecord.thirdRedGenerator,
    AutomatorRecord.fourthRedGenerator,
    AutomatorRecord.fifthRedGenerator,
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
