import { Injectable } from '@angular/core';
import {EnhancementRecord} from "../classes/records/enhancement-record";
import {Enhancement} from "../classes/features/enhancements/enhancement";
import {Enhancable} from "../classes/features/interfaces/enhancable";

@Injectable({
  providedIn: 'root'
})
export class EnhancementService {
  enhancing: Enhancement|null = null;

  constructor(
    private enhancementRecord: EnhancementRecord
  ) { }

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
    if (this.enhancing) {
      this.enhancing.holding.amount = this.enhancing.holding.amount.sub(this.enhancing.getRequirement());
      enhancable.enhancement = this.enhancing;
      this.enhancing.add(enhancable);
      this.enhancing = null;
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
