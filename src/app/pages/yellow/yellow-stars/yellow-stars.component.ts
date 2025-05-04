import { Component, OnInit } from '@angular/core';
import {YellowStarChallenge} from "../../../classes/features/challenges/yellow-star-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChallengeService} from "../../../services/interactables/challenge.service";

@Component({
  selector: 'app-yellow-stars',
  templateUrl: './yellow-stars.component.html',
  styleUrls: ['./yellow-stars.component.css']
})
export class YellowStarsComponent implements OnInit {
  stars: YellowStarChallenge[] = [
    ChallengeRecord.proximaCentauriStar
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
}
