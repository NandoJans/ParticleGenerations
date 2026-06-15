import {YellowGeneratorUpgrade} from "./yellow-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {YellowGenerator} from "../generators/yellow-generator";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Enhancement} from "../enhancements/enhancement";

export class YellowGeneratorBuyMultiplierUpgrade extends YellowGeneratorUpgrade {
  private static readonly ENHANCEMENT_MULTIPLIER = new Num(1.2, 0);

  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: YellowGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.displayName = `Yellow Generator ${generator.rank} Buy Multiplier`;
    this.name = `yellow-generator-buy-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
    this.requirement = [
      new Requirement(generator, new Num(generator.rank, 0), this),
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
    return this.buffer.mul(MultiplierRecord.electronYellowGeneratorUpgradeBuffer.getNum());
  }

  override enhance(): void {
    if (this.enhancement) {
      this.buffer = this.buffer.mul(YellowGeneratorBuyMultiplierUpgrade.ENHANCEMENT_MULTIPLIER);
    }
  }

  override enhancementString(_enhancement: Enhancement): string {
    return `Increase this upgrade's multiplier to ${this.buffer.mul(YellowGeneratorBuyMultiplierUpgrade.ENHANCEMENT_MULTIPLIER).toString(2)}x.`;
  }
}
