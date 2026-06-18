import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {HoldingDisplay} from "../../../classes/displays/holding-display";
import {HoldingDisplayLine} from "../../../interfaces/holding-display-line";

@Component({
    selector: 'app-number-display',
    templateUrl: './number-display.component.html',
    styleUrls: ['./number-display.component.css'],
    standalone: false
})
export class NumberDisplayComponent implements OnInit, OnChanges {
  @Input() holding: Holding = HoldingRecord.redParticles;
  holdingDisplay: HoldingDisplay;

  constructor(
    protected holdingRecord: HoldingRecord
  ) {
    this.holdingDisplay = this.holding.getHoldingDisplay();
  }

  getHoldingAmount(): string {
    return this.holding.getAmountDisplay()
  }

  getHoldingEffect() {
    return this.holding.getEffectDisplay() || "-"
  }

  hasHoldingEffect() {
    return this.holding.hasEffect() || this.holdingDisplay.getEffectPrefix() || this.holdingDisplay.getEffectSuffix();
  }

  getLines(): HoldingDisplayLine[] {
    return this.holdingDisplay.getLines()
  }

  ngOnInit() {
    this.refreshHoldingDisplay();
  }

  ngOnChanges() {
    this.refreshHoldingDisplay();
  }

  private refreshHoldingDisplay(): void {
    this.holdingDisplay = this.holding.getHoldingDisplay();
  }
}
