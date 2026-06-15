import {Upgrade} from "../upgrade";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Transaction} from "../interfaces/transaction";

export abstract class StarKeyUpgrade extends Upgrade {
  type: string = "star-key-upgrade";
  resetId: ResetKey;
  name: string;
  requirement: Requirement[];

  protected constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(HoldingRecord.yellowParticles, new Num(1, 350), this),
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
  }

  override run(): Num | undefined {
    if (this.hasBought() && this.currency === HoldingRecord.starKeys && !UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.hasBought()) {
      HoldingRecord.starKeys.starKeyUpgradesBought = HoldingRecord.starKeys.starKeyUpgradesBought.add(new Num(1, 0));
    }
    return super.run();
  }

  override requirementsMet(): boolean {
    return (
      UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.hasBought()
      && HoldingRecord.yellowParticles.amount.greq(new Num(1, 40))
    ) || super.requirementsMet();
  }

  override correctCost(): void {
    super.correctCost();
    if (UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.hasBought()) {
      this.cost = Num.ZERO.copy();
    }
  }

  override buy(amount?: Num): Transaction {
    const transaction = super.buy(amount);
    if (UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.hasBought()) {
      transaction.cost = Num.ZERO.copy();
    }
    return transaction;
  }

  style: Styles = Styles.STAR_KEY;
  nav: string = "yellow";
  subNav: string = "yellowStarKeys";
  allowedEnhancements: Enhancement[] = [];

  enhancementString(enhancement: Enhancement): string {
    return `Multiply this Star Key upgrade's effect by ${enhancement.getMultiplier().toString(2)}x.`;
  }
  canEnhance(): boolean {
    return true;
  }
  enhance(): void {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(this.enhancement.getMultiplier());
    }
  }

  increase: Num = new Num(1, 0);
  startIncrease: Num = new Num(1, 0);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.starKeys;

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);

  override oneTime: boolean = true;
  override limit: Num = new Num(1, 0);
}
