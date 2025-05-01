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

  // Keep Red Generator Automators
  static keepFirstRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepFirstRedGenAuto',
    'Keep First Red Generator Automator',
    new Num(1, 0),
    AutomatorRecord.firstRedGenerator
  )
  static keepSecondRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepSecondRedGenAuto',
    'Keep Second Red Generator Automator',
    new Num(2, 0),
    AutomatorRecord.secondRedGenerator
  )
  static keepThirdRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepThirdRedGenAuto',
    'Keep Third Red Generator Automator',
    new Num(3, 0),
    AutomatorRecord.thirdRedGenerator
  )
  static keepFourthRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepFourthRedGenAuto',
    'Keep Fourth Red Generator Automator',
    new Num(4, 0),
    AutomatorRecord.fourthRedGenerator
  )
  static keepFifthRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepFifthRedGenAuto',
    'Keep Fifth Red Generator Automator',
    new Num(5, 0),
    AutomatorRecord.fifthRedGenerator
  )

  // Keep Other Automators
  static keepRedGenBoosterAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepRedGenBoosterAuto',
    'Keep Red Generator Booster Automator',
    new Num(6, 0),
    AutomatorRecord.redGeneratorBooster
  )
  static keepRedExtensionAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepRedExtensionAuto',
    'Keep Red Extension Automator',
    new Num(1, 1),
    AutomatorRecord.redGeneratorExtension
  )


  // Green Phase

  // Blue Phase

  // Purple Phase

  static override list: Milestone[] = [
    // Keep Red Generator Automators
    MilestoneRecord.keepFirstRedGenAuto,
    MilestoneRecord.keepSecondRedGenAuto,
    MilestoneRecord.keepThirdRedGenAuto,
    MilestoneRecord.keepFourthRedGenAuto,
    MilestoneRecord.keepFifthRedGenAuto,

    // Keep Other Automators
    MilestoneRecord.keepRedGenBoosterAuto,
    MilestoneRecord.keepRedExtensionAuto
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
