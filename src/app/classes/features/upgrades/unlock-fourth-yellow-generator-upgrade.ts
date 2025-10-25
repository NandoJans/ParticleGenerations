import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UnlockFourthYellowGeneratorUpgrade extends YellowUpgrade {
  displayName: string = 'Unlock Fourth Yellow Generator';
  constructor(name: string) {
    super(name, 'unlock-fourth-yellow-generator', true);
    this.requirement = [];
  }

  override tryLoad(): void {
    if (!this.requirement || this.requirement.length === 0) {
      this.requirement = [
        new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
      ];
    }
    super.tryLoad();
  }

  getDescription(): string {
    return "Unlocks the fourth yellow generator.";
  }

  action(): undefined {
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 81);
  cost: Num = new Num(1, 81);
}
