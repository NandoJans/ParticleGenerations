import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {GeneratorUpgrade} from "./generator-upgrade";
import {EnhancementRecord} from "../../records/enhancement-record";

export abstract class RedGeneratorUpgrade extends GeneratorUpgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.redParticles;
  nav: string = "red";
  style: Styles = Styles.SUB_RED;
  subNav: string = "redParticles";
  type: string = "red-particles";
  override effect: Num = new Num(1, 0);

  override canEnhance(): boolean {
    return true;
  }
  allowedEnhancements: Enhancement[] = [
    EnhancementRecord.yellow
  ];
}
