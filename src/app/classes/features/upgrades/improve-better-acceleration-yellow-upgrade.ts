import {YellowUpgrade} from "./yellow-upgrade";
import {Num} from "../../../num";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Enhancement} from "../enhancements/enhancement";

export class ImproveBetterAccelerationYellowUpgrade extends YellowUpgrade {
  displayName: string = 'Improve Better Acceleration';
  constructor(name: string) {
    super(name, 'improve-better-acceleration-yellow');
  }

  override buffer: Num = new Num(1.5, 0);
  override baseBuffer: Num = new Num(1.5, 0);

  getDescription(): string {
    return "Better Acceleration is increased by " + this.buffer.toString(2);
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.improveRedAcceleratorsEffect.buffer = UpgradeRecord.improveRedAcceleratorsEffect.buffer.add(this.buffer);
    }
    return;
  }

  override canEnhance(): boolean {
    return true;
  }

  override enhancementString(enhancement: Enhancement): string {
    return `Increase Better Acceleration by ${this.buffer.mul(enhancement.getMultiplier()).toString(2)}.`;
  }

  override enhance(): void {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.enhancement.getMultiplier());
    }
  }

  override limit: Num = new Num(1, 0);
  baseCost: Num = new Num(2, 2);
  cost: Num = new Num(2, 2);
}
