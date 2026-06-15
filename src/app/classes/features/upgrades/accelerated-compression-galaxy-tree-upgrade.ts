import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export class AcceleratedCompressionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "accelerated-compression-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.nuclearReactionGalaxyTree,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.fusedAccelerationGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Compression speed is increased based on red accelerators by applying Log10(RA) x ${this.buffer.toString(2)}.`
  }

  action(): undefined|Num {
    if (this.hasBought()) {
      const effect = HoldingRecord.redAccelerators.amount.log10().mul(this.buffer);
      MultiplierRecord.starKeyCompressionSpeed.correct(effect);
      return effect
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE
  displayName: string = "Accelerated Compression";

  override buffer = new Num(2, 1);
  override baseBuffer = new Num(2, 1);

  cost: Num = new Num(5, 1);
  baseCost: Num = new Num(5, 1);
}
