import {YellowGeneratorUpgrade} from "./yellow-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {YellowGenerator} from "../generators/yellow-generator";

export class YellowGeneratorBuyMultiplierUpgrade extends YellowGeneratorUpgrade {

  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: YellowGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.name = `yellow-generator-buy-multiplier-upgrade-${generator.rank}`;
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
    this.generator.baseMulMod = this.generator.baseMulMod.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.buffer.toString(2)}x buy multiplier`;
  }
}
