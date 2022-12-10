import { Injectable } from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {GeneratorService} from "./interactables/generator.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {Num} from "../num";
import {MilestoneService} from "./interactables/milestone.service";
import {AutomatorService} from "./interactables/automator.service";
import {ChallengeService} from "./interactables/challenge.service";
import {GlobalMultipliersService} from "./globals/global-multipliers.service";

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

                  if (entry.effect[3] === 'holdingPower') {
                    console.log()
                    element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).pow(HoldingsService.get(entry.effect[2]), false).toString(true)
                  } else {
                    element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).pow(entry.effect[2], false).toString(true)
                  }
                } else if (effectType === 'yellowBlueLightEffect') {
                  // @ts-ignore
                  element.innerHTML = 'x' + new Num(HoldingsService.get('yellowFusion').exp+1, 0).pow(GlobalMultipliersService.get('yellowFusionBlueLightEffect'), false).toString(true)
                } else if (effectType === 'powerWithUpgrade') {
                  element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).mul(UpgradeService.getValue(entry.effect[3], 'buffer'), false).pow(entry.effect[2], false).toString(true)
                } else if (effectType === 'powerWithBase') {
                  element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).pow(entry.effect[2].mul(UpgradeService.getValue('better-nuclear-decay', 'buffer').pow(UpgradeService.getValue('better-nuclear-decay', 'bought'), false), false), false).add(UpgradeService.getValue('nuclear-decay-base-increaser', 'bought'), false).toString(true)
                } else if (effectType === 'powerOfGlobalMultiplier') {
                  element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).pow(GlobalMultipliersService.get(entry.effect[2]), false).toString(true)
                } else if (effectType === 'log') {

                  element.innerHTML = HoldingsService.get(entry.effect[1]).log(entry.effect[2], false).toString()
                } else if (effectType === 'multiply') {

                  element.innerHTML = 'x' + HoldingsService.get(entry.effect[1]).mul(entry.effect[2], false).add(new Num(1, 0), false).toString(true)
                } else if (effectType === 'multiplier') {

                  element.innerHTML = 'Current: x'
                } else if (effectType === 'globalMultiplier') {

                  //element.innerHTML = 'Current: x' + entry.effect[3].mul(UpgradeService.getValue(entry.name, 'bought'), false)
                } else if (effectType === 'basedOnHolding') {
                  if (entry.effect[3] === 'exponent') {
                    element.innerHTML = 'Current: x' + new Num(HoldingsService.get(entry.effect[2]).exp, 0).pow(entry.effect[4], false);
                  } else if (entry.effect[3] === 'power') {
                    element.innerHTML = 'Current: x' + HoldingsService.get(entry.effect[2]).pow(entry.effect[1], false).toString(true)
                  } else {
                    element.innerHTML = 'Current: x' + HoldingsService.get(entry.effect[2]).mul(entry.effect[1], false).add(new Num(1, 0), false).toString(true)
                  }
                } else if (effectType === 'basedOnUpgrade') {

                  element.innerHTML = 'Current: x' + UpgradeService.getValue(entry.effect[2], 'buffer').pow(UpgradeService.getValue(entry.effect[2], entry.effect[3]), false).toString(true)
                } else if (effectType === 'basedOnUpgradeMul') {

                  element.innerHTML = 'Current: x' + UpgradeService.getValue(entry.effect[2], 'buffer').mul(UpgradeService.getValue(entry.effect[2], entry.effect[3]), false).pow(entry.effect[4], false).toString(true)
                } else if (effectType === 'basedOnGenerator') {

                  element.innerHTML = 'Current: x' + GeneratorService.getValue(entry.effect[2], entry.effect[3]).pow(entry.effect[4], false).add(new Num(1, 0), false).toString(true)
                } else if (effectType === 'increaseBuffer') {

                } else if (effectType === 'increaseHoldingIncremental') {
                  element.innerHTML = 'Current: x' + entry.effect[1].pow(UpgradeService.getValue(entry.effect[2], entry.effect[3]), false)
                }  else if (effectType === 'amplifyUpgrade') {

                } else if (effectType === 'darkPowerGain') {
                  // @ts-ignore
                  element.innerHTML = ''+new Num(Math.floor(HoldingsService.get('yellowParticles').exp / 110), 0).sub(HoldingsService.get('darkPower'), false).toString()
                } else if (effectType === 'darkPowerEffect') {
                  // @ts-ignore
                  element.innerHTML = 'x' + new Num(5, 0).pow(HoldingsService.get('darkPower'), false).toString()
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
            } else if (UpgradeService.getValue(entry.name, entry.type) !== 0) {
              element.innerHTML = UpgradeService.getValue(entry.name, entry.type).toString();
              if (entry.currency !== undefined || entry.type === 'cost') element.innerHTML += ' '+ HoldingsService.getAbbreviation(entry.currency)
            } else if (MilestoneService.getValue(entry.name, entry.type) !== 0) {
              element.innerHTML = MilestoneService.getValue(entry.name, entry.type).toString();
              if (entry.currency !== undefined || entry.type === 'cost') element.innerHTML += ' '+ HoldingsService.getAbbreviation(entry.currency)
            } else {
              element.innerHTML = AutomatorService.getValue(entry.name, entry.type).toString();
              if (entry.currency !== undefined || entry.type === 'cost') element.innerHTML += ' '+ HoldingsService.getAbbreviation(entry.currency)
            }
            break;
        }
      }
    })
  }
}
