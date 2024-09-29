import { Component, OnInit, Input } from '@angular/core';
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Num} from "../../../num";
import {HoldingDisplay} from "../../../classes/displays/holding-display";

@Component({
  selector: 'app-number-display',
  templateUrl: './number-display.component.html',
  styleUrls: ['./number-display.component.css']
})
export class NumberDisplayComponent  {
  @Input() holding: Holding = HoldingRecord['redParticles'];
  holdingDisplay: HoldingDisplay = this.holding.getHoldingDisplay();

  constructor() { }

  getHoldingAmount(): string {
    return this.holding.getAmountDisplay()
  }

  getHoldingEffect() {
    return this.holding.getEffectDisplay()
  }

  hasHoldingEffect() {
    return this.holding.hasEffect()
  }
}
