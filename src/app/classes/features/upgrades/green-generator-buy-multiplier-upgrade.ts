import {GreenGeneratorUpgrade} from "./green-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {GreenGenerator} from "../generators/green-generator";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class GreenGeneratorBuyMultiplierUpgrade extends GreenGeneratorUpgrade {
  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: GreenGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.displayName = `Green Generator ${generator.rank} Buy Multiplier`;
    this.name = `green-generator-buy-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this);
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
    return this.buffer.mul(MultiplierRecord.electronGreenGeneratorUpgradeBuffer.getNum());
  }
}
