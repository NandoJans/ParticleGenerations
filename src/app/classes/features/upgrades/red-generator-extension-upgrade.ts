import {Num} from "../../../num";
import {Requirement} from "../interfaces/requirement";
import {ResetKey} from "../../enums/reset-key";
import {RedUpgrade} from "./red-upgrade";
import {ResetHelper} from "../../helpers/reset-helper";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class RedGeneratorExtensionUpgrade extends RedUpgrade {
  baseCost: Num = new Num(1, 3)
  cost: Num = new Num(1, 3)
  bought: Num = new Num(0, 0);
  override scaling: Num = new Num(1, 2);

  override buffer: Num = new Num(2, 0);
  override baseBuffer: Num = new Num(2, 0);

  description: string = this.getDescription();
  displayName: string = "Red Generator Extension";
  increase: Num = new Num(1, 2);
  name: string = "red-generator-extension";
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED, this);
  override subNav: string = 'redParticles';
  override requirement: Requirement[] = [];
  override resets: ResetKey = ResetKey.RED_EXTENSION;
  override unlocked: boolean = true;

  action(): undefined {
    const generators = [
      GeneratorRecord.firstRedGenerator,
      GeneratorRecord.secondRedGenerator,
      GeneratorRecord.thirdRedGenerator,
      GeneratorRecord.fourthRedGenerator,
      GeneratorRecord.fifthRedGenerator,
    ];
    generators.forEach((generator, index) => {
      const compare = new Num(index, 0);
      if (this.bought.greq(compare)) {
        const buff: Num = this.buffer.pow(this.bought.sub(compare, false), false);
        generator.multiplier.mul(buff);
      }
    });
    return
  }

  getDescription(): string {
    if (this.bought.greq(new Num(4, 0))) {
      return `Multiply red generator production by ${this.buffer.toString(true)}x.`;
    } else {
      return `Get a new generator. Multiply other red generator production by ${this.buffer.toString(true)}`;
    }
  }

  override effectString() {
    if (this.amount.exp === 0) {
      switch (this.amount.num) {
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

    return "";
  }
}
