import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {RedGenerator} from "../generators/red-generator";

export class RedGeneratorBuyMultiplierUpgrade extends RedGeneratorUpgrade {

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
    this.name = `red-generator-buy-multiplier-upgrade-${rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  }
  name: string;
  resetId: ResetKey;


  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    this.generator.baseMulMod.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.buffer.toString(true)}x buy multiplier`;
  }
}

