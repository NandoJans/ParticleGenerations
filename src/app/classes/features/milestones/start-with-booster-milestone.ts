import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {ResetKey} from "../../enums/reset-key";

export class StartWithBoosterMilestone extends YellowMilestone {
  name: string = 'red-booster-no-reset';
  displayName: string = 'Red booster starter';
  goal: Num = new Num(1, 1);

  action(): Num | undefined {
    ResetHelper.setResetId(UpgradeRecord.unlockRedGeneratorBooster, ResetKey.YELLOW);
    return undefined;
  }

  getDescription(): string {
    return "You start with red boosters unlocked.";
  }

}
