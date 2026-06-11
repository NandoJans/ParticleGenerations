import {Multiplier} from "../../features/multiplier";
import {Num} from "../../../num";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiplierRecord {

  // Red Phase
  static redParticleGenerators: Multiplier = new Multiplier('redParticleGenerators', new Num(1, 0))
  static redAcceleratorGenerators: Multiplier = new Multiplier('redAcceleratorGenerators', new Num(1, 0));
  static freeRedGeneratorBoosters: Multiplier = new Multiplier('freeRedGeneratorBoosters', new Num(0, 0), 50);
  static redGeneratorBoosterBuyMultiplier: Multiplier = new Multiplier('redGeneratorBoosterBuyMultiplier', new Num(1, 0));

  // Yellow Phase
  static yellowParticleGain: Multiplier = new Multiplier('yellowParticleGain', new Num(1, 0), 50);
  static yellowKeyGain: Multiplier = new Multiplier('yellowKeyGain', new Num(1, 0), 50);
  static yellowPrestigeGain: Multiplier = new Multiplier('yellowPrestigeGain', new Num(1, 0), 50);
  static yellowParticleIdleGeneration: Multiplier = new Multiplier('yellowParticleIdleGeneration', new Num(0, 0), 50);
  static yellowGenerators: Multiplier = new Multiplier('yellowGenerators', new Num(1, 0));
  static yellowFusionGenerators: Multiplier = new Multiplier('yellowFusionGenerators', new Num(0.1, 0));
  static hydrogenGenerators: Multiplier = new Multiplier('hydrogenGenerators', new Num(0.1, 0));
  static starKeyCompressionSpeed: Multiplier = new Multiplier('starKeyCompressionSpeed', new Num(1, 0), 50);
  static starKeyCompressionTimeIncrease: Multiplier = new Multiplier('starKeyCompressionTimeIncrease', new Num(2, 0));

  // Green Phase
  static greenParticleGain: Multiplier = new Multiplier('greenParticleGain', new Num(1, 0), 50);
  static greenPrestigeGain: Multiplier = new Multiplier('greenPrestigeGain', new Num(1, 0), 50);
  static greenParticleIdleGeneration: Multiplier = new Multiplier('greenParticleIdleGeneration', new Num(0, 0), 50);
  static totalDarkEnergyGain: Multiplier = new Multiplier('totalDarkEnergyGain', new Num(0, 0), 50);
  static totalDarkEnergyCost: Multiplier = new Multiplier('totalDarkEnergyCost', new Num(0, 0), 50);
  static greenGenerators: Multiplier = new Multiplier('greenGenerators', new Num(1, 0));
  static darkChargerEffects: Multiplier = new Multiplier('darkChargerEffects', new Num(1, 0));
  static nuclearFissionGain: Multiplier = new Multiplier('nuclearFissionGain', new Num(1, 0));

  // Star Challenge Charger
  static starChallengeHoldingSpeed: Multiplier = new Multiplier('starChallengeHoldingSpeed', new Num(1, 0), 3);
  static challengeBuffBoost: Multiplier = new Multiplier('challengeBuffBoost', new Num(1, 0), 3);
  static proximaCentauriMaxBuff: Multiplier = new Multiplier('proximaCentauriMaxBuff', new Num(1, 0), 3);

  static list: Multiplier[] = [
    // Red Phase
    MultiplierRecord.redParticleGenerators,
    MultiplierRecord.redAcceleratorGenerators,
    MultiplierRecord.freeRedGeneratorBoosters,
    MultiplierRecord.redGeneratorBoosterBuyMultiplier,

    // Yellow Phase
    MultiplierRecord.yellowParticleGain,
    MultiplierRecord.yellowKeyGain,
    MultiplierRecord.yellowPrestigeGain,
    MultiplierRecord.yellowParticleIdleGeneration,
    MultiplierRecord.yellowGenerators,
    MultiplierRecord.yellowFusionGenerators,
    MultiplierRecord.hydrogenGenerators,
    MultiplierRecord.starKeyCompressionSpeed,
    MultiplierRecord.starKeyCompressionTimeIncrease,

    // Green Phase
    MultiplierRecord.greenParticleGain,
    MultiplierRecord.greenPrestigeGain,
    MultiplierRecord.greenParticleIdleGeneration,
    MultiplierRecord.totalDarkEnergyGain,
    MultiplierRecord.totalDarkEnergyCost,
    MultiplierRecord.greenGenerators,
    MultiplierRecord.darkChargerEffects,
    MultiplierRecord.nuclearFissionGain,

    // Star Challenge Charger
    MultiplierRecord.starChallengeHoldingSpeed,
    MultiplierRecord.challengeBuffBoost,
    MultiplierRecord.proximaCentauriMaxBuff,

  ];

  getList(): Multiplier[] {
    return MultiplierRecord.list;
  }

  static reset() {
    this.list.forEach((multiplier) => {
      multiplier.reset();
    })
  }
}
