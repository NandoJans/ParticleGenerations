import { Injectable } from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {GeneratorService} from "./interactables/generator.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {Num} from "../num";

@Injectable({
  providedIn: 'root'
})
export class NumberDisplayService {
  numberDisplays: {name: string, type: string, currency: string | undefined, effect?: any[] | undefined}[] = []

  constructor() { }

  add(name: string | undefined, type: string | undefined, currency: string | undefined, effect?: any[] | undefined) {
    // @ts-ignore
    this.numberDisplays.push({name: name, type: type, currency: currency, effect: effect})
  }

  reload() {
    this.numberDisplays.forEach((entry) => {
      const element = <HTMLElement> document.getElementById(entry.name+'-'+entry.type);
      // @ts-ignore
      if (element !== null) {
        switch (entry.type) {
          case 'currency':
            // @ts-ignore
            element.innerHTML = HoldingsService.get(entry.name).toString(); break;
          case 'multiplier':
            // @ts-ignore
            if (GeneratorService.getValue(entry.name, entry.type) !== 0) {
              element.innerHTML = 'x' + GeneratorService.getValue(entry.name, entry.type).toString(true);
            } else {
              element.innerHTML = UpgradeService.getValue(entry.name, entry.type).toString(true);
            }
            break;
          case 'buffer':
            // @ts-ignore
            if (GeneratorService.getValue(entry.name, entry.type) !== 0) {
              element.innerHTML = 'x' + GeneratorService.getValue(entry.name, entry.type).toString(true);
            } else {
              element.innerHTML = UpgradeService.getValue(entry.name, entry.type).toString(true);
            }
            break;
          case 'effect':
              if (entry.effect !== undefined) {
                const effectType = entry.effect[0];
                if (effectType === 'power') {

                  element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).pow(entry.effect[2], false).toString(true)
                } else if (effectType === 'multiply') {

                  element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).mul(entry.effect[2], false).add(new Num(1, 0), false).toString(true)
                } else if (effectType === 'multiplier') {

                  element.innerHTML = 'Current: x'
                } else if (effectType === 'globalMultiplier') {

                  element.innerHTML = 'Current: x' + entry.effect[3].mul(UpgradeService.getValue(entry.name, 'bought'), false)
                } else if (effectType === 'basedOnHolding') {

                  if (entry.effect[3] === 'exponent') {
                      element.innerHTML = 'Current: x' + entry.effect[4].mul(UpgradeService.getValue(entry.name, 'bought'), false)
                      .mul(new Num(HoldingsService.get(entry.effect[2])['exp'], 0), false).toString(true)
                  } else {
                    element.innerHTML = 'Current: x' + entry.effect[4].mul(UpgradeService.getValue(entry.name, 'bought'), false)
                      .mul(HoldingsService.get(entry.effect[2]), false)
                      .mul(entry.effect[1], false).toString(true)
                  }
                } else if (effectType === 'basedOnUpgrade') {

                  element.innerHTML = 'Current: x' + entry.effect[4].pow(UpgradeService.getValue(entry.effect[2], entry.effect[3]), false).toString(true)
                } else if (effectType === 'increaseBuffer') {

                }
              }
            break;
          case 'prestige':
            //console.log(this.prestige.getValue(entry.name, 'gain'))
            // @ts-ignore
            element.innerHTML = PrestigeLayersService.getValue(entry.name, 'gain')
            break;
          default:
            // @ts-ignore
            if (GeneratorService.getValue(entry.name, entry.type) !== 0) {
              element.innerHTML = GeneratorService.getValue(entry.name, entry.type).toString();
              if (entry.currency !== undefined || entry.type === 'cost') element.innerHTML += ' '+ HoldingsService.getAbbreviation(entry.currency)
            } else {
              element.innerHTML = UpgradeService.getValue(entry.name, entry.type).toString();
              if (entry.currency !== undefined || entry.type === 'cost') element.innerHTML += ' '+ HoldingsService.getAbbreviation(entry.currency)
            }
            break;
        }
      }
    })
  }
}
