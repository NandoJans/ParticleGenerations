import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlackHoleService {
  static on = false;
  static save() {
    localStorage['blackHoleStatus'] = JSON.stringify(this.on)
  }
  static load() {
    if (localStorage['blackHoleStatus'] !== undefined) {
      this.on = JSON.parse(localStorage['blackHoleStatus'])
    }
  }
  constructor() { }
}
