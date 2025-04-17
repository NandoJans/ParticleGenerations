import {BlueLightUpgrade} from "./blue-light-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {MilestoneService} from "../../../services/interactables/milestone.service";
import {MilestoneRecord} from "../../records/milestones/milestone-record";

export class YellowFusionAcceleratorUpgrade extends BlueLightUpgrade {
  override scalingStart = new Num(1, 50);
  override scaling = new Num(1, 1);
  baseCost: Num = new Num(1, 5);
  cost: Num = new Num(1, 5);
  override buffer: Num = new Num(1, 5);
  override baseBuffer: Num = new Num(1, 5);
  displayName: string = "Yellow Fusion Accelerator";
  increase: Num = new Num(1, 2);
  name: string = "yellow-fusion-accelerator";

  action(): Num {
    if (MilestoneService.isReached('quality-of-life-milestone')) {
      this.buffer = new Num(1, 50);
    }
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.yellowFusion.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Makes yellow fusion ${this.buffer.toString(true)}x faster.`;
  }
}
