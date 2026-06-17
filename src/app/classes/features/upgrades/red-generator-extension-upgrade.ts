import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {RedUpgrade} from "./red-upgrade";
import {ResetHelper} from "../../helpers/reset-helper";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {Enhancement} from "../enhancements/enhancement";
import {Transaction} from "../interfaces/transaction";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from '../../records/multipliers/multiplier-record';

export class RedGeneratorExtensionUpgrade extends RedUpgrade {
  baseCost: Num = new Num(1, 3)
  cost: Num = new Num(1, 3)
  startBought: Num = new Num(0, 0);
  bought: Num = new Num(0, 0);
  override scaling: Num = new Num(7.5, 1);  // Reduced from 1e2 to 7.5e1 (~25% cost reduction for smoother progression)

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  description: string = this.getDescription();
  displayName: string = "Red Generator Extension";
  increase: Num = new Num(1, 2);
  startIncrease: Num = new Num(1, 2);
  name: string = "red-generator-extension";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_BOOSTER_ACCELERATION, this);
  override subNav: string = 'redParticles';
  override requirement: Requirement[] = [];
  override resets: ResetKey = ResetKey.RED_EXTENSION;
  override firstUnlock: boolean = true;
  override unlocked: boolean = true;
  override startUnlocked: boolean = true;
  override calculationOrder = 1001;

  action(): Num {
    const generators = [
      GeneratorRecord.firstRedGenerator,
      GeneratorRecord.secondRedGenerator,
      GeneratorRecord.thirdRedGenerator,
      GeneratorRecord.fourthRedGenerator,
      GeneratorRecord.fifthRedGenerator,
    ];
    generators.forEach((generator, index) => {
      const compare = new Num(index, 0);
      if (this.amount.greq(compare)) {
        const buff: Num = this.getEffectiveBuffer().pow(this.amount.sub(compare));
        generator.mulMod = generator.mulMod.mul(buff);
      }
    });
    return this.getEffectiveBuffer().pow(this.amount);
  }

  getDescription(): string {
    if (this.amount.greq(new Num(4, 0))) {
      return `Multiply red generator production by ${this.getEffectiveBuffer().toString(2)}x.`;
    } else {
      return `Get a new generator and apply ${this.getEffectiveBuffer().toString(2)}x`;
    }
  }

  getEffectiveBuffer(): Num {
    return this.buffer.mul(MultiplierRecord.redGeneratorExtensionBuffer.getNum());
  }

  override effectString() {
    if (this.amount.toNumber() < 5) {
      switch (this.amount.toNumber()) {
        case 0:
          return "Red generator 1";
        case 1:
          return "Red generator 2";
        case 2:
          return "Red generator 3";
        case 3:
          return "Red generator 4";
        case 4:
          return "Red generator 5";
        default:
          break;
      }
    }

    return super.effectString();
  }

  override enhance() {
    this.buffer = this.buffer.mul(this.enhancement?.getMultiplier() as Num);
  }

  override enhancementString(enhancement: Enhancement): string {
    return `Enhance to multiply buffer by ${enhancement.getMultiplier().toString(2)}x`;
  }

  override reset() {
    super.reset();
    this.bought = this.startBought.copy();
  }
}
