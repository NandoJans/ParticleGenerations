import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class BreakYellowBarrierUpgrade extends YellowUpgrade {
  displayName: string = 'Break Yellow Barrier';
  override style: Styles = Styles.YELLOW_SUPER;

  constructor(name: string) {
    super(name, 'break-yellow-barrier');
  }
  override calculationOrder: number = 1;

  getDescription(): string {
    return "Break yellow barrier to be able to gain more red particles and booster accelerations are unlimited";
  }

  action(): undefined {
    if (this.hasBought()) {
      PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = false;
      UpgradeRecord.boosterAccelerationUpgrade.limit = new Num(6, 1);
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
}
