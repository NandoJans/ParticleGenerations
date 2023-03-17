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
    { name: 'yellow', requirement: ['redParticles', new Num(1, 110)], prestigeButton: 'prestige-yellow', unlocked: false, gain: new Num(1, 0), multiplier: 'yellowParticlesGain', hidden: false},
    { name: 'green', requirement: ['yellowParticles', new Num(1, 110)], prestigeButton: 'prestige-green', unlocked: false, gain: new Num(1, 0), multiplier: 'greenParticlesGain', hidden: false},
    { name: 'blue', requirement: ['greenParticles', new Num(1, 110)], prestigeButton: 'prestige-blue', unlocked: false, gain: new Num(1, 0), multiplier: 'blueParticlesGain', hidden: false},
    { name: 'purple', requirement: ['blueParticles', new Num(1, 110)], prestigeButton: 'prestige-purple', unlocked: false, gain: new Num(1, 0), multiplier: 'purpleParticlesGain', hidden: false},
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

  static lock(name: string) {
    this.prestiges.forEach((prestige) => {
      if (prestige.name === name) {
        prestige.unlocked = false;
      }
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
      prestige['gain'] = new Num(2, 0).pow(new Num((holding['exp'] + Math.log10(holding['num'])) / prestige['requirement'][1]['exp']  - 0.75, 0), false)
      const gain = GlobalMultipliersService.get(prestige['multiplier'])
      if (gain !== undefined) {
        prestige['gain'] = prestige['gain'].mul(gain, false)
      }
      const idleUpgrade = UpgradeService.getValue(prestige.name+'-idle-gain', 'bought')
      if (idleUpgrade !== 0 && idleUpgrade.greq(new Num(1, 0))) {
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
        if (name === 'yellow') {
          // @ts-ignore
          HoldingsService.add(name+'s', new Num(1, 0).mul(GlobalMultipliersService.multipliers['yellowsGain'], false))
        } else if (name === 'green') {
          // @ts-ignore
          HoldingsService.add(name+'s', new Num(1, 0).mul(GlobalMultipliersService.multipliers['greensGain'], false))
        } else {
          HoldingsService.add(name+'s', new Num(1, 0))
        }
        // @ts-ignore
        if (ChallengeService.activeChallenge?.name === 'dark-age' && name === 'green' && new Num(Math.floor(HoldingsService.get('yellowParticles').exp / 110), 0).add(new Num(0, 0), false).greq(HoldingsService.get('darkPower'))) {

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
      if (!prestige.hidden) {
        if (prestige['name'] === prestigeName) {
          (document.getElementById(prestige['prestigeButton']) as HTMLElement).style.display = 'unset';
        }
      }
    })
  }

  static unlock() {
    this.prestiges.forEach(prestige => {
      const requirement = prestige['requirement']
      if (!prestige.hidden) {
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
      }
    })
  }

  static hide(layer: string) {
    for (let i = 0; i < this.prestiges.length; i++) {
      if (this.prestiges[i].name === layer) this.prestiges[i].hidden = true;
    }
  }
}
