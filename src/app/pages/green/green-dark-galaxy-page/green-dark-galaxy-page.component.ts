import { Component } from '@angular/core';
import {AppModule} from "../../../app.module";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {DarkGalaxyChallenge} from "../../../classes/features/challenges/dark-galaxy-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChargerRecord} from "../../../classes/records/charger/charger-record";

@Component({
  selector: 'app-green-dark-galaxy-page',
  templateUrl: './green-dark-galaxy-page.component.html',
  styleUrl: './green-dark-galaxy-page.component.css',
  standalone: false
})
export class GreenDarkGalaxyPageComponent {
  darkStarHolding: Holding = HoldingRecord.darkStarHolding;
  darkGalaxy: DarkGalaxyChallenge = ChallengeRecord.darkGalaxy;
  charger = ChargerRecord.redGeneratorDarkCharger;
}
