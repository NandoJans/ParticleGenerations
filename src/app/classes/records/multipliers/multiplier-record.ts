import {Multiplier} from "../../features/multiplier";
import {Num} from "../../../num";

export class MultiplierRecord {

  // Red Phase
  static redParticleGenerators: Multiplier = new Multiplier('redParticleGenerators', new Num(1, 0))
  static redAcceleratorGenerators: Multiplier = new Multiplier('redAcceleratorGenerators', new Num(1, 0))

  // Yellow Phase
  static yellowParticlesGain: Multiplier = new Multiplier('yellowParticlesGain', new Num(1, 0))
  static yellowPowerGenerators: Multiplier = new Multiplier('yellowPowerGenerators', new Num(1, 0))
  static yellowFusion: Multiplier = new Multiplier('yellowFusion', new Num(1, 0))
  static greenParticleGenerators: Multiplier = new Multiplier('greenParticleGenerators', new Num(1, 0))

  static greenSoulsGain: Multiplier = new Multiplier('greenSoulsGain', new Num(1, 0))

  getRedParticleGenerators(): Multiplier {
    return MultiplierRecord.redParticleGenerators
  }
}
