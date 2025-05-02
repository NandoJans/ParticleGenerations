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
    if (progress.lte(new Num(0, 0))) {
      return 0;
    } else if (goal.greq(new Num(1, 10))) {
      return progress.log(10)
        .div(goal.log(10))
        .mul(new Num(1, 2))
        .toNumber();
    } else {
      return progress.div(goal).mul(new Num(1, 2)).toNumber()
    }
  }

  getProgressString(): string {
    const progress = this.automator.taskString();
    const goal = this.automator.goal;

    return `${progress} / ${goal.toString()}`;
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

  getActive(): boolean {
    return this.automator.active;
  }

  hasMaxBuys() {
    return this.automator.hasMaxBuys()
  }

  setMaxBuys(event: any) {
    this.automator.maxBuys = this.getNumFromString(event.target.value);
  }

  getNumFromString(value: string): Num {
    if (value.includes("e")) {
      const parts = value.split("e");
      const base = parseFloat(parts[0]);
      const exponent = parseInt(parts[1]);
      return new Num(base, exponent);
    } else {
      const num = parseFloat(value);
      return new Num(num, 0);
    }
  }

  getMaxBuys(): string {
    return this.automator.maxBuys?.toString() ?? "";
  }
}
