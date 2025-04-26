import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {Holding} from "../../features/holding";
import { Injectable } from '@angular/core';
import {RedAcceleratorHolding} from "../../features/holdings/red-accelerator-holding";

@Injectable({
  providedIn: 'root'
})
export class HoldingRecord {

  // Red Phase
  static redParticles: RedParticleHolding = new RedParticleHolding()
  static redAccelerators: RedAcceleratorHolding = new RedAcceleratorHolding();

  static getArray(): Holding[] {
    return [
      HoldingRecord.redParticles,
      HoldingRecord.redAccelerators,
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

  action() {
    this.getArray().forEach((holding: Holding) => {
      holding.effect = holding.action()
    })
  }

  getRedParticles() { return HoldingRecord.redParticles }
}
