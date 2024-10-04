import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {ResetKey} from "../../enums/reset-key";

export class PreventExtensionResetMilestone extends YellowMilestone {
  name: string = 'no-red-extension-reset';
  displayName: string = 'Red extension banner';
  goal: Num = new Num(5, 3);

  action(): Num | undefined {
    UpgradeRecord.redGeneratorExtension.resets = ResetKey.NONE;
    return undefined;
  }

  getDescription(): string {
    return "Red extensions don\'t reset generators.";
  }
}
