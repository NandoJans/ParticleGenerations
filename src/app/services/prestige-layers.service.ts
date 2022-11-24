import { Injectable } from '@angular/core';
import {Num} from "../num";
import {HoldingsService} from "./holdings.service";
import {ResetService} from "./interactables/reset.service";
import {GlobalMultipliersService} from "./globals/global-multipliers.service";
import {ChallengeService} from "./interactables/challenge.service";
import {DataManagerService} from "./data-manager.service";
import {UpgradeService} from "./interactables/upgrade.service";

@Injectable({
  providedIn: 'root'
})
export class PrestigeLayersService {
  static prestiges: any[] = [
    { name: 'yellow', requirement: ['redParticles', new Num(1, 110)], prestigeButton: 'prestige-yellow', unlocked: false, gain: new Num(1, 0), multiplier: 'yellowParticlesGain'},
    { name: 'green', requirement: ['yellowParticles', new Num(1, 110)], prestigeButton: 'prestige-green', unlocked: false, gain: new Num(1, 0), multiplier: 'greenParticlesGain'},
  ]

  static save() {
    const save: any[] = [];
    this.prestiges.forEach((prestige) => {
      // @ts-ignore
      save.push({ name: prestige['name'], unlocked: prestige['unlocked']})
    })
    localStorage['prestiges'] = JSON.stringify(save);
  }

  static load() {
    const prestiges: any[] = JSON.parse(localStorage['prestiges']);
    prestiges.forEach((prestige) => {
      this.setValue(prestige['name'], 'unlocked', prestige['unlocked'])
    })
  }

  static getValue(name: string, value: string) {
    let retValue = undefined;
    this.prestiges.forEach((prestige) => {
      name = name.toLowerCase();
      if (name === prestige['name']) {
        retValue = prestige[value];
      }
    })
    return retValue;
  }

  static setValue(name: string, key: string, value: any) {
    this.prestiges.forEach((prestige) => {
      name = name.toLowerCase();
      if (name === prestige['name']) {
        prestige[key] = value;
        return
      }
    })
  }

  static calculateGain() {
    this.prestiges.forEach((prestige) => {
      const holding = HoldingsService.get(prestige['requirement'][0])
      prestige['gain'] = new Num(2, 0).pow(new Num((holding['exp'] + holding['num'] / 10) / prestige['requirement'][1]['exp']  - 0.75, 0), false)
      const gain = GlobalMultipliersService.get(prestige['multiplier'])
      if (gain !== undefined) {
        prestige['gain'] = prestige['gain'].mul(gain, false)
      }

      if (UpgradeService.getValue(prestige.name+'-idle-gain', 'bought') !== 0 && UpgradeService.getValue(prestige.name+'-idle-gain', 'bought').greq(new Num(1, 0))) {
        HoldingsService.add(prestige.name+'Particles', prestige.gain.div(new Num(1, 2), false))
      }
    })
  }

  static prestige(name: string | undefined) {
    if (name !== undefined) {
      name = name.toLowerCase();
      const requirement = this.getValue(name, 'requirement')
      // @ts-ignore
      if (HoldingsService.get(requirement[0]).greq(requirement[1])) {
        this.setValue(name, 'unlocked', true)
        // @ts-ignore
        HoldingsService.add(name+'Particles', this.getValue(name, 'gain'))
        HoldingsService.add(name+'s', new Num(1, 0))
        if (ChallengeService.activeChallenge?.name === 'dark-age' && name === 'green' && new Num(Math.floor(HoldingsService.get('yellowParticles').exp / 110), 0).greq(HoldingsService.get('darkPower'))) {

          // @ts-ignore
          HoldingsService.add('darkPower', new Num(Math.floor(HoldingsService.get('yellowParticles').exp / 110), 0).sub(HoldingsService.get('darkPower'), false))
        }
        ResetService.reset(name);
        DataManagerService.load();
        ChallengeService.prestige(name);
      }
    }
  }

  static showPrestigeButton(prestigeName: string) {
    this.prestiges.forEach(prestige => {
      if (prestige['name'] === prestigeName) {
        (document.getElementById(prestige['prestigeButton']) as HTMLElement).style.display = 'unset';
      }
    })
  }

  static unlock() {
    this.prestiges.forEach(prestige => {
      const requirement = prestige['requirement']
      if (ChallengeService.activeChallenge?.name === 'dark-age'  ) {

        (document.getElementById(prestige['prestigeButton']) as HTMLElement).style.display = 'none';

        if (HoldingsService.get(requirement[0]).greq(requirement[1]) && prestige.name === 'yellow') {
          // @ts-ignore
          (document.getElementById(prestige['prestigeButton']) as HTMLElement).style.display = 'unset';
        }
      } else if (HoldingsService.get(requirement[0]).greq(requirement[1]) && ChallengeService.shouldHidePrestigeButton()) {
        // @ts-ignore
        (document.getElementById(prestige['prestigeButton']) as HTMLElement).style.display = 'unset';
      } else {
        // @ts-ignore
        (document.getElementById(prestige['prestigeButton']) as HTMLElement).style.display = 'none';
      }
    })
  }
}
