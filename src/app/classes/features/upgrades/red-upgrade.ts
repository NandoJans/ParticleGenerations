import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {Enhancement} from "../enhancements/enhancement";
import {EnhancementRecord} from "../../records/enhancement-record";

export abstract class RedUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.redParticles;
  nav: string = 'red';
  subNav: string = 'redUpgrades';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 40), this, false)
  ];
  style: Styles = Styles.RED;
  type: string = 'red-upgrades';
  allowedEnhancements: Enhancement[] = [
    EnhancementRecord.yellow,
  ];

  override canEnhance(): boolean {
    return true;
  }
}
