import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";

export abstract class RedUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.redParticles;
  nav: string = 'red';
  subNav: string = 'redUpgrades';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 40), false)
  ];
  resetId: ResetKey = ResetKey.RED;
  style: Styles = Styles.RED;
  type: string = 'red-upgrades';
}
