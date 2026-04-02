import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

export class HydrogenSynergyGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "hydrogen-synergy-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.yellowExpertiseGalaxyTree,
      UpgradeRecord.improveFusionCompressionGalaxyTree,
    ];
  }

  override requireParent: RequireParent = RequireParent.ALL;

  getDescription(): string {
    return "Set yellow fusion start requirement to 1e7 yellow particles and reduce increase/scaling of the first two hydrogen upgrades.";
  }

  private setYellowFusionStartRequirement(): void {
    const requirement = new Num(1, 7);
    const yellowFusionRequirements = [
      UpgradeRecord.increaseHydrogen,
      UpgradeRecord.increaseHydrogenEffect,
      UpgradeRecord.increaseMaxFusionBoosterAcceleration,
      UpgradeRecord.fusionBoosterAcceleration,
      UpgradeRecord.increaseProximaCentauriGoal,
      UpgradeRecord.increaseLalandeGoal,
      UpgradeRecord.increaseSunGoal,
      UpgradeRecord.increaseSiriusGoal,
    ];

    yellowFusionRequirements.forEach(upgrade => {
      upgrade.requirement = [new Requirement(HoldingRecord.yellowParticles, requirement.copy(), upgrade)];
    });
  }

  action(): undefined {
    if (this.hasBought()) {
      this.setYellowFusionStartRequirement();
      UpgradeRecord.increaseHydrogen.increase = UpgradeRecord.increaseHydrogen.startIncrease.div(this.buffer);
      UpgradeRecord.increaseHydrogen.scaling = UpgradeRecord.increaseHydrogen.scaling.div(this.buffer);

      UpgradeRecord.increaseHydrogenEffect.increase = UpgradeRecord.increaseHydrogenEffect.startIncrease.div(this.buffer);
      UpgradeRecord.increaseHydrogenEffect.scaling = UpgradeRecord.increaseHydrogenEffect.scaling.div(this.buffer);
    }
    return;
  }

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Hydrogen Synergy";

  override buffer = new Num(2, 0);
  override baseBuffer = new Num(2, 0);

  cost: Num = new Num(5, 2);
  baseCost: Num = new Num(5, 2);
}
