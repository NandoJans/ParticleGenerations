import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export class NuclearReactionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "nuclear-reaction-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.nuclearPotentialGalaxyTree,
      UpgradeRecord.acceleratedCompressionGalaxyTree,
      UpgradeRecord.generatedCompressionGalaxyTree,
    ];
  }

  override requireParent: RequireParent = RequireParent.ALL;

  getDescription(): string {
    return `Nuclear Fission generation is multiplied by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined|Num {
    if (this.hasBought()) {
      MultiplierRecord.nuclearFissionGain.correct(this.buffer);
      return this.buffer;
    }
    return;
  }

  style: Styles = Styles.STAR_NUCLEAR;
  displayName: string = "Sustained Fission";

  override buffer = new Num(5, 0);
  override baseBuffer = new Num(5, 0);

  cost: Num = new Num(2.5, 3);
  baseCost: Num = new Num(2.5, 3);
}
