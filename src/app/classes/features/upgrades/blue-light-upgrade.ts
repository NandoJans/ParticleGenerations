import {Upgrade} from "../upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export abstract class BlueLightUpgrade extends Upgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.blueLight;
  nav: string = "blue";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blueParticles, new Num(1, 0)),
    new Requirement(UpgradeRecord.neutronStar, new Num(1, 0))
  ];
  resetId: ResetKey = ResetKey.BLUE;
  style: Styles = Styles.BLUE_STAR;
  subNav: string = "blueLightUpgrades";
  type: string = "blue-light-upgrade";
}
