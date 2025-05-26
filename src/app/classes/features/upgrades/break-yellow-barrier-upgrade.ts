import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Requirement} from "../interfaces/requirement";
import {Milestone} from "../milestone";
import {MilestoneRecord} from "../../records/milestones/milestone-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class BreakYellowBarrierUpgrade extends YellowUpgrade {
  displayName: string = 'Break Yellow Barrier';
  override style: Styles = Styles.YELLOW_SUPER;

  constructor(name: string) {
    super(name, 'break-yellow-barrier', true);
    this.requirement = [
       new Requirement(HoldingRecord.yellowPrestiges, new Num(5, 2), this),
    ];
  }
  override calculationOrder: number = 1;

  getDescription(): string {
    return "Break yellow barrier to be able to gain more red particles and booster accelerations are unlimited";
  }

  action(): undefined {
    if (this.hasBought()) {
      PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = false;
      UpgradeRecord.boosterAccelerationUpgrade.limit = new Num(1, 10);
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
}
