import {Component, Input, OnInit} from '@angular/core';
import {Automator} from "../../../globals";
import {FormControl, FormGroup} from "@angular/forms";
import {Num} from "../../../num";
import {AutomatorService} from "../../../services/interactables/automator.service";
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-automator',
  templateUrl: './automator.component.html',
  styleUrls: ['./automator.component.css']
})
export class AutomatorComponent implements OnInit {
  @Input() automator: Automator | undefined;
  @Input() isPrestigeAutomator: boolean = false;
  formGroup: FormGroup = new FormGroup({
    waitFor: new FormControl(),
    active: new FormControl()
  });
  waitForValue: string | undefined;
  activeValue: boolean | undefined;
  name: string | undefined;
  displayName: string | undefined;
  cost: Num | undefined;
  currency: string | undefined;
  style: string | undefined;

  constructor() { }

  setAutomationType(type: string) {
    if (typeof this.name === 'string') {
      AutomatorService.setValue(this.name, 'prestigeType', type)
    }
  }

  getAutomationType() {
    if (typeof this.name === 'string') {
      return AutomatorService.getValue(this.name, 'prestigeType')
    }
  }

  onChange() {
    AutomatorService.setActive(this.name, this.formGroup.value.active)
    if (this.isPrestigeAutomator) AutomatorService.setWaitFor(this.name, this.formGroup.value.waitFor)
  }

  ngOnInit(): void {
    this.name = this.automator?.name;
    this.displayName = this.automator?.displayName;
    this.cost = this.automator?.cost;
    this.currency = this.automator?.currency;
    this.style = this.automator?.style;
    this.waitForValue = AutomatorService.getWaitFor(this.name).toString();
    this.activeValue = AutomatorService.getActive(this.name);
  }

}
