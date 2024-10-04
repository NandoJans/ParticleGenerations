import {Record} from "../record";
import {Milestone} from "../../features/milestone";
import {ThousandRedParticlesMilestone} from "../../features/milestones/thousand-red-particles-milestone";
import {StartWithExtensionsMilestone} from "../../features/milestones/start-with-extensions-milestone";
import {StartWithBoosterMilestone} from "../../features/milestones/start-with-booster-milestone";
import {IdleYellowParticlesMilestone} from "../../features/milestones/idle-yellow-particles-milestone";
import {KeepRedUpgradesMilestone} from "../../features/milestones/keep-red-upgrades-milestone";
import {StartWithMoreRedParticlesMilestone} from "../../features/milestones/start-with-more-red-particles-milestone";
import {PreventExtensionResetMilestone} from "../../features/milestones/prevent-extension-reset-milestone";

export class MilestoneRecord extends Record {

  // Yellow Phase
  static thousandRedParticles: ThousandRedParticlesMilestone = new ThousandRedParticlesMilestone();
  static startWithExtensions: StartWithExtensionsMilestone = new StartWithExtensionsMilestone();
  static startWithBooster: StartWithBoosterMilestone = new StartWithBoosterMilestone();
  static idleYellowParticles: IdleYellowParticlesMilestone = new IdleYellowParticlesMilestone();
  static keepRedUpgrades: KeepRedUpgradesMilestone = new KeepRedUpgradesMilestone();
  static startWithMoreRedParticles: StartWithMoreRedParticlesMilestone = new StartWithMoreRedParticlesMilestone();
  static preventExtensionReset: PreventExtensionResetMilestone = new PreventExtensionResetMilestone();

  // Green Phase

  // Blue Phase

  // Purple Phase

  static override list: Milestone[] = [
    MilestoneRecord.thousandRedParticles,
    MilestoneRecord.startWithExtensions,
    MilestoneRecord.startWithBooster,
    MilestoneRecord.idleYellowParticles,
    MilestoneRecord.keepRedUpgrades,
    MilestoneRecord.startWithMoreRedParticles,
    MilestoneRecord.preventExtensionReset,
  ];

  getList(): Milestone[] {
    return MilestoneRecord.list;
  }


}
