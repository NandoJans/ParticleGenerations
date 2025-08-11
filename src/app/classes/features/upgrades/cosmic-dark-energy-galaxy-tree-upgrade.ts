import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class CosmicDarkEnergyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "cosmic-dark-energy-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.ultimateDarkEnergyGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.superiorDarkEnergyGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Increase dark energy gain by 3x.";
  }

  action(): undefined {
    if (this.hasBought() && !this.applied) {
      MultiplierRecord.totalDarkEnergyGain.correct(this.buffer);
      this.applied = true;
    }
    return;
  }

  override buffer = new Num(3, 0);
  override baseBuffer = new Num(3, 0);

  style: Styles = Styles.STAR_WHITE;
  displayName: string = "Cosmic Dark Energy";

  cost: Num = new Num(6, 0);
  baseCost: Num = new Num(6, 0);

  private applied = false;
}

