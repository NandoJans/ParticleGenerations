import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UnlockFourthYellowGeneratorUpgrade extends YellowUpgrade {
  displayName: string = 'Unlock Fourth Yellow Generator';
  constructor(name: string) {
    super(name, 'unlock-fourth-yellow-generator', true);
    this.requirement = [
      new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
    ];
  }

  getDescription(): string {
    return "Unlocks the fourth yellow generator.";
  }

  action(): undefined {
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
}
