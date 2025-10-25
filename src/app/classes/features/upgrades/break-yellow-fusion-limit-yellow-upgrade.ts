import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class BreakYellowFusionLimitYellowUpgrade extends YellowUpgrade {
  displayName: string = 'Break Yellow Fusion Limit';
  constructor(name: string) {
    super(name, 'break-yellow-fusion-limit-yellow-upgrade', true);
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
    return "Breaks the yellow fusion barrier of 1e1000.";
  }

  action(): undefined {
    if (this.hasBought()) {
      HoldingRecord.yellowFusion.maxAmount = new Num(1, 1e100);
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 300);
  cost: Num = new Num(1, 300);
}
