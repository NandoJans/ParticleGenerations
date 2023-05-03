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
    { name: 'yellow', requirement: ['redParticles', new Num(1, 110)], prestigeButton: 'prestige-yellow', unlocked: false, gain: new Num(1, 0), multiplier: 'yellowParticlesGain', hidden: false, time: Date.now(), fastestGainPS: new Num(0, 0)},
    { name: 'green', requirement: ['yellowParticles', new Num(1, 110)], prestigeButton: 'prestige-green', unlocked: false, gain: new Num(1, 0), multiplier: 'greenParticlesGain', hidden: false, time: Date.now(), fastestGainPS: new Num(0, 0)},
    { name: 'blue', requirement: ['greenParticles', new Num(1, 110)], prestigeButton: 'prestige-blue', unlocked: false, gain: new Num(1, 0), multiplier: 'blueParticlesGain', hidden: false, time: Date.now(), fastestGainPS: new Num(0, 0)},
    { name: 'purple', requirement: ['blueParticles', new Num(1, 110)], prestigeButton: 'prestige-purple', unlocked: false, gain: new Num(1, 0), multiplier: 'purpleParticlesGain', hidden: false, time: Date.now(), fastestGainPS: new Num(0, 0)},
  ]

  static save() {
    const save: any[] = [];
    this.prestiges.forEach((prestige) => {
      // @ts-ignore
      save.push({ name: prestige['name'], unlocked: prestige['unlocked'], time: prestige['time'], fastestGainPS: prestige['fastestGainPS']})
    })
    localStorage['prestiges'] = JSON.stringify(save);
  }

  static load() {
    const prestiges: any[] = JSON.parse(localStorage['prestiges']);
    prestiges.forEach((prestige) => {
      this.setValue(prestige['name'], 'unlocked', prestige['unlocked']);
      this.setValue(prestige['name'], 'time', prestige['time']);
      if (prestige['fastestGainPS'] !== undefined) {
        this.setValue(prestige['name'], 'fastestGainPS', new Num(prestige['fastestGainPS']['num'], prestige['fastestGainPS']['exp']));
      }
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

  static calculateFastestGain(name: string) {
    this.prestiges.forEach((prestige) => {
      if (prestige['name'] === name) {
        const gainPS = prestige['gain'].div(new Num((Date.now() - prestige['time'])/1000, 0), false);
        if (prestige['fastestGainPS'] === undefined || prestige['fastestGainPS'] === null || gainPS.greq(prestige['fastestGainPS'])) {
          prestige['fastestGainPS'] = gainPS.add(new Num(0, 0), false);
        }
      }
    })
  }

  static addIdleGain(extra: Num) {
    this.prestiges.forEach((prestige) => {
      if (HoldingsService.get(prestige['name']+'s').greq(new Num(2.5, 1))) {
        HoldingsService.add(prestige['name']+'Particles', prestige['fastestGainPS'].mul(extra, false).mul(new Num(2, -2), false))
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
        this.calculateFastestGain(name);
        this.setValue(name, 'time', Date.now())
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
      const doc = document.getElementById(prestige['prestigeButton']);
      if (!prestige.hidden && doc !== null) {
        if (ChallengeService.activeChallenge?.name === 'dark-age'  ) {

          doc.style.display = 'none';

          if (HoldingsService.get(requirement[0]).greq(requirement[1]) && prestige.name === 'yellow') {
            // @ts-ignore
            doc.style.display = 'unset';
          }
        } else if (HoldingsService.get(requirement[0]).greq(requirement[1]) && ChallengeService.shouldHidePrestigeButton()) {
          // @ts-ignore
          doc.style.display = 'unset';
        } else {
          // @ts-ignore
          doc.style.display = 'none';
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
