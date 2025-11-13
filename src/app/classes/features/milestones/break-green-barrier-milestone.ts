import {GreenMilestone} from "./green-milestone";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {Num} from "../../../num";

export class BreakGreenBarrierMilestone extends GreenMilestone {
  constructor(name: string) {
    super(
      name,
      "Break green barrier",
      new Num(3, 0)
    );
  }

  override getDescription(): string | string[] {
      return "Break the green barrier";
  }

  override action() {
    PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow = false;
  }
}
