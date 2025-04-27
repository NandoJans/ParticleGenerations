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

  static getList(): Holding[] {
    return [
      HoldingRecord.redParticles,
      HoldingRecord.redAccelerators,
    ]
  }

  getList(): Holding[] {
    return HoldingRecord.getList()
  }

  load() {
    this.getList().forEach((holding: Holding) => {
      holding.tryLoad()
    })
  }

  save() {
    this.getList().forEach((holding: Holding) => {
      holding.save()
    })
  }

  action() {
    this.getList().forEach((holding: Holding) => {
      holding.effect = holding.action()
    })
  }

  getRedParticles() { return HoldingRecord.redParticles }
}
