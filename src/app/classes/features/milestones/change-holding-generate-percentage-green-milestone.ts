import {GreenMilestone} from "./green-milestone";
import {Num} from "../../../num";
import {Multiplier} from "../multiplier";

export class ChangeHoldingGeneratePercentageGreenMilestone extends GreenMilestone {
  multiplier: Multiplier;
  percentage: Num;

  constructor(name: string, displayName: string, goal: Num, multiplier: Multiplier, percentage: Num ) {
    super(name, displayName, goal);
    this.multiplier = multiplier;
    this.percentage = percentage;
  }

  override tick(): void {
    this.multiplier.num = this.multiplier.num.add(this.percentage);
  }

  override getDescription(): string {
    const percentage = this.percentage.mul(new Num(1, 2)).toString()
    return `Generate ${percentage}% of fastest green particles per second`;
  }
}
