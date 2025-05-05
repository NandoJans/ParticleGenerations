import { Injectable } from '@angular/core';
import {Challenge} from "../../classes/features/challenge";
import {LocalStorageHelper} from "../../classes/helpers/local-storage-helper";
import {ChallengeRecord} from "../../classes/records/challenges/challenge-record";
import {ResetHelper} from "../../classes/helpers/reset-helper";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('challenge', 'currentChallenge');

  getList(): Challenge[] {
    return ChallengeRecord.list;
  }

  tick(): void {
    Object.values(ChallengeRecord.currentChallenges).forEach((challenge) => {
      challenge.constantNerfs();
    });
  }

  save() {
    this.getList().forEach((challenge) => {
      challenge.save();
    });
    this.saveCurrentChallenges();
  }

  private saveCurrentChallenges() {
    this.localStorageHelper.save({});
    Object.entries(ChallengeRecord.currentChallenges).forEach(([key, value]) => {
      this.localStorageHelper.save(value.saveName, key);
    })
  }

  load() {
    this.getList().forEach((challenge) => {
      challenge.tryLoad();
    });

    this.loadCurrentChallenges();
  }

  private loadCurrentChallenges() {
    const loaded = this.localStorageHelper.load({});
    // const loaded = {};
    Object.entries(loaded).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // @ts-ignore
        const challenge = ChallengeRecord[value];
        if (challenge) {
          ChallengeRecord.currentChallenges[key] = challenge;
        }
      }
    });
  }

  getElements(): Challenge[] {
    return this.getList();
  }

  applyCurrentChallengeNerfs() {
    Object.values(ChallengeRecord.currentChallenges).forEach((challenge) => {
      challenge.nerfs();
    });
  }

  startChallenge(challenge: Challenge) {
    ResetHelper.reset(challenge.prestige)
    challenge.nerfs();
    ChallengeRecord.currentChallenges[challenge.prestigeLayer] = challenge;
  }

  endChallenge(challenge: Challenge) {
    challenge.revert();
    delete ChallengeRecord.currentChallenges[challenge.prestigeLayer];
    this.saveCurrentChallenges();
  }

  static inChallenge(prestigeLayer: string): boolean {
    return ChallengeRecord.currentChallenges[prestigeLayer] !== undefined;
  }

  inChallenge(prestigeLayer: string): boolean {
    return ChallengeService.inChallenge(prestigeLayer);
  }

  static challengeGoalReached(prestigeLayer: string) {
    const challenge = ChallengeRecord.currentChallenges[prestigeLayer];
    if (challenge) {
      return challenge.reached();
    }
    return false;
  }

  challengeGoalReached(prestigeLayer: string) {
    return ChallengeService.challengeGoalReached(prestigeLayer);
  }

  static completeChallenge(prestigeLayer: string): void {
    const challenge = ChallengeRecord.currentChallenges[prestigeLayer];
    if (challenge) {
      challenge.completed = true;
      challenge.revert();
      delete ChallengeRecord.currentChallenges[prestigeLayer];
    }
  }

  completeChallenge(prestigeLayer: string): void {
    ChallengeService.completeChallenge(prestigeLayer);
  }

  static leaveChallenge(prestigeLayer: string): void {
    const challenge = ChallengeRecord.currentChallenges[prestigeLayer];
    if (challenge) {
      challenge.revert();
      delete ChallengeRecord.currentChallenges[prestigeLayer];
    }
  }

  leaveChallenge(prestigeLayer: string): void {
    ChallengeService.leaveChallenge(prestigeLayer);
  }

  getChallenge(prestigeLayer: string): Challenge|undefined {
    return ChallengeRecord.currentChallenges[prestigeLayer];
  }
}
