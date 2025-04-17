import {Generator} from "../generator";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {Generatable} from "../interfaces/generatable";
import {Multiplier} from "../multiplier";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class BlueLightGenerator extends Generator {
  baseCost: Num = new Num(2, 0);
  baseMultiplier: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  currency: Holding = HoldingRecord.blueParticles;
  displayName: string = "Blue Light Generator";
  generates: Generatable = HoldingRecord.blueLight;
  globalMultiplier: Multiplier = MultiplierRecord.blueLightGenerators;
  increase: Num = new Num(1, 0);
  name: string = "blue-light-generator";
  nav: string = "none";
  requirement: Requirement[] = [
    new Requirement(UpgradeRecord.neutronStar, new Num(3, 0)),
  ];
  resetId: ResetKey = ResetKey.BLUE;
  softResetId: ResetKey = ResetKey.BLUE;
  style: Styles = Styles.BLUE_STAR;
  subNav: string = "none";
  type: string = "blue-light-generator-upgrade";

}
