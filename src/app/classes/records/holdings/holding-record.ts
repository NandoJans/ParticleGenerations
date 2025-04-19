import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {Holding} from "../../features/holding";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoldingRecord {

  // Red Phase
  static redParticles     = new RedParticleHolding()

  static getArray(): Holding[] {
    return [
      HoldingRecord.redParticles,
    ]
  }

  getArray(): Holding[] {
    return HoldingRecord.getArray()
  }

  load() {
    this.getArray().forEach((holding: Holding) => {
      holding.tryLoad()
    })
  }

  save() {
    this.getArray().forEach((holding: Holding) => {
      holding.save()
    })
  }

  getRedParticles() { return HoldingRecord.redParticles }
}
