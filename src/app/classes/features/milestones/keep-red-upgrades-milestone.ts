import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {RedUpgradeRecord} from "../../records/upgrades/red-upgrade-record";
import {RedUpgrade} from "../upgrades/red-upgrade";

export class KeepRedUpgradesMilestone extends YellowMilestone {
  name: string = 'red-upgrades-no-reset';
  displayName: string = 'Red upgrades keeper';
  goal: Num = new Num(5, 1);

  action(): Num | undefined {
    RedUpgradeRecord.list.forEach((upgrade: RedUpgrade) => {
      ResetHelper.setResetId(upgrade, ResetKey.YELLOW);
    });
    return undefined;
  }

  getDescription(): string {
    return "You keep your red upgrades on going yellow.";
  }

}
