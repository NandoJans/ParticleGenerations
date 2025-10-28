import {GalaxyTreeUpgrade} from "../upgrades/galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class IncreaseBoosterAccelerationPowerGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "increase-booster-acceleration-power");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.redAcceleratorsBoostGenerators,
    ];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.increaseRedGeneratorMultiplier,
      UpgradeRecord.cheaperBoosterAcceleration,
    ];
  }

  getDescription(): string {
    return `Increases the power of booster accelerations by ${this.buffer.toString(2)}x.`;
  }

  action(): undefined {
    UpgradeRecord.boosterAccelerationUpgrade.buffer = UpgradeRecord.boosterAccelerationUpgrade.buffer.mul(this.buffer);
    UpgradeRecord.boosterAccelerationUpgrade.freeBuys = UpgradeRecord.boosterAccelerationUpgrade.freeBuys.mul(this.buffer);
    return
  }

  override buffer = new Num(1.2, 0);
  override baseBuffer = new Num(1.2, 0);

  style: Styles = Styles.STAR_YELLOW;
  displayName: string = "Stronger Booster Acceleration";

  cost: Num = new Num(4, 0);
  baseCost: Num = new Num(4, 0);
}

