import {GreenMilestone} from "./green-milestone";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class BreakGreenBarrierMilestone extends GreenMilestone {
  constructor(name: string) {
    super(
      name,
      "Break green barrier",
      new Num(3, 0)
    );
  }

  override getDescription(): string | string[] {
      return ["Break the green barrier", "Keep yellow barrier broken"];
  }

  override action() {
    PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow = false;
    PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = false;
    UpgradeRecord.breakYellowBarrier.unlock();
    UpgradeRecord.breakYellowBarrier.bought = new Num(1, 0);
    UpgradeRecord.breakYellowBarrier.amount = new Num(1, 0);
  }
}
