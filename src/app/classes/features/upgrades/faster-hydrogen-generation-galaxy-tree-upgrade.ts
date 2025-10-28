import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class FasterHydrogenGenerationGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "faster-hydrogen-generation");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerHydrogenGalaxyTree,
      UpgradeRecord.improveYellowFusion,
      UpgradeRecord.redGeneratorsBoostYellowFusion,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.unlockFirstGreenGenerator,
    ];
  }

  getDescription(): string {
    return `Generate hydrogen ${this.buffer.toString(2)}x faster.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      MultiplierRecord.hydrogenGenerators.correct(this.buffer);
    }
    return
  }

  style: Styles = Styles.STAR_ORANGE
  displayName: string = "Faster Hydrogen Generation";

  override buffer: Num = new Num(2.5, 0);
  override baseBuffer: Num = new Num(2.5, 0);

  cost: Num = new Num(2, 0);
  baseCost: Num = new Num(2, 0);
}
