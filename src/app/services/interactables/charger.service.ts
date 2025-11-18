import { Injectable } from '@angular/core';
import {Charger} from "../../classes/features/charger";
import {ChargerRecord} from "../../classes/records/charger/charger-record";

@Injectable({
  providedIn: 'root'
})
export class ChargerService {

  getList(): Charger[] {
    return ChargerRecord.list;
  }

  getElements(): Charger[] {
    return this.getList();
  }

  save() {
    this.getList().forEach((charger) => {
      charger.save();
    });
  }

  init() {
    this.getList().forEach((charger) => {
      charger.init();
    });
  }

  load() {
    this.getList().forEach((charger) => {
      charger.tryLoad();
    });
  }
}
