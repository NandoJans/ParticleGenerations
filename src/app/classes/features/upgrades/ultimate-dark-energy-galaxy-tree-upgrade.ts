import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class UltimateDarkEnergyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "ultimate-dark-energy-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.cosmicDarkEnergyGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Increase dark energy gain by 5x.";
  }

  action(): undefined {
    MultiplierRecord.totalDarkEnergyGain.correct(this.buffer);
    return;
  }

  override buffer = new Num(5, 0);
  override baseBuffer = new Num(5, 0);

  style: Styles = Styles.STAR_BLUE;
  displayName: string = "Ultimate Dark Energy";

  cost: Num = new Num(7, 0);
  baseCost: Num = new Num(7, 0);
}

