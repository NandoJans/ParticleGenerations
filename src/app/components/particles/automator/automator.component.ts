import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Num} from "../../../num";
import {Automator} from "../../../classes/features/automator";
import {AutomatorRecord} from "../../../classes/records/automators/automator-record";

@Component({
  selector: 'app-automator',
  templateUrl: './automator.component.html',
  styleUrls: ['./automator.component.css']
})
export class AutomatorComponent implements OnInit {
  @Input() automator: Automator = AutomatorRecord.firstRedGenerator;
  @Input() isPrestigeAutomator: boolean = false;
  formGroup: FormGroup = new FormGroup({
    waitFor: new FormControl(),
    active: new FormControl()
  });

  constructor() { }

  setAutomationType(type: string) {
    return ""
  }

  getAutomationType() {
    return ""
  }

  onChange() {
  }

  ngOnInit(): void {
  }

  completed() {
    return this.automator.completed;
  }

  getGoalString(): string {
    return this.automator.goalString;
  }

  getProgressPercentage(): number {
    const progress = this.automator.task();
    const goal = this.automator.goal;
    if (goal.greq(new Num(1, 10))) {
      return progress.log10(false)
        .div(goal.log10(false), false)
        .mul(new Num(1, 2), false)
        .convertToNumber();
    } else {
      return progress.div(goal, false).mul(new Num(1, 2)).convertToNumber();
    }
  }

  getProgressString(): string {
    const progress = this.automator.task();
    const goal = this.automator.goal;

    return `${progress.toString()} / ${goal.toString()}`;
  }

  getChecked(): boolean {
    return this.automator.active;
  }

  setActive(event: any) {
    if (event.target.checked) {
      this.automator.enable();
    } else {
      this.automator.disable();
    }
  }
}
