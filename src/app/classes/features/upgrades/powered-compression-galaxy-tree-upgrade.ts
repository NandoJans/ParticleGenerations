import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";

export class PoweredCompressionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "powered-compression-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [

    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.powerAccelerationGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Compression speed is increased based on yellow power by applying Log10(YPow)^${this.buffer.toString(2)}.`
  }

  action(): undefined|Num {
    if (this.hasBought()) {
      const effect = HoldingRecord.yellowPower.amount.log10().pow(this.buffer);
      MultiplierRecord.starKeyCompressionSpeed.correct(effect);
      return effect
    }
    return;
  }

  style: Styles = Styles.STAR_WHITE
  displayName: string = "Powered Compression";

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(5, 1);
  baseCost: Num = new Num(5, 1);
}
