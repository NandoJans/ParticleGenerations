import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export class StrongerYellowPowerGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "stronger-yellow-power");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerHydrogenGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.unlockFirstGreenGenerator,
    ];
  }

  getDescription(): string {
    return `Increase the power of yellow power upgrade by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.strongerYellowPower.buffer = UpgradeRecord.strongerYellowPower.buffer.mul(this.buffer);
    }
    return
  }

  style: Styles = Styles.STAR_ORANGE
  displayName: string = "Stronger yellow power";

  override buffer: Num = new Num(1.1, 0);
  override baseBuffer: Num = new Num(1.1, 0);

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
}
