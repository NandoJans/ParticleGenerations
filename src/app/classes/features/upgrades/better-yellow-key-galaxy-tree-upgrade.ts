import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class BetterYellowKeyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  override calculationOrder = 401;

  constructor(saveName: string) {
    super(saveName, "more-yellow-keys");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterYellowMultipliersGalaxyTree,
      UpgradeRecord.amplifiedYellowKeysGalaxyTree,
      UpgradeRecord.synergizedPowerGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerYellowPowerGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Yellow key gain upgrade is ${this.buffer.toString(2)}x stronger.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.multiplyYellowKeyGain.buffer = UpgradeRecord.multiplyYellowKeyGain.buffer.mul(this.buffer);
    }
    return
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Better Yellow Key Gain";

  override buffer = new Num(1.5, 0);
  override baseBuffer = new Num(1.5, 0);

  cost: Num = new Num(1, 0);
  baseCost: Num = new Num(1, 0);
}

