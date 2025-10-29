import {YellowGeneratorUpgrade} from "./yellow-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {YellowGenerator} from "../generators/yellow-generator";

export class YellowGeneratorMultiplierUpgrade extends YellowGeneratorUpgrade {
  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: YellowGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.displayName = `Yellow generator ${generator.rank} Multiplier`;
    this.name = `yellow-generator-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
    this.requirement = [
      new Requirement(generator, new Num(generator.rank, 0), this),
    ];
  }

  name: string;
  resetId: ResetKey;
  requirement: Requirement[];
  override calculationOrder: number = 1005;


  action(): Num {
    const buff: Num = this.buffer.pow(this.amount);
    this.generator.multiplier = this.generator.multiplier.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.buffer.toString(2)}x Production`;
  }
}
