import {GalaxyTreeUpgrade, RequireParent} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

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
    return `Increase yellow fusion barrier by ${this.buffer.toString(2)}^fifth red generators bought. Also increases hydrogen descaling barriers by (fifth red generators × 3).`;
  }

  hydrogenBarrierMultiplier = new Num(3, 0);
  hydrogenEffect: Num = new Num(0, 0);
  hydrogenGenerateEffect: Num = new Num(1, 0);
  hydrogenGenerateSpeedMultiplier: Num = new Num(1, -2);

  action(): Num | undefined {
    if (this.hasBought()) {
      const effect = (this.buffer).pow(GeneratorRecord.fifthRedGenerator.bought);
      HoldingRecord.yellowFusion.maxAmount = HoldingRecord.yellowFusion.startMaxAmount.mul(effect);

      this.hydrogenEffect = GeneratorRecord.fifthRedGenerator.bought.mul(this.hydrogenBarrierMultiplier);
      HoldingRecord.hydrogen.barrier = HoldingRecord.hydrogen.startBarrier.add(this.hydrogenEffect);
      GeneratorRecord.hydrogenGenerator.barrier = GeneratorRecord.hydrogenGenerator.startBarrier.add(this.hydrogenEffect);

      this.hydrogenGenerateEffect = GeneratorRecord.fifthRedGenerator.bought.mul(this.hydrogenGenerateSpeedMultiplier).add(Num.ONE);
      GeneratorRecord.hydrogenGenerator.mulMod = GeneratorRecord.hydrogenGenerator.mulMod.mul(this.hydrogenGenerateEffect);

      this.hydrogenBarrierMultiplier = new Num(3, 0); // Reset in case it was modified elsewhere

      return effect;
    }
    return;
  }

  override getEffectDisplay(): string {
    // Display all effects in one line
    return `Yellow Fusion barrier: x${this.effect?.toString(2)} | Hydrogen Barrier: +${this.hydrogenEffect.toString(0)} | Hydrogen Generation Speed: x${this.hydrogenGenerateEffect.toString(2)}`;
  }

  override requireParent: RequireParent = RequireParent.ALL;

  style: Styles = Styles.STAR_ORANGE;
  displayName: string = "Amplified Fusion";

  override buffer = new Num(1, 1);
  override baseBuffer = new Num(1, 1);

  cost: Num = new Num(2.5, 1);
  baseCost: Num = new Num(2.5, 1);
}
