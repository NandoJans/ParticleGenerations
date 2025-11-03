import {YellowUpgrade} from "./yellow-upgrade";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";

export class EmpoweredBoosterAccelerationUpgrade extends YellowUpgrade {
  displayName: string = 'Empowered Booster Acceleration Upgrade';
  constructor(name: string) {
    super(name, 'empowered-booster-acceleration-upgrade', true);
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
    return "Increases the power of booster accelerations by 50%";
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.boosterAccelerationUpgrade.buffer = UpgradeRecord.boosterAccelerationUpgrade.buffer.mul(this.buffer);
    }
    return;
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 12);
  cost: Num = new Num(1, 12);

  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);

}
