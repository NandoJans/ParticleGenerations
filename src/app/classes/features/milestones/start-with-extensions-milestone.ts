import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";

export class StartWithExtensionsMilestone extends YellowMilestone {
  name: string = 'red-extensions-no-reset';
  displayName: string = 'Red extensions keeper';
  goal: Num = new Num(5, 0);

  action(): Num | undefined {
    ResetHelper.setResetId(UpgradeRecord.improveRedGeneratorExtension, ResetKey.YELLOW);
    return undefined;
  }

  getDescription(): string {
    return "You start with the red extension upgrade bought.";
  }
}
