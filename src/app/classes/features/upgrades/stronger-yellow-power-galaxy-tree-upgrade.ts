import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export class StrongerYellowPowerGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "stronger-yellow-power");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterYellowGeneratorsGalaxyTree,
      UpgradeRecord.betterYellowKeyGainGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.unlockFirstGreenGeneratorGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Increase the power of yellow power upgrade by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      HoldingRecord.yellowPower.yellowPower = HoldingRecord.yellowPower.yellowPower.mul(this.buffer);
    }
    return
  }

  style: Styles = Styles.STAR_ORANGE
  displayName: string = "Stronger Yellow Power";

  override buffer: Num = new Num(1.1, 0);
  override baseBuffer: Num = new Num(1.1, 0);

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);

  override calculationOrder: number = 450;
}
