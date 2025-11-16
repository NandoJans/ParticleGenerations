import {GeneratorUpgrade} from "./generator-upgrade";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";

export abstract class GreenGeneratorUpgrade extends GeneratorUpgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.greenParticles;
  nav: string = "green";
  style: Styles = Styles.GREEN_GENERATOR_UPGRADE;
  subNav: string = "greenGenerators";
  type: string = "green-generators";
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
