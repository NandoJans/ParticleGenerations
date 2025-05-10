import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {RedGenerator} from "../generators/red-generator";
import {Requirement} from "../interfaces/requirement";
import {Enhancement} from "../enhancements/enhancement";

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
      new Requirement(generator, new Num(1, 0), this),
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

  override enhance() {
    if (this.enhancement) {
      const addition = this.enhancement.getAddition().mul(new Num(1, -2));
      this.buffer = this.buffer.add(addition);
    }
  }

  override enhancementString(enhancement: Enhancement): string {
    const addition = enhancement.getAddition().mul(new Num(1, -2));
    return "Enhance to add " + addition.toString(2) + " to the buffer";
  }
}
