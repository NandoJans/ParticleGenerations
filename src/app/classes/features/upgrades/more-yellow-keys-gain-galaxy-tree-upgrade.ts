import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class MoreYellowKeysGainGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "more-yellow-keys-gain-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.moreYellowKeys,
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

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Amplified Yellow Keys";

  override buffer = new Num(1.75, 0);
  override baseBuffer = new Num(1.75, 0);

  cost: Num = new Num(5, 0);
  baseCost: Num = new Num(5, 0);
}
