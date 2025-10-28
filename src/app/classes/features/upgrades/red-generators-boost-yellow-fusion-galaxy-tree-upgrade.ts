import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class RedGeneratorsBoostYellowFusionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-generators-boost-yellow-fusion-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.increaseRedGeneratorMultiplier,
      UpgradeRecord.fasterHydrogenGeneration,
    ];
  }

  getDescription(): string {
    return `Red generators amplify hydrogen generation by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      UpgradeRecord.increaseHydrogen.buffer = UpgradeRecord.increaseHydrogen.buffer.mul(this.buffer);
    }
    return;
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Amplified Fusion";

  override buffer = new Num(1.4, 0);
  override baseBuffer = new Num(1.4, 0);

  cost: Num = new Num(2, 1);
  baseCost: Num = new Num(2, 1);
}
