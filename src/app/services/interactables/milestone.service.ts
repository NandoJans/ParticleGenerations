import { Injectable } from '@angular/core';
import {MilestoneRecord} from "../../classes/records/milestones/milestone-record";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  constructor(
    private milestoneRecord: MilestoneRecord
  ) {

  }

  getElements() {
    return this.milestoneRecord.getList();
  }
}
