import {Multiplier} from "../../features/multiplier";
import {Num} from "../../../num";

export class MultiplierRecord {
  static redParticleGenerators: Multiplier = new Multiplier('redParticleGenerators', new Num(1, 0))
  static redAcceleratorGenerators: Multiplier = new Multiplier('redAcceleratorGenerators', new Num(1, 0))

  getRedParticleGenerators(): Multiplier {
    return MultiplierRecord.redParticleGenerators
  }
}
