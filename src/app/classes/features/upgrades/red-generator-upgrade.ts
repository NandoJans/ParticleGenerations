import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {RedGenerator} from "../generators/red-generator";
import {Enhancement} from "../enhancements/enhancement";

export abstract class RedGeneratorUpgrade extends Upgrade {
  protected constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    public generator: RedGenerator,
  ) {
    super(saveName);
    this.baseCost = cost.copy();
    this.cost = cost.copy();
    this.displayName = '';
    this.increase = increase.copy();
    this.scaling = scaling.copy();
    this.buffer = buffer.copy();
    this.baseBuffer = buffer.copy();
  }

  baseCost: Num;
  cost: Num;
  displayName: string;
  increase: Num;
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.redParticles;
  nav: string = "red";
  style: Styles = Styles.SUB_RED;
  subNav: string = "redParticles";
  type: string = "red-particles";
  override effect: Num = new Num(1, 0);

  override canEnhance(): boolean {
    return false;
  }
  override enhance() {}
  allowedEnhancements: Enhancement[] = [];
  override enhancementString(enhancement: Enhancement): string {
    return "";
  }
}
