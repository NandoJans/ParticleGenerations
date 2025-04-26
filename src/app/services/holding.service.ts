import { Injectable } from '@angular/core';
import {HoldingRecord} from "../classes/records/holdings/holding-record";

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
}
