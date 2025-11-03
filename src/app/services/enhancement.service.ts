import { Injectable } from '@angular/core';
import {EnhancementRecord} from "../classes/records/enhancement-record";
import {Enhancement} from "../classes/features/enhancements/enhancement";
import {Enhancable} from "../classes/features/interfaces/enhancable";
import {Num} from "../num";
import {ResetHelper} from "../classes/helpers/reset-helper";

@Injectable({
  providedIn: 'root'
})
export class EnhancementService {
  enhancing: Enhancement|null = null;

  constructor(
    private enhancementRecord: EnhancementRecord
  ) { }

  respecEnhancement(enhancement: Enhancement) {
    let returnHolding: Num = new Num(1, 0);
    Object.entries(enhancement.enhancables).forEach(([key, enhancable]) => {
      enhancable.enhancement = null;
      delete enhancement.enhancables[key];
      enhancement.holding.amount = enhancement.holding.amount.add(returnHolding);
      returnHolding = returnHolding.mul(new Num(2, 0));
    })
    ResetHelper.reset(enhancement.respecResetKey);
  }

  isEnhancing(): boolean {
    return this.enhancing !== null;
  }

  getEnhancing(): Enhancement|null {
    return this.enhancing;
  }

  canEnhance(enhancement: Enhancement): boolean {
    return this.enhancing === null && enhancement.canEnhance();
  }

  startEnhancing(enhancement: Enhancement) {
    if (this.canEnhance(enhancement)) {
      this.enhancing = enhancement;
    }
  }

  enhance(enhancable: Enhancable) {
    if (this.enhancing && enhancable.allowedEnhancements.includes(this.enhancing)) {
      this.enhancing.holding.amount = this.enhancing.holding.amount.sub(this.enhancing.getRequirement());
      enhancable.enhancement = this.enhancing;
      this.enhancing.add(enhancable);

      if (!this.enhancing.canEnhance()) {
        this.stopEnhancing()
      }
    }
  }

  tick() {
    this.enhancementRecord.getList().forEach(enhancement => {
      enhancement.run();
    })
  }

  stopEnhancing() {
    this.enhancing = null;
  }
}
