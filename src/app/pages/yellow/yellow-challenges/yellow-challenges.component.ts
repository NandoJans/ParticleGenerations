import { Component, OnInit } from '@angular/core';
import {Challenge} from "../../../globals";
import {ChallengeService} from "../../../services/interactables/challenge.service";

@Component({
  selector: 'app-yellow-challenges',
  templateUrl: './yellow-challenges.component.html',
  styleUrls: ['./yellow-challenges.component.css']
})
export class YellowChallengesComponent implements OnInit {
  challenges: Challenge[] = []
  activeChallenge: string = '';
  constructor() { }

  leaveChallenge() {
    ChallengeService.leaveChallenge();
  }

  ngOnInit(): void {
    this.challenges = ChallengeService.getChallenges('yellow-challenges')
    this.activeChallenge = ChallengeService.getActiveChallenge();
  }
}
