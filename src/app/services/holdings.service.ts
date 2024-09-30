import {Injectable} from '@angular/core';
import {Num} from "../num";

@Injectable({
  providedIn: 'root'
})
export class HoldingsService {
  static holdings: object = {}

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
      case 'greens': return 'g';
      case 'blueParticles': return 'BP';
      case 'blues': return 'b';
      case 'blueLight': return 'BL';
      case 'purpleParticles': return 'P';
      case 'blackHoleMass': return 'BM';
      case 'gravity': return 'G';
      case 'purples': return 'p';
      default: return '';
    }
  }

  static setEffect(key: string, effect: Num) {
    // @ts-ignore
    this.holdings[key]['effect'] = effect
  }

  static getEffect(key: string) {
    // @ts-ignore
    if (this.holdings[key]['effect'] !== undefined) {
      // @ts-ignore
      return this.holdings[key]['effect']
    }
    return undefined
  }

  static action() {
    Object.entries(this.holdings).forEach((holding) => {
      let effect = (holding[1].action !== undefined) ? holding[1].action(holding[1].amount.copy()) : undefined;
      if (effect !== undefined) holding[1].effect = effect;
    })
  }

  static beforeAction() {
    Object.entries(this.holdings).forEach((holding) => {
      let effect = (holding[1].beforeAction !== undefined) ? holding[1].beforeAction(holding[1].amount.copy()) : undefined;
      if (effect !== undefined) holding[1].effect = effect;
    })
  }
}
