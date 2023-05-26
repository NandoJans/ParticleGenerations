import { Injectable } from '@angular/core';
import {yellowChallenges} from "./challenges/yellow";
import {Challenge} from "../../globals";
import {ResetService} from "./reset.service";
import {HoldingsService} from "../holdings.service";
import {PrestigeLayersService} from "../prestige-layers.service";
import {DataManagerService} from "../data-manager.service";
import {MilestoneService} from "./milestone.service";
import {darkAge} from "./challenges/green";
import {DropDownMessageService} from "../visuals/drop-down-message.service";
import {Num} from "../../num";
import {UpgradeService} from "./upgrade.service";
import {GeneratorService} from "./generator.service";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  static challenges: Challenge[] = yellowChallenges.concat(darkAge);
  static activeChallenge: Challenge | undefined = undefined;

  static save() {
    const save = {};
    this.challenges.forEach((challenge) => {
      // @ts-ignore
      save[challenge.name] = {completed: challenge.completed, unlocked: challenge.unlocked}
    })
    localStorage['challenges'] = JSON.stringify(save);
    if (this.activeChallenge !== undefined) {
      localStorage['activeChallenge'] = JSON.stringify(this.activeChallenge.name);
    } else {
      localStorage['activeChallenge'] = JSON.stringify('undefined');
    }
  }

  static load() {
    const challenges = JSON.parse(localStorage['challenges']);
    this.challenges.forEach((challenge) => {
      if (challenges[challenge.name] !== undefined) {
        Object.entries(challenges[challenge.name]).forEach((value) => {
          // @ts-ignore
          challenge[value[0]] = value[1];
        })
      }
      if (challenge.name === JSON.parse(localStorage['activeChallenge'])) {
        this.activeChallenge = challenge;
      }
    })
  }

  static getActiveChallenge() {
    if (this.activeChallenge === undefined) return 'None'
    return this.activeChallenge.displayName
  }

  static shouldHidePrestigeButton() {
    if (this.activeChallenge === undefined) return true;
    return HoldingsService.get(this.activeChallenge.currency).greq(this.activeChallenge.goal)
  }

  static startChallenge(name: string) {
    this.challenges.forEach((challenge) => {
      if (challenge.name === name) {
        this.activeChallenge = challenge;
        ResetService.reset(challenge.prestige);
      }
    })
  }

  static prestige(prestige: string) {
    if (this.activeChallenge === undefined || this.activeChallenge.prestige !== prestige) return
    this.activeChallenge.completed = true;
    this.activeChallenge = undefined;
    DataManagerService.save();
    UpgradeService.resetUpgrades();
    GeneratorService.resetGenerators();
    DataManagerService.load();
  }

  static leaveChallenge() {
    if (this.activeChallenge !== undefined) {
      const prestige = this.activeChallenge.prestige
      this.activeChallenge = undefined;
      ResetService.reset(prestige)
      UpgradeService.resetUpgrades();
      GeneratorService.resetGenerators();
      DataManagerService.load();
    }
  }

  static checkGoal() {
    if (this.activeChallenge === undefined) return
    if (HoldingsService.get(this.activeChallenge.currency).greq(this.activeChallenge.goal)) {
      PrestigeLayersService.showPrestigeButton(this.activeChallenge.prestige);
    }
  }

  static applyNerfs() {
    if (this.activeChallenge) {
      if (typeof this.activeChallenge.nerfs === "function") {
        const buff: Num | undefined = this.activeChallenge.nerfs(this.activeChallenge)
        if (buff instanceof Num) this.activeChallenge.effect = buff;
      }
    }
  }

  static getChallenges(type: string) {
    let retArr: Challenge[] = []
    this.challenges.forEach(challenge => {
      if (challenge.type === type) {
        retArr.push(challenge)
      }
    })
    return retArr;
  }

  static disable() {
    this.challenges.forEach((challenge) => {challenge.disabled = true})
  }

  static unlock() {
    this.challenges.forEach(challenge => {
      if (HoldingsService.get(challenge.requirement[0]).greq(challenge.requirement[1])) {
        if (!challenge.unlocked) DropDownMessageService.dropDown('Challenge Unlocked!', 'You have unlocked '+challenge.displayName);
        challenge.unlocked = true;
        if (MilestoneService.isReached('auto-complete-'+challenge.prestige+'-challenges') && challenge.type === 'yellow-challenges') {
          challenge.completed = true;
        }
      }
      if (challenge.completed && (<HTMLElement> document.getElementById(challenge.name+'-button')) !== null) {
        (<HTMLElement> document.getElementById(challenge.name+'-button')).innerHTML = 'Completed';
        (<HTMLElement> document.getElementById(challenge.name)).classList.add('reached');
      }
    })
  }

  static action() {
    this.challenges.forEach(challenge => {
      if (challenge.completed && !challenge.disabled) {
        if (typeof challenge.reward === "function") {
          const buff: Num | undefined = challenge.reward(challenge)
          if (buff !== undefined) {
            challenge.effect = buff.copy();
          }
        }
      }
    })
  }

  static setValues(type: string, value: string, set: any) {
    this.challenges.forEach((challenge) => {
      if (challenge.type == type) {

        // @ts-ignore
        challenge[value] = set
      }
    })
  }

  static getValue(name: string, value: string) {
    let retValue: any;
    this.challenges.forEach((challenge) => {
      if (challenge.name === name) { // @ts-ignore
        retValue = challenge[value];
      }
    })
    return retValue;
  }
}
