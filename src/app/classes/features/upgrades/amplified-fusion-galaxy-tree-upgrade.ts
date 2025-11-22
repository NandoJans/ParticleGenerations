import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class AmplifiedFusionGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  constructor(saveName: string) {
    super(saveName, "red-generators-boost-yellow-fusion-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.strongerHydrogenGalaxyTree,
      UpgradeRecord.betterRedBoosterGalaxyTree,
    ];
  }

  getDescription(): string {
    return `Increase yellow fusion barrier by ${this.buffer.toString(2)}^fifth red generators bought. Also increases hydrogen descaling barriers by the same factor.`;
  }

  action(): Num | undefined {
    if (this.hasBought()) {
      const effect = (this.buffer).pow(GeneratorRecord.fifthRedGenerator.bought);
      HoldingRecord.yellowFusion.maxAmount = HoldingRecord.yellowFusion.maxAmount.mul(effect);
      
      // Also increase hydrogen barriers to allow more yellow fusion accumulation
      // Using a 100x multiplier (1e2) on fifth red generator count for enhanced barrier scaling
      const hydrogenBarrierMultiplier = new Num(1, 2); // 100 (1×10²)
      const hydrogenEffect = (this.buffer).pow(GeneratorRecord.fifthRedGenerator.bought.mul(hydrogenBarrierMultiplier));
      HoldingRecord.hydrogen.barrier = HoldingRecord.hydrogen.barrier.mul(hydrogenEffect);
      GeneratorRecord.hydrogenGenerator.barrier = GeneratorRecord.hydrogenGenerator.barrier.mul(hydrogenEffect);
      
      return effect;
    }
    return;
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Amplified Fusion";

  override buffer = new Num(1, 1);
  override baseBuffer = new Num(1, 1);

  cost: Num = new Num(3, 1);
  baseCost: Num = new Num(3, 1);
}
