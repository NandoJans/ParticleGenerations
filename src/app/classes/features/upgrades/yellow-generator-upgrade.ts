import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {GeneratorUpgrade} from "./generator-upgrade";
import {Requirement} from "../interfaces/requirement";

export abstract class YellowGeneratorUpgrade extends GeneratorUpgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.yellowParticles;
  nav: string = "yellow";
  style: Styles = Styles.YELLOW_GENERATOR_UPGRADE;
  subNav: string = "yellowGenerators";
  type: string = "yellow-generators";
  override effect: Num = new Num(1, 0);

  override canEnhance(): boolean {
    return false;
  }

  override enhance() {
  }

  allowedEnhancements: Enhancement[] = [];

  override enhancementString(enhancement: Enhancement): string {
    return "";
  }
}
