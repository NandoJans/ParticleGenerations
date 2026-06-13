import {DarkStarCharger} from "./dark-star-charger";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Multiplier} from "../multiplier";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

/**
 * Yellow Fusion Dark Star Charger
 *
 * Nerf: Slows hydrogen generation while active; slowdown scales with tier.
 * Charge: Gained in dark galaxy from multiples of 1e100 × fusion booster accelerations.
 * Reward:
 *  - Hydrogen barrier +1 per charge (tier amplified)
 *  - Fusion barrier multiplied by 10^charge (tier amplified)
 *  - Hydrogen generation multiplied by (0.1 × charge + 1)
 */
export class YellowFusionDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Yellow Fusion Charger';
  resetId: ResetKey = ResetKey.GREEN;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(10, 0);
  canInfiniteChargeAtMaxTier: boolean = true;
  requirement: Requirement[] = [];
  name: string = 'yellow-fusion-dark-star-charger';

  // Per-tier amplification for barrier effects.
  private readonly hydrogenBarrierTierBase: Num = new Num(1.15, 0);
  private readonly fusionBarrierTierBase: Num = new Num(1.25, 0);

  // Track values for UI/breakdown.
  hydrogenBarrierBoost: Num = Num.ZERO.copy();
  fusionBarrierExponent: Num = Num.ZERO.copy();
  hydrogenGenerationBoost: Num = Num.ONE.copy();

  override tierNerf: Num[] = [
    new Num(0.9, 0),
    new Num(0.5, 0)
  ];

  /**
   * Calculate max charge for a given tier
   * Each tier increases max charge by 10x
   */
  override getMaxChargeForTier(tier: Num): Num {
    if (tier.lte(new Num(1, 0))) {
      return this.baseMaxCharge.copy();
    }
    const tierMultiplier = new Num(10, 0).pow(tier.sub(new Num(1, 0)));
    return this.baseMaxCharge.mul(tierMultiplier);
  }

  getChargeAmount(): Num {
    const yellowFusion = HoldingRecord.yellowFusion.amount;
    const accelerationAmount = UpgradeRecord.fusionBoosterAcceleration.amount.add(Num.ONE);

    // One charge step for each multiple of 1e10 × fusion booster accelerations.
    return yellowFusion.log10().div(new Num(1, 1)).mul(accelerationAmount);
  }

  action(): Num {
    const totalCharge = this.getEffectiveCharge().add(this.getSharedCharge());
    const tierHydrogenBarrierAmp = this.hydrogenBarrierTierBase.pow(this.tier.sub(Num.ONE));
    const tierFusionBarrierAmp = this.fusionBarrierTierBase.pow(this.tier.sub(Num.ONE));

    this.hydrogenBarrierBoost = totalCharge.mul(tierHydrogenBarrierAmp);
    this.fusionBarrierExponent = totalCharge.mul(tierFusionBarrierAmp);

    // Hydrogen generator barrier: +1 per charge, tier amplified.
    GeneratorRecord.hydrogenGenerator.barrier = GeneratorRecord.hydrogenGenerator.startBarrier.add(this.hydrogenBarrierBoost);

    // Fusion barrier: multiplied by 10^(charge), tier amplified.
    HoldingRecord.yellowFusion.maxAmount = HoldingRecord.yellowFusion.startMaxAmount.mul(
      new Num(10, 0).pow(this.fusionBarrierExponent)
    );

    // Hydrogen generation boost: (0.1 × charge + 1), additionally shared-tier amplified.
    const baseHydrogenBoost = Num.ONE.add(totalCharge.mul(new Num(1, 1).pow(new Num(1.5, 0).pow(this.tier))));
    this.hydrogenGenerationBoost = this.applySharedTierBoost(baseHydrogenBoost);
    MultiplierRecord.hydrogenGenerators.correct(this.hydrogenGenerationBoost);

    this.effect = this.hydrogenGenerationBoost;
    return this.effect;
  }

  applyNerfs(): void {
    // Slower hydrogen generation, and each tier strengthens the nerf.
    const hydrogenNerfPower = new Num(0.9, 0).pow(this.tier);
    MultiplierRecord.hydrogenGenerators.addLocalHook(
      this.name,
      (multiplier: Multiplier) => multiplier.power(hydrogenNerfPower),
      true
    );
  }

  revertNerfs(): void {
    delete MultiplierRecord.hydrogenGenerators.localHooks[this.name];
  }

  getNerfDescription(): string {
    return 'Hydrogen generation is slowed while active. Higher charger tiers make this slowdown stronger.';
  }

  getEffectDescription(): string {
    return `${this.effect.toString(2)}x hydrogen generation, +${this.hydrogenBarrierBoost.toString(2)} hydrogen barrier, and +10^${this.fusionBarrierExponent.toString(2)} fusion barrier scaling`;
  }

  getChargeDescription(): string {
    return 'Charges inside dark galaxy from multiples of 1e100 × fusion booster accelerations in yellow fusion.';
  }

  getRewardDescription(): string {
    return 'Hydrogen barrier +1 per charge, fusion barrier ×10^charge, tiers amplify both, and each charge adds (0.1×charge + 1)x hydrogen generation.';
  }

  override getEffectBreakdown(): { formula: string; effects: string[] } {
    return {
      formula: 'charge = log10(yellow fusion) / (100 × fusion booster accelerations)',
      effects: [
        `Total Charge: ${this.getEffectiveCharge().add(this.getSharedCharge()).toString(2)}`,
        `Hydrogen Barrier Boost: +${this.hydrogenBarrierBoost.toString(2)}`,
        `Fusion Barrier Multiplier: ×10^${this.fusionBarrierExponent.toString(2)}`,
        `Hydrogen Generation: ${this.hydrogenGenerationBoost.toString(2)}x`
      ]
    };
  }

  override init() {
    this.requirement = [
      new Requirement(HoldingRecord.yellowFusion, new Num(1, 80000), this)
    ]
  }
}
