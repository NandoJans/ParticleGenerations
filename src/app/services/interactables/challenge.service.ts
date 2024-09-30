import { Injectable } from '@angular/core';
import {yellowChallenges} from "./challenges/yellow";
import {Challenge, Upgrade} from "../../globals";
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
import {blueChallenges} from "./challenges/blue";
import {App} from "../../App";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  static challenges: Challenge[] = [];

  static resetChallenges() {
    this.challenges = []
    const challenges = yellowChallenges.concat(
      darkAge,
      blueChallenges
    )

    challenges.forEach(challenge => {
      this.challenges.push(this.copy(challenge));
    })
  }
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
          if (challenge[value[0]] instanceof Num) {
            // @ts-ignore
            challenge[value[0]] = new Num(value[1]['num'], value[1]['exp'])
          } else {
            // @ts-ignore
            challenge[value[0]] = value[1];
          }
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

  static getActiveChallengeStyle(): string {
    if (this.activeChallenge === undefined) return ''
    return this.activeChallenge.style
  }

  static shouldHidePrestigeButton(prestige: string) {
    if (this.activeChallenge === undefined) {
      return true;
    } else if (this.activeChallenge.prestige === prestige) {
      return HoldingsService.get(this.activeChallenge.currency).greq(this.activeChallenge.goal)
    } else {
      return true;
    }
  }

  static startChallenge(name: string) {
    this.challenges.forEach((challenge) => {
      if (challenge.name === name) {
        this.activeChallenge = challenge;
        HoldingsService.set('yellowFusion', new Num(0, 0));
        ResetService.reset(challenge.prestige);
        UpgradeService.resetUpgrades();
        GeneratorService.resetGenerators();
        ChallengeService.resetChallenges();
        App.next();
        DataManagerService.load();
      }
    })
  }

  static prestige(prestige: string) {
    if (this.activeChallenge === undefined || this.activeChallenge.prestige !== prestige) return
    if (typeof this.activeChallenge.completed === 'boolean') {
      this.activeChallenge.completed = true;
    } else if (this.activeChallenge.maxCompletions instanceof Num && !this.activeChallenge.completed.greq(this.activeChallenge.maxCompletions)) {
      this.activeChallenge.completed.add(new Num(1, 0));
    }
    this.activeChallenge = undefined;
    DataManagerService.save();
    UpgradeService.resetUpgrades();
    GeneratorService.resetGenerators();
    ChallengeService.resetChallenges();
    App.next()
    DataManagerService.load();
  }

  static leaveChallenge() {
    if (this.activeChallenge !== undefined) {
      const prestige = this.activeChallenge.prestige
      this.activeChallenge = undefined;
      ResetService.reset(prestige)
      UpgradeService.resetUpgrades();
      GeneratorService.resetGenerators();
      ChallengeService.resetChallenges();
      App.next()
      DataManagerService.load();
    }
  }

  static checkGoal() {
    if (this.activeChallenge === undefined) return
    const goalReached = HoldingsService.get(this.activeChallenge.currency).greq(this.activeChallenge.goal);
    PrestigeLayersService.challengeButton(this.activeChallenge.prestige, this.activeChallenge.goal, goalReached);
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

  static getChallenge(name: string) {
    for (let i = 0; i < this.challenges.length; i++) {
      const challenge = this.challenges[i];
      if (challenge.name === name) {
        return challenge
      }
    }
    return this.challenges[0];
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
      if (
        (!challenge.dynamic && challenge.completed && (<HTMLElement> document.getElementById(challenge.name+'-button')) !== null) ||
        (challenge.dynamic && challenge.completed instanceof Num && challenge.maxCompletions instanceof Num && challenge.completed.greq(challenge.maxCompletions) &&
        (<HTMLElement> document.getElementById(challenge.name+'-button')) !== null)
      ) {
        (<HTMLElement> document.getElementById(challenge.name+'-button')).innerHTML = 'Completed';
        (<HTMLElement> document.getElementById(challenge.name)).classList.add('reached');
      }
    })
  }

  static dynamicChallenges() {
    this.challenges.forEach((challenge) => {
      if (challenge.dynamic) {
        // @ts-ignore
        challenge.goal = challenge.baseGoal.mul(challenge.goalIncrease.pow(challenge.completed, false), false)
      }
    })
  }

  static action() {
    this.challenges.forEach(challenge => {
      if (typeof challenge.completed === 'boolean' && challenge.completed && !challenge.disabled) {
        if (typeof challenge.reward === "function") {
          const buff: Num | undefined = challenge.reward(challenge)
          if (buff !== undefined) {
            challenge.effect = buff.copy();
          }
        }
      } else if (
        challenge.completed instanceof Num && challenge.completed.greq(new Num(1, 0)) && !challenge.disabled
      ) {
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

  static disableChallenge(name: string) {
    const challenge: Challenge = this.getChallenge(name)
    challenge.reward = () => {};
    const doc = <HTMLElement> document.getElementById(challenge.name)?.childNodes.item(0);
    if (doc !== null && doc !== undefined) {
      doc.style.display = 'flex';
    }
  }

  static disableChallenges(type: string) {
    const challenges = this.getChallenges(type)
    challenges.forEach((challenge) => {
      challenge.reward = () => {};
      const doc = <HTMLElement> document.getElementById(challenge.name)?.childNodes.item(0);
      if (doc !== null && doc !== undefined) {
        doc.style.display = 'flex';
      }
    })
  }

  private static copy(challenge: Challenge) {
    const save: Challenge = {
      baseGoal: new Num(1, 0),
      completed: new Num(1, 0),
      currency: "",
      description: "",
      disabled: false,
      displayName: "",
      goal: new Num(1, 0),
      instantComplete: false,
      name: "",
      nerfs: () => {},
      prestige: "",
      requirement: [],
      resetId: "",
      reward: () => {},
      rewardDescription: "",
      style: "",
      type: "",
      unlocked: false
    };

    Object.entries(challenge).forEach((entry) => {
      if (entry[1] instanceof Num) {
        // @ts-ignore
        save[entry[0]] = new Num(entry[1]['num'], entry[1]['exp'])
      } else if (entry[1] instanceof Array) {
        const arr: any[] = [];
        entry[1].forEach((arrEntry) => {
          arr.push(arrEntry);
        })
        // @ts-ignore
        save[entry[0]] = arr;
      } else {
        // @ts-ignore
        save[entry[0]] = entry[1];
      }
    })
    return save;
  }
}
