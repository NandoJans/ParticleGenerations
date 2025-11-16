import {GeneratorUpgrade} from "./generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {GreenGenerator} from "../generators/green-generator";
import {GreenGeneratorUpgrade} from "./green-generator-upgrade";

export class GreenGeneratorMultiplierUpgrade extends GreenGeneratorUpgrade {
  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: GreenGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.displayName = `Green generator ${generator.rank} Multiplier`;
    this.name = `green-generator-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
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
    this.generator.mulMod = this.generator.mulMod.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.buffer.toString(2)}x Production`;
  }
}
