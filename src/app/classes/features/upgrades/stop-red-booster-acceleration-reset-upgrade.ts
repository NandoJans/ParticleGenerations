import {YellowUpgrade} from "./yellow-upgrade";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";

export class StopRedBoosterAccelerationResetUpgrade extends YellowUpgrade {
  displayName: string = 'Red Booster Acceleration Reset';
  constructor(name: string) {
    super(name, 'stop-red-booster-acceleration-reset', true);
    this.requirement = [
      new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
    ];
  }

  getDescription(): string {
    return "Red booster acceleration no longer resets anything.";
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.boosterAccelerationUpgrade.resets = ResetKey.NONE
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 25);
  cost: Num = new Num(1, 25);
}
