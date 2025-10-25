import { Component, OnInit } from '@angular/core';
import {YellowStarChallenge} from "../../../classes/features/challenges/yellow-star-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChallengeService} from "../../../services/interactables/challenge.service";

@Component({
    selector: 'app-yellow-stars',
    templateUrl: './yellow-stars.component.html',
    styleUrls: ['./yellow-stars.component.css'],
    standalone: false
})
export class YellowStarsComponent implements OnInit {
  stars: YellowStarChallenge[] = [
    ChallengeRecord.proximaCentauriStar,
    ChallengeRecord.lalandeStar,
    ChallengeRecord.sunStar,
    ChallengeRecord.siriusStar,
  ]
  constructor(
    private challengeService: ChallengeService,
  ) { }

  ngOnInit(): void {
  }

  getCurrentStar() {
    return ChallengeRecord.currentChallenges['yellow']?.displayName ?? 'none';
  }

  inChallenge() {
    return ChallengeRecord.currentChallenges['yellow'] !== undefined;
  }

  leaveChallenge() {
    this.challengeService.leaveChallenge('yellow');
  }

  getChallengeUpgrades() {
    return ChallengeRecord.currentChallenges['yellow']?.getUpgrades() ?? [];
  }

  getChallengeHoldings() {
    return ChallengeRecord.currentChallenges['yellow']?.getHoldings() ?? [];
  }

  getChallengeGenerators() {
    return ChallengeRecord.currentChallenges['yellow']?.getGenerators() ?? [];
  }

  getStars() {
    return this.challengeService.sortByCompleted(this.stars);
  }
  
  infoText: string[] = [
    'Yellow Stars represent stellar challenges that test your particle generation mastery!',
    'Each star (Proxima Centauri, Lalande, Sun, Sirius) is a unique challenge with specific conditions and rewards.',
    'While in a star challenge, you have access to special generators, upgrades, and mechanics.',
    'Completing star challenges grants powerful rewards that boost your overall progression.',
    'Stars unlock progressively - complete easier stars to access more difficult ones.',
    'Use the "Leave challenge" button if you need to exit and return to normal gameplay.'
  ]
}
