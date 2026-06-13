import {GreenMilestone} from "./green-milestone";
import {Num} from "../../../num";
import {Holding} from "../holding";

export class StartWithHoldingAmountGreenMilestone extends GreenMilestone {
  holding: Holding|Holding[];
  startAmount: Num;
  groupName: string;
  private readonly originalStartAmounts = new Map<Holding, Num>();

  constructor(name: string, displayName: string, goal: Num, holding: Holding|Holding[], startAmount: Num, groupName: string) {
    super(name, displayName, goal);
    this.holding = holding;
    this.startAmount = startAmount;
    this.groupName = groupName;
    this.getHoldings().forEach(holding => {
      this.originalStartAmounts.set(holding, holding.startAmount.copy());
    });
  }

  override tick(): undefined {
    if (Array.isArray(this.holding)) {
      this.holding.forEach(holding => {
        this.correctHoldingAmount(holding);
      });
    } else {
      this.correctHoldingAmount(this.holding);
    }
  }

  private correctHoldingAmount(holding: Holding) {
    holding.startAmount = this.startAmount.copy();
    if (holding.amount.lt(this.startAmount)) {
      holding.amount = this.startAmount.copy();
    }
  }

  override reset(): void {
    super.reset();
    this.getHoldings().forEach(holding => {
      holding.startAmount = this.originalStartAmounts.get(holding)?.copy() ?? Num.ZERO.copy();
      holding.reset();
      holding.save();
    });
  }

  private getHoldings(): Holding[] {
    return Array.isArray(this.holding) ? this.holding : [this.holding];
  }

  override getDescription(): string|string[] {
    return "Start with "+this.startAmount.toString()+" "+this.groupName+" on green prestige.";
  }
}
