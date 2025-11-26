import {GreenMilestone} from "./green-milestone";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class FusionAccelerationBoosterDivideYellowFusionGreenMilestone extends GreenMilestone {
  constructor(name: string) {
    super(
      name, "Fusion Acceleration Booster / Yellow Fusion", new Num(7, 1));
  }

  override action() {
    UpgradeRecord.fusionBoosterAcceleration.divideInsteadOfReset = true;
  }

  override getDescription(): string | string[] {
    return "Buying fusion acceleration booster divides yellow fusion by 1e1000 instead of resetting yellow fusion.";
  }
}
