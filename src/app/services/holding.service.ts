import { Injectable } from '@angular/core';
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Generator} from "../classes/features/generator";
import {Holding} from "../classes/features/holding";

@Injectable({
  providedIn: 'root'
})
export class HoldingService {
  constructor(
    private holdingRecord: HoldingRecord
  ) {}

  tick() {
    this.holdingRecord.action();
  }

  getElements(): Holding[] {
    return this.holdingRecord.getList();
  }
}
