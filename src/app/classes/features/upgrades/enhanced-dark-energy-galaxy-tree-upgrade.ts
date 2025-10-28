import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class EnhancedDarkEnergyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "enhanced-dark-energy-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.greaterDarkEnergyGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterYellowKeyGainGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Increase dark energy gain by 2x.";
  }

  action(): undefined {
    MultiplierRecord.totalDarkEnergyGain.correct(this.buffer);
    return;
  }

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Enhanced Dark Energy";

  cost: Num = new Num(3, 0);
  baseCost: Num = new Num(3, 0);
}

