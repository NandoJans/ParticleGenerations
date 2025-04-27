import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {RedGenerator} from "../generators/red-generator";
import {Requirement} from "../interfaces/requirement";

export class RedGeneratorBuyMultiplierUpgrade extends RedGeneratorUpgrade {

  constructor(
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: RedGenerator,
  ) {
    super(cost, increase, scaling, buffer, generator);
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
    const buff: Num = this.buffer.pow(this.amount, false);
    this.generator.baseMulMod.mul(buff);
    return buff;
  }

  getDescription(): string {
    // console.log(this.name, this.effect.toString(true), this.buffer.toString(true));
    return `${this.buffer.toString(true)}x buy multiplier`;
  }
}

