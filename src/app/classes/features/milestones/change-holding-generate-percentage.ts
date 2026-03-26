import {YellowMilestone} from "./yellow-milestone";
import {Num} from "../../../num";
import {Multiplier} from "../multiplier";

export class ChangeHoldingGeneratePercentage extends YellowMilestone {
  multiplier: Multiplier;
  percentage: Num;

  constructor(name: string, displayName: string, goal: Num, multiplier: Multiplier, percentage: Num ) {
    super(name, displayName, goal);
    this.multiplier = multiplier;
    this.percentage = percentage;
    // Must run after multiplier reset (calculation order 1150),
    // otherwise the added idle generation gets wiped every tick.
    this.calculationOrder = 1200;
  }

  override tick(): void {
    this.multiplier.num = this.multiplier.num.add(this.percentage);
  }

  override getDescription(): string {
    const percentage = this.percentage.mul(new Num(1, 2)).toString()
    return `Generate ${percentage}% of fastest star particles per second`;
  }
}
