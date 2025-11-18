import { Component } from '@angular/core';
import {ChargerRecord} from "../../classes/records/charger/charger-record";
import {DarkStarChargerComponent} from "../../components/particles/dark-star-charger/dark-star-charger.component";
import {Num} from "../../num";

@Component({
  selector: 'app-charger-test',
  imports: [DarkStarChargerComponent],
  templateUrl: './charger-test.component.html',
  styleUrl: './charger-test.component.css',
})
export class ChargerTestComponent {
  charger = ChargerRecord.redGeneratorDarkCharger;

  constructor() {
    // Set some test values for demonstration
    this.charger.amount = new Num(1, 2); // 100
    this.charger.charging = false;
  }

  addCharge() {
    this.charger.amount = this.charger.amount.add(new Num(5, 1)); // Add 50
  }

  resetCharge() {
    this.charger.amount = new Num(0, 0);
  }

  setToMax() {
    this.charger.amount = this.charger.max.copy();
  }

  setToHalf() {
    this.charger.amount = this.charger.max.div(new Num(2, 0));
  }
}
