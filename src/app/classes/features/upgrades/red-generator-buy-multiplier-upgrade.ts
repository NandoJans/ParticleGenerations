import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {RedGenerator} from "../generators/red-generator";
import {Requirement} from "../interfaces/requirement";

export class RedGeneratorBuyMultiplierUpgrade extends RedGeneratorUpgrade {

  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: RedGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.name = `red-generator-buy-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
    this.requirement = [
      new Requirement(generator, new Num(generator.rank, 0), this),
    ];
  }

  requirement: Requirement[];
  name: string;
  resetId: ResetKey;


  action(): Num {
    const buff: Num = this.buffer.pow(this.amount);
    this.generator.baseMulMod = this.generator.baseMulMod.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.buffer.toString(2)}x buy multiplier`;
  }
}

