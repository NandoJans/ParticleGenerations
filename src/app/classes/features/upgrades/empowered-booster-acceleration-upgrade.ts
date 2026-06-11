import {YellowUpgrade} from "./yellow-upgrade";
import {Requirement} from "../interfaces/requirement";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Enhancement} from "../enhancements/enhancement";

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
    return "Increases the power of booster accelerations by " + this.buffer.sub(Num.ONE).mul(new Num(1, 2)).toString(0) + "%";
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


  override canEnhance(): boolean {
    return true;
  }

  private getEnhancementPower(enhancement: Enhancement): Num {
    return enhancement.getMultiplier().mul(new Num(2, 0));
  }

  override enhancementString(enhancement: Enhancement): string {
    return "Increase the power of booster accelerations by " +
      this.buffer.mul(this.getEnhancementPower(enhancement))
      .sub(Num.ONE)
      .mul(new Num(1, 2))
      .toString(0) +
      "%";
  }
  override enhance() {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.getEnhancementPower(this.enhancement));
    }
  }

}
