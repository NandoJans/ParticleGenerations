import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class RedGeneratorEfficiencyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-generator-efficiency-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.increaseRedGeneratorMultiplier,
    ];
  }

  getDescription(): string {
    return `Red generators are ${this.buffer.toString(2)}x more efficient.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      MultiplierRecord.redParticleGenerators.correct(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Red Generator Efficiency";

  override buffer = new Num(3, 0);
  override baseBuffer = new Num(3, 0);

  cost: Num = new Num(4, 0);
  baseCost: Num = new Num(4, 0);
}
