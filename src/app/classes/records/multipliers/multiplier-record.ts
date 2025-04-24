import {Multiplier} from "../../features/multiplier";
import {Num} from "../../../num";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiplierRecord {

  // Red Phase
  static redParticleGenerators: Multiplier = new Multiplier('redParticleGenerators', new Num(1, 0))

  static list: Multiplier[] = [
    MultiplierRecord.redParticleGenerators,
  ];

  getList(): Multiplier[] {
    return MultiplierRecord.list;
  }
}
