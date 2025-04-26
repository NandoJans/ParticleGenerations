import { Injectable } from '@angular/core';
import {AutomatorRecord} from "../../classes/records/automators/automator-record";
import {DropDownMessageService} from "../visuals/drop-down-message.service";
import {Automator} from "../../classes/features/automator";

@Injectable({
  providedIn: 'root'
})
export class AutomatorService {
  constructor(
    private automatorRecord: AutomatorRecord,
    private dropDownMessageService: DropDownMessageService,
  ) {}

  tick() {
    const completedAutomators = this.automatorRecord.runAutomators();
    if (completedAutomators.length > 0) {
      this.notifyUnlocks(completedAutomators);
    }
  }

  notifyUnlocks(automators: Automator[]) {
    if (automators.length == 1) {
      this.dropDownMessageService.dropDown('Automator Unlocked', 'You have unlocked a new automator: ' + automators[0].displayName + '.');
    } else {
      const automatorNames = automators.map(automator => automator.displayName).join(', ');
      this.dropDownMessageService.dropDown('Automators Unlocked', 'You have unlocked new automators: ' + automatorNames + '.');
    }
  }

}
