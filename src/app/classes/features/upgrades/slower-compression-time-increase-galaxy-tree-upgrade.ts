import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";

export class SlowerCompressionTimeIncreaseGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "slower-compression-time-increase-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [

    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerYellowFusionGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Compression completion time is increased less by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    if (this.hasBought()) {
      MultiplierRecord.starKeyCompressionTimeIncrease.correct(this.buffer);
    }
  }

  style: Styles = Styles.STAR_YELLOW
  displayName: string = "Slower Compression Time Increase";

  override buffer = new Num(0.5, 0);
  override baseBuffer = new Num(0.5, 0);

  cost: Num = new Num(2, 2);
  baseCost: Num = new Num(2, 2);
}
