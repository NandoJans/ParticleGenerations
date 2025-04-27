import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {RedGenerator} from "../generators/red-generator";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";

export class RedGeneratorMultiplierUpgrade extends RedGeneratorUpgrade {

  constructor(
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: RedGenerator,
  ) {
    super(cost, increase, scaling, buffer, generator);
    this.name = `red-generator-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
    this.requirement = [
      new Requirement(generator, new Num(generator.rank, 0), this),
    ];
  }
  name: string;
  resetId: ResetKey;
  requirement: Requirement[];


  action(): Num {
    const buff: Num = this.buffer.pow(this.amount);
    this.generator.multiplier.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.buffer.toString(2)}x Production`;
  }
}
