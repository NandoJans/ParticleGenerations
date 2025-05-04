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

  // Yellow Phase
  static yellowParticleGain: Multiplier = new Multiplier('yellowParticleGain', new Num(1, 0));
  static yellowKeyGain: Multiplier = new Multiplier('yellowKeyGain', new Num(1, 0));
  static yellowPrestigeGain: Multiplier = new Multiplier('yellowPrestigeGain', new Num(1, 0));
  static yellowParticleIdleGeneration: Multiplier = new Multiplier('yellowParticleIdleGeneration', new Num(0, 0));
  static yellowGenerators: Multiplier = new Multiplier('yellowGenerators', new Num(1, 0));

  static list: Multiplier[] = [
    // Red Phase
    MultiplierRecord.redParticleGenerators,
    MultiplierRecord.redAcceleratorGenerators,

    // Yellow Phase
    MultiplierRecord.yellowParticleGain,
    MultiplierRecord.yellowKeyGain,
    MultiplierRecord.yellowPrestigeGain,
    MultiplierRecord.yellowParticleIdleGeneration,
    MultiplierRecord.yellowGenerators,

  ];

  getList(): Multiplier[] {
    return MultiplierRecord.list;
  }
}
