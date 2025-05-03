import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {Styles} from "../../enums/styles";

export class BreakYellowBarrierUpgrade extends YellowUpgrade {
  displayName: string = 'Break Yellow Barrier';
  override style: Styles = Styles.YELLOW_SUPER;

  constructor(name: string) {
    super(name, 'break-yellow-barrier');
  }
  override calculationOrder: number = 1;

  getDescription(): string {
    return "Break yellow barrier to be able to gain more red particles";
  }

  action(): undefined {
    if (this.hasBought()) {
      PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = false;
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
}
