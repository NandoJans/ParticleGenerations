import {RedGeneratorUpgrade} from "./red-generator-upgrade";
import {Num} from "../../../num";
import {RedGenerator} from "../generators/red-generator";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {Enhancement} from "../enhancements/enhancement";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedGeneratorMultiplierUpgrade extends RedGeneratorUpgrade {

  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: RedGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.displayName = `Red Generator ${generator.rank} Multiplier`;
    this.name = `red-generator-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
    this.requirement = [
      new Requirement(generator, new Num(1, 0), this),
    ];
  }
  name: string;
  resetId: ResetKey;
  requirement: Requirement[];
  override calculationOrder: number = 1005;


  action(): Num {
    const modifiedBuffer = this.getModifiedBuffer();
    const buff: Num = modifiedBuffer.pow(this.amount);
    this.generator.mulMod = this.generator.mulMod.mul(buff);
    return buff;
  }

  getDescription(): string {
    return `${this.getModifiedBuffer().toString(3)}x Production per level`;
  }

  override getDisplayName(): string {
    return `${this.displayName} (${this.getModifiedBuffer().toString(3)}x)`;
  }

  private getModifiedBuffer(): Num {
    return this.buffer.mul(MultiplierRecord.protonRedGeneratorUpgradeBuffer.getNum());
  }

  override enhance() {
    if (this.enhancement) {
      const addition = this.enhancement.getMultiplier().mul(new Num(2, 0));
      this.buffer = this.buffer.mul(addition);
    }
  }

  override enhancementString(enhancement: Enhancement): string {
    const addition = enhancement.getMultiplier().mul(new Num(2, 0));
    return "Enhance to multiply buffer by " + addition.toString(2) + "x";
  }
}
