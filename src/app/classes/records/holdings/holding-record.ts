import {RedParticleHolding} from "../../features/holdings/red-particle-holding";
import {Holding} from "../../features/holding";
import { Injectable } from '@angular/core';
import {RedAcceleratorHolding} from "../../features/holdings/red-accelerator-holding";
import {YellowParticleHolding} from "../../features/holdings/yellow-particle-holding";
import {YellowKeyHolding} from "../../features/holdings/yellow-key-holding";
import {YellowPrestigeHolding} from "../../features/holdings/yellow-prestige-holding";
import {YellowPowerHolding} from "../../features/holdings/yellow-power-holding";

@Injectable({
  providedIn: 'root'
})
export class HoldingRecord {

  // Red Phase
  static redParticles: RedParticleHolding = new RedParticleHolding()
  static redAccelerators: RedAcceleratorHolding = new RedAcceleratorHolding();

  // Yellow Phase
  static yellowParticles: YellowParticleHolding = new YellowParticleHolding();
  static yellowKeys: YellowKeyHolding = new YellowKeyHolding();
  static yellowPrestiges: YellowPrestigeHolding = new YellowPrestigeHolding();
  static yellowPower: YellowPowerHolding = new YellowPowerHolding();


  static getList(): Holding[] {
    return [
      HoldingRecord.redParticles,
      HoldingRecord.redAccelerators,

      HoldingRecord.yellowParticles,
      HoldingRecord.yellowKeys,
      HoldingRecord.yellowPrestiges,
      HoldingRecord.yellowPower
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
