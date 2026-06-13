import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {RedGenerator} from "../generators/red-generator";
import {Requirement} from "../interfaces/requirement";
import {Enhancement} from "../enhancements/enhancement";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

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
    this.displayName = `Red Generator ${generator.rank} Buy Multiplier`;
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
    const modifiedBuffer = this.getModifiedBuffer();
    const buff: Num = modifiedBuffer.pow(this.amount);
    this.generator.baseMulMod = this.generator.baseMulMod.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.getModifiedBuffer().toString(3)}x buy multiplier per level`;
  }

  override getDisplayName(): string {
    return `${this.displayName} (${this.getModifiedBuffer().toString(3)}x)`;
  }

  private getModifiedBuffer(): Num {
    return this.buffer.mul(MultiplierRecord.electronRedGeneratorUpgradeBuffer.getNum());
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
