import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UnlockFifthYellowGeneratorUpgrade extends YellowUpgrade {
  displayName: string = 'Unlock Fifth Yellow Generator';
  constructor(name: string) {
    super(name, 'unlock-fifth-yellow-generator', true);
    this.requirement = [
      new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
    ];
  }

  getDescription(): string {
    return "Unlocks the fifth yellow generator.";
  }

  action(): undefined {
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 100);
  cost: Num = new Num(1, 100);
}
