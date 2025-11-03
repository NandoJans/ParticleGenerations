import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class UnlockFifthYellowGeneratorUpgrade extends YellowUpgrade {
  displayName: string = 'Unlock Fifth Yellow Generator';
  constructor(name: string) {
    super(name, 'unlock-fifth-yellow-generator', true);
    // Defer requirement setup to avoid circular init with UpgradeRecord
    this.requirement = [];
  }

  override tryLoad(): void {
    // Lazily set requirement once UpgradeRecord is fully initialized
    if (!this.requirement || this.requirement.length === 0) {
      this.requirement = [
        new Requirement(UpgradeRecord.breakYellowBarrier, new Num(1, 0), this),
      ];
    }
    super.tryLoad();
  }

  getDescription(): string {
    return "Unlocks the fifth yellow generator.";
  }

  action(): undefined {
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 145);
  cost: Num = new Num(1, 145);
}
