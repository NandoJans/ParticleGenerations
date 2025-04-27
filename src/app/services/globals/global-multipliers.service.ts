import { Injectable } from '@angular/core';
import {MultiplierRecord} from "../../classes/records/multipliers/multiplier-record";
import {Generator} from "../../classes/features/generator";
import {Multiplier} from "../../classes/features/multiplier";

@Injectable({
  providedIn: 'root'
})
export class GlobalMultipliersService {
  constructor(
    private multiplierRecord: MultiplierRecord,
  ) {}


  tick() {
    this.resetMultipliers();
  }

  private resetMultipliers() {
    this.multiplierRecord.getList().forEach((multiplier) => {
      multiplier.reset();
    });
  }

  getElements(): Multiplier[] {
    return this.multiplierRecord.getList();
  }
}
