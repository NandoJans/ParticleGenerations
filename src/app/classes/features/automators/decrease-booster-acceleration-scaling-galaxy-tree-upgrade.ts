import {GalaxyTreeUpgrade} from "../upgrades/galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";

export class DecreaseBoosterAccelerationScalingGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "decrease-booster-acceleration-scaling-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.halfRedGeneratorIncrease,
    ];
  }

  getDescription(): string {
    return "Increases the power of red extensions by 2x";
  }

  action(): undefined {
    UpgradeRecord.boosterAccelerationUpgrade.increase = UpgradeRecord.boosterAccelerationUpgrade.startIncrease.div(new Num(1, 0));
    return
  }

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  style: Styles = Styles.STAR_RED
  displayName: string = "2x Stronger Red Extension";

  cost: Num = new Num(4, 0);
  baseCost: Num = new Num(4, 0);
}
