import {GreenGeneratorUpgrade} from "./green-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {GreenGenerator} from "../generators/green-generator";

export class GreenGeneratorCostDivisorUpgrade extends GreenGeneratorUpgrade {
  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: GreenGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.displayName = `Green Generator ${generator.rank} Cost Divisor`;
    this.name = `green-generator-cost-divisor-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
    this.requirement = [
      new Requirement(generator, new Num(generator.rank, 0), this),
    ];
  }

  requirement: Requirement[];
  name: string;
  resetId: ResetKey;
  override calculationOrder: number = 1005;


  action(): Num {
    const buff: Num = this.buffer.pow(this.amount);
    this.generator.cost = this.generator.cost.div(buff);
    return buff;
  }

  override effectString(): string {
    return `/ ${this.effect}`
  }

  getDescription(): string {
    return `Cost / ${this.buffer}`;
  }
}
