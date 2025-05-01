import {Record} from "../record";
import {Milestone} from "../../features/milestone";
import {ChangeResetKeyYellowMilestone} from "../../features/milestones/change-reset-key-yellow-milestone";
import {Num} from "../../../num";
import {AutomatorRecord} from "../automators/automator-record";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MilestoneRecord extends Record {

  // Yellow Phase
  static keepFirstRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keep-first-red-gen-auto',
    'Keep First Red Generator Automator',
    new Num(1, 0),
    AutomatorRecord.firstRedGenerator
  )
  // Green Phase

  // Blue Phase

  // Purple Phase

  static override list: Milestone[] = [
    MilestoneRecord.keepFirstRedGenAuto,
  ];

  getList(): Milestone[] {
    return MilestoneRecord.list;
  }

  save() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.save()
    })
  }

  load() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.tryLoad()
    })
  }

  run() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.run()
    })
  }
}
