import {YellowUpgrade} from "./yellow-upgrade";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {Holding} from "../holding";
import {Upgrade} from "../upgrade";

export class YellowPowerUpgrade extends Upgrade {
  type: string = "yellow-power-upgrade";
  resetId: ResetKey;
  name: string;
  displayName: string;
  requirement: Requirement[];

  constructor(saveName: string) {
    super(saveName);
    this.name = 'yellow-power-upgrade';
    this.displayName = 'Increase Yellow Power';
    this.requirement = [
      new Requirement(HoldingRecord.yellowPrestiges, new Num(5, 2), this),
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
  }

  style: Styles = Styles.YELLOW;
  nav: string = "yellow";
  subNav: string = "yellowGenerators";
  allowedEnhancements: Enhancement[] = [];

  enhancementString(enhancement: Enhancement): string {
    return "";
  }
  canEnhance(): boolean {
    return false;
  }
  enhance(): void {}

  override oneTime: boolean = false;
  increase: Num = new Num(1, 1);
  startIncrease: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  baseCost: Num = new Num(1, 1);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowPower;

  override scaling: Num = new Num(1, 10);
  override scalingStart: Num = new Num(1, 22);

  override buffer: Num = new Num(0.2, 0);
  override baseBuffer: Num = new Num(0.2, 0);

  override limit: Num = new Num(1, 2);

  override action(): Num | undefined {
    const effect = this.buffer.mul(this.amount)
    HoldingRecord.yellowPower.yellowPower = HoldingRecord.yellowPower.yellowPower.add(effect);
    return effect;
  }

  override effectString(): string {
    return this.effect?.toString(2) ?? "";
  }

  override getDescription(): string {
    return `Add ^${this.buffer.toString(2)} to Yellow Power`;
  }
}
