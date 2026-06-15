import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export class NuclearPotentialGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "nuclear-potential-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.nuclearReactionGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.hydrogenCompressionGalaxyTree,
      UpgradeRecord.poweredCompressionGalaxyTree,
    ];
  }

  override requireParent: RequireParent = RequireParent.ALL;

  getDescription(): string {
    return `Nuclear Potential gained from a SCRAM is multiplied by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined|Num {
    if (this.hasBought()) {
      MultiplierRecord.nuclearPotentialGain.correct(this.buffer);
      return this.buffer;
    }
    return;
  }

  style: Styles = Styles.STAR_NUCLEAR;
  displayName: string = "Potential Containment";

  override buffer = new Num(3, 0);
  override baseBuffer = new Num(3, 0);

  cost: Num = new Num(1, 3);
  baseCost: Num = new Num(1, 3);
}
