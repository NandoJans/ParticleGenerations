import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {RedGenerator} from "../generators/red-generator";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";

export class RedGeneratorMultiplierUpgrade extends RedGeneratorUpgrade {

  constructor(
    rank: number,
    stringRank: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: RedGenerator,
  ) {
    super(rank, stringRank, cost, increase, scaling, buffer, generator);
    this.name = `red-generator-multiplier-upgrade-${rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  }
  name: string;
  resetId: ResetKey;

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    this.generator.multiplier.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.buffer.toString(true)}x Production`;
  }
}
