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

export class ChargerRecord extends Record {
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
}
