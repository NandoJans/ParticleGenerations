import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {RedGenerator} from "../generators/red-generator";
import {Requirement} from "../interfaces/requirement";

export abstract class RedGeneratorUpgrade extends Upgrade {
  protected constructor(
    rank: number,
    stringRank: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    public generator: RedGenerator,
  ) {
    super();
    this.baseCost = cost.copy();
    this.cost = cost.copy();
    this.displayName = '';
    this.increase = increase.copy();
    this.scaling = scaling.copy();
    this.requirement = [
      new Requirement(generator, new Num(rank, 0), this),
    ];
    this.buffer = buffer.copy();
    this.baseBuffer = buffer.copy();
  }

  baseCost: Num;
  cost: Num;
  displayName: string;
  increase: Num;
  requirement: Requirement[];
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.redParticles;
  nav: string = "red";
  style: Styles = Styles.SUB_RED;
  subNav: string = "redParticles";
  type: string = "red-particles";
  override effect: Num = new Num(1, 0);
}
