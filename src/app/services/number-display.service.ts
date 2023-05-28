import { Injectable } from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {GeneratorService} from "./interactables/generator.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {PrestigeLayersService} from "./prestige-layers.service";
import {Num} from "../num";
import {MilestoneService} from "./interactables/milestone.service";
import {AutomatorService} from "./interactables/automator.service";
import {GlobalMultipliersService} from "./globals/global-multipliers.service";
import {CombinerService} from "./interactables/combiner.service";
import {ChallengeService} from "./interactables/challenge.service";
import {UpgradeComponent} from "../components/particles/upgrade/upgrade.component";

@Injectable({
  providedIn: 'root'
})
export class NumberDisplayService {
  static numberDisplays: {name: string, type: string, currency: string | undefined, effect?: any[] | undefined, permanent?: boolean | undefined}[] = []

  static reset() {
    for (let i = 0; i < this.numberDisplays.length; i++) {
      let nd = this.numberDisplays[i];
      if (nd.permanent === undefined && !nd.permanent) {
        let perm1 = this.numberDisplays.slice(0, i)
        let perm2 = this.numberDisplays.slice(i+1)
        this.numberDisplays = perm1.concat(perm2);
        i--;
      }
    }
  }

  static add(name: string | undefined, type: string | undefined, currency: string | undefined, effect?: string[] | undefined, permanent?: boolean | undefined) {
    // @ts-ignore
    this.numberDisplays.push({name: name, type: type, currency: currency, effect: effect, permanent: permanent})
  }

  static reload() {
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
              switch (entry.effect[0]) {
                case 'upgrade':
                  const effect = UpgradeService.getValue(entry.effect[1], 'effect');
                  if (effect !== undefined) element.innerHTML = 'Effect: x'+effect.add(new Num(0, 0), false).toString(true); break;
                case 'challenge':
                  const effect1 = ChallengeService.getValue(entry.effect[1], 'effect');
                  if (effect1 !== undefined) element.innerHTML = 'Effect: x'+effect1.add(new Num(0, 0), false).toString(true); break;
                case 'holding':
                  const effect2 = HoldingsService.getEffect(entry.effect[1]);
                  if (effect2 !== undefined) element.innerHTML = 'Effect: x'+effect2.add(new Num(0, 0), false).toString(true); break;
                case 'prePurple':
                  element.innerHTML = HoldingsService.get(entry.effect[1]).pow(HoldingsService.get('purpleVoid').log10(false), false).log(entry.effect[2], false).toString(true); break;
                case 'globalMultiplierPower':
                  element.innerHTML = 'x'+HoldingsService.get(entry.effect[1]).pow(GlobalMultipliersService.get(entry.effect[2]), false).toString(true)
                  break;
                case 'holdingPower':
                  element.innerHTML = 'x'+HoldingsService.get(entry.effect[1]).pow(HoldingsService.get(entry.effect[2]), false).toString(true)
                  break;
                case 'log':
                  element.innerHTML = HoldingsService.get(entry.effect[1])[entry.effect[0]](entry.effect[2], false).toString()
                  break;
                case 'powerWithBase':
                  element.innerHTML = 'x'+HoldingsService.get(entry.effect[1]).pow(entry.effect[2].mul(UpgradeService.getValue(entry.effect[3], 'buffer').pow(UpgradeService.getValue(entry.effect[3], 'bought'), false), false), false).toString(true)
                  break;
                default:
                  //element.innerHTML = 'x'+HoldingsService.get(entry.effect[1])[entry.effect[0]](entry.effect[2], false).toString(true)
                  break;
              }
            }
            break;
          case 'holdingEffect':
            element.innerHTML = 'x'+HoldingsService.getEffect(entry.name).toString(true)
            break;
          case 'holdingEffectNoProduct':
            element.innerHTML = HoldingsService.getEffect(entry.name).toString()
            break;
          case 'darkPowerGain':
            // @ts-ignore
            element.innerHTML = new Num(Math.floor(HoldingsService.get('yellowParticles').exp / 110), 0).add(new Num(0, 0), false).toString();
            break;
          case 'fusionBlueLight':
            // @ts-ignore
            element.innerHTML = 'x'+new Num(HoldingsService.get('yellowFusion').exp+1, 0).pow(GlobalMultipliersService.get('yellowFusionBlueLightEffect'), false).toString(true)
            break;
          case 'gainPS':
            // @ts-ignore
            element.innerHTML = PrestigeLayersService.getValue(entry.name, 'fastestGainPS').toString(true)
            break;
          case 'prestige':
            const gain: Num | undefined = PrestigeLayersService.getValue(entry.name, 'gain')
            // @ts-ignore
            if ((ChallengeService.activeChallenge === undefined || ChallengeService.activeChallenge.prestige !== entry.name.toLowerCase()) && !HoldingsService.get(PrestigeLayersService.getValue(entry.name, 'requirement')[0]).greq(PrestigeLayersService.getValue(entry.name, 'requirement')[1])) {
              // @ts-ignore
              element.innerHTML = 'Reach: 1e110 '+HoldingsService.getAbbreviation(PrestigeLayersService.getValue(entry.name, 'requirement')[0]);
            } else if (gain !== undefined && !isNaN(gain['num']) && !isNaN(gain['exp']) &&
              (ChallengeService.activeChallenge === undefined || ChallengeService.activeChallenge.prestige !== entry.name.toLowerCase())) {
              // @ts-ignore
              element.innerHTML = gain.toString();
            } else {
              element.innerHTML = ''
            }
            break;
          case 'challengeCompletions':
            if (entry.effect !== undefined && entry.effect[0] instanceof Num && entry.effect[1] instanceof Num) {
              element.innerHTML = 'Completions: '+entry.effect[0]+' / '+entry.effect[1]
            }
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
            } else if (AutomatorService.getValue(entry.name, entry.type) !== 0) {
              element.innerHTML = AutomatorService.getValue(entry.name, entry.type).toString();
              if (entry.currency !== undefined || entry.type === 'cost') element.innerHTML += ' '+ HoldingsService.getAbbreviation(entry.currency)
            } else {
            element.innerHTML = CombinerService.getValue(entry.name, entry.type).toString();
            if (entry.currency !== undefined || entry.type === 'cost') element.innerHTML += ' '+ HoldingsService.getAbbreviation(entry.currency)
          }
            break;
        }
      }
    })
  }
}
