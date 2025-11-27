import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class HydrogenCompressionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "hydrogen-compression-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [

    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.amplifiedFusionGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Compression speed is increased based on hydrogen by applying hydrogen x ${this.buffer.toString(2)}.`
  }

  action(): undefined|Num {
    if (this.hasBought()) {
      const effect = HoldingRecord.hydrogen.amount.mul(this.buffer);
      MultiplierRecord.starKeyCompressionSpeed.correct(effect);
      return effect
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE
  displayName: string = "Hydrogen Compression";

  override buffer = new Num(1, 1);
  override baseBuffer = new Num(1, 1);

  cost: Num = new Num(5, 1);
  baseCost: Num = new Num(5, 1);
}
