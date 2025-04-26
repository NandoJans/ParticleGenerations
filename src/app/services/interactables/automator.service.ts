import { Injectable } from '@angular/core';
import {AutomatorRecord} from "../../classes/records/automators/automator-record";

@Injectable({
  providedIn: 'root'
})
export class AutomatorService {
  constructor(
    private automatorRecord: AutomatorRecord
  ) {}


  tick() {
    this.automatorRecord.runAutomators();
  }
}
