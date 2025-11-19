import { Component } from '@angular/core';
import {AppModule} from "../../../app.module";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {DarkGalaxyChallenge} from "../../../classes/features/challenges/dark-galaxy-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChargerRecord} from "../../../classes/records/charger/charger-record";
import {DarkStarCharger} from "../../../classes/features/chargers/dark-star-charger";

@Component({
  selector: 'app-green-dark-galaxy-page',
  templateUrl: './green-dark-galaxy-page.component.html',
  styleUrl: './green-dark-galaxy-page.component.css',
  standalone: false
})
export class GreenDarkGalaxyPageComponent {
  darkStarHolding: Holding = HoldingRecord.darkStarHolding;
  darkGalaxy: DarkGalaxyChallenge = ChallengeRecord.darkGalaxy;
  
  // Chargers
  chargers: DarkStarCharger[] = [
    ChargerRecord.redGeneratorDarkCharger,
    ChargerRecord.redAcceleratorDarkCharger,
    ChargerRecord.yellowUpgradeDarkCharger,
    ChargerRecord.yellowGeneratorDarkCharger,
    ChargerRecord.starChallengeDarkCharger,
    ChargerRecord.yellowFusionDarkCharger,
    ChargerRecord.starKeyDarkCharger,
    ChargerRecord.combineDarkCharger,
  ];
}
