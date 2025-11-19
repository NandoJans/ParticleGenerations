import { Injectable } from '@angular/core';
import {ChargerRecord} from "../classes/records/charger/charger-record";

@Injectable({
  providedIn: 'root'
})
export class ChargerService {

  constructor(
    private chargerRecord: ChargerRecord,
  ) {

  }

  getElements() {
    return this.chargerRecord.getList();
  }
}
