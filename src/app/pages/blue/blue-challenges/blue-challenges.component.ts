import { Component, OnInit } from '@angular/core';
import {Challenge} from "../../../globals";
import {ChallengeService} from "../../../services/interactables/challenge.service";

@Component({
  selector: 'app-blue-challenges',
  templateUrl: './blue-challenges.component.html',
  styleUrls: ['./blue-challenges.component.css']
})
export class BlueChallengesComponent implements OnInit {
  challenges: Challenge[] = []
  activeChallenge: string = '';
  constructor() { }

  leaveChallenge() {
    ChallengeService.leaveChallenge();
  }

  ngOnInit(): void {
    this.challenges = ChallengeService.getChallenges('blue-challenges')
    this.activeChallenge = ChallengeService.getActiveChallenge();
  }

}
