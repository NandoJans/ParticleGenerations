import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class AmplifiedYellowKeysGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "more-yellow-keys-gain-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.yellowExpertiseGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.betterYellowKeyGainGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Yellow key gain is ${this.buffer.toString(2)}x higher.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      MultiplierRecord.yellowKeyGain.correct(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_RED;
  displayName: string = "Amplified Yellow Keys";

  override buffer = new Num(1, 1);
  override baseBuffer = new Num(1, 1);

  cost: Num = new Num(3, 1);
  baseCost: Num = new Num(3, 1);
}
