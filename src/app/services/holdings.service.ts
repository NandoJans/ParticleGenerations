import {Injectable} from '@angular/core';
import {Num} from "../num";
import {holdings} from "./interactables/holdings/holdings";

@Injectable({
  providedIn: 'root'
})
export class HoldingsService {
  static holdings = holdings;

  static add(key: string, addition: Num) {
    // @ts-ignore
    this.holdings[key]['amount'].add(addition);
  }

  static remove(currency: string, cost: Num) {
    // @ts-ignore
    this.holdings[currency]['amount'].sub(cost);
  }

  static get(key: string) {
    // @ts-ignore
    if (this.holdings[key] !== undefined) {
      // @ts-ignore
      return this.holdings[key]['amount']
    }
    return undefined
  }

  static set(key: string, number: Num) {
    // @ts-ignore
    this.holdings[key]['amount'] = number;
  }

  static save() {
    const save = {};
    Object.entries(this.holdings).forEach((value) => {
      // @ts-ignore
      save[value[0]] = {amount: value[1].amount}
    })
    localStorage['holdings'] = JSON.stringify(save);
  }

  static load() {
    const holdings = JSON.parse(localStorage['holdings']);
    Object.entries(this.holdings).forEach((holding) => {
      if (holdings[holding[0]] !== undefined) {
        // @ts-ignore
        this.holdings[holding[0]]['amount'] = new Num(holdings[holding[0]]['amount']['num'], holdings[holding[0]]['amount']['exp']);
      }
    })
  }

  static getAbbreviation(holding: string | undefined) {
    switch (holding) {
      case 'redParticles': return 'RP';
      case 'yellowParticles': return 'YP';
      case 'yellows': return 'y';
      case 'redAccelerators': return 'RA';
      case 'greenParticles': return 'GP';
      case 'greenEnergy': return 'GE';
      case 'darkEnergy': return 'DE';
      case 'greenSouls': return 'GS';
      default: return '';
    }
  }
}
