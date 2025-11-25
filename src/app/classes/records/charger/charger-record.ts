import {Record} from "../record";
import {Charger} from "../../features/charger";
import {RedGeneratorDarkStarCharger} from "../../features/chargers/red-generator-dark-star-charger";
import {RedAcceleratorDarkStarCharger} from "../../features/chargers/red-accelerator-dark-star-charger";
import {YellowUpgradeDarkStarCharger} from "../../features/chargers/yellow-upgrade-dark-star-charger";
import {YellowGeneratorDarkStarCharger} from "../../features/chargers/yellow-generator-dark-star-charger";
import {StarChallengeDarkStarCharger} from "../../features/chargers/star-challenge-dark-star-charger";
import {YellowFusionDarkStarCharger} from "../../features/chargers/yellow-fusion-dark-star-charger";
import {StarKeyDarkStarCharger} from "../../features/chargers/star-key-dark-star-charger";
import {CombineDarkStarCharger} from "../../features/chargers/combine-dark-star-charger";
import {Num} from "../../../num";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChargerRecord extends Record {
  /**
   * Shared tier multiplier that boosts all charger effects based on total tiers.
   * This makes tiering up chargers worthwhile as it benefits all chargers.
   */
  static sharedTierMultiplier: Num = new Num(1, 0);

  /**
   * Calculate the total tiers across all chargers
   */
  static getTotalTiers(): Num {
    let totalTiers = new Num(0, 0);
    ChargerRecord.list.forEach(charger => {
      totalTiers = totalTiers.add(charger.tier);
    });
    return totalTiers;
  }

  /**
   * Update the shared tier multiplier based on total tiers across all chargers.
   * The multiplier is calculated as: 1 + (totalTiers - numberOfChargers) * 0.1
   * This means each tier above 1 contributes +10% to all charger effects.
   */
  static updateSharedTierMultiplier(): void {
    const totalTiers = ChargerRecord.getTotalTiers();
    const numberOfChargers = new Num(ChargerRecord.list.length, 0);
    // Extra tiers = total tiers - base tiers (1 per charger)
    const extraTiers = totalTiers.sub(numberOfChargers);
    // Each extra tier gives +10% boost (0.1 per tier)
    ChargerRecord.sharedTierMultiplier = Num.ONE.add(extraTiers.mul(new Num(0.1, 0)));
  }
  static redGeneratorDarkCharger: RedGeneratorDarkStarCharger = new RedGeneratorDarkStarCharger('red-generator-dark-star-charger');
  static redAcceleratorDarkCharger: RedAcceleratorDarkStarCharger = new RedAcceleratorDarkStarCharger('red-accelerator-dark-star-charger');
  static yellowUpgradeDarkCharger: YellowUpgradeDarkStarCharger = new YellowUpgradeDarkStarCharger('yellow-upgrade-dark-star-charger');
  static yellowGeneratorDarkCharger: YellowGeneratorDarkStarCharger = new YellowGeneratorDarkStarCharger('yellow-generator-dark-star-charger');
  static starChallengeDarkCharger: StarChallengeDarkStarCharger = new StarChallengeDarkStarCharger('star-challenge-dark-star-charger');
  static yellowFusionDarkCharger: YellowFusionDarkStarCharger = new YellowFusionDarkStarCharger('yellow-fusion-dark-star-charger');
  static starKeyDarkCharger: StarKeyDarkStarCharger = new StarKeyDarkStarCharger('star-key-dark-star-charger');
  static combineDarkCharger: CombineDarkStarCharger = new CombineDarkStarCharger('combine-dark-star-charger');

  static override list: Charger[] = [
    ChargerRecord.redGeneratorDarkCharger,
    ChargerRecord.redAcceleratorDarkCharger,
    ChargerRecord.yellowUpgradeDarkCharger,
    ChargerRecord.yellowGeneratorDarkCharger,
    ChargerRecord.starChallengeDarkCharger,
    ChargerRecord.yellowFusionDarkCharger,
    ChargerRecord.starKeyDarkCharger,
    ChargerRecord.combineDarkCharger,
  ];

  getList(): Charger[] {
    return ChargerRecord.list;
  }

  init() {
    this.getList().forEach(charger => charger.init());
  }

  load() {
    this.getList().forEach(charger => charger.tryLoad());
  }

  save() {
    this.getList().forEach(charger => charger.save());
  }

  run(speed: Num) {
    // Update the shared tier multiplier before running chargers
    ChargerRecord.updateSharedTierMultiplier();
    this.getList().forEach(charger => charger.run(speed));
  }
}
