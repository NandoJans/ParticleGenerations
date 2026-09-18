import { Injectable } from '@angular/core';
import {AutomatorRecord} from "../../classes/records/automators/automator-record";
import {DropDownMessageService} from "../visuals/drop-down-message.service";
import {Automator} from "../../classes/features/automator";
import {Generator} from "../../classes/features/generator";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";

@Injectable({
  providedIn: 'root'
})
export class AutomatorService {
  constructor(
    private automatorRecord: AutomatorRecord,
    private generatorRecord: GeneratorRecord,
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

  load() {
    this.automatorRecord.getList().forEach(automator => {
      automator.tryLoad();
    });
  }

  save() {
    this.automatorRecord.getList().forEach(automator => {
      automator.save();
    });
  }

  init() {
    this.automatorRecord.bindGenerators(this.generatorRecord);
    this.automatorRecord.getList().forEach(automator => {
      automator.init();
    });
  }

  getElements(): Automator[] {
    return this.automatorRecord.getList();
  }
}
