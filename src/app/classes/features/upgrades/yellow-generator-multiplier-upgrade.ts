import {YellowGeneratorUpgrade} from "./yellow-generator-upgrade";
import {Num} from "../../../num";
import {ResetHelper} from "../../helpers/reset-helper";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {YellowGenerator} from "../generators/yellow-generator";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class YellowGeneratorMultiplierUpgrade extends YellowGeneratorUpgrade {
  constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    generator: YellowGenerator,
  ) {
    super(saveName, cost, increase, scaling, buffer, generator);
    this.displayName = `Yellow generator ${generator.rank} Multiplier`;
    this.name = `yellow-generator-multiplier-upgrade-${generator.rank}`;
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
    this.requirement = [
      new Requirement(generator, new Num(generator.rank, 0), this),
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
    return this.buffer.mul(MultiplierRecord.protonYellowGeneratorUpgradeBuffer.getNum());
  }
}
