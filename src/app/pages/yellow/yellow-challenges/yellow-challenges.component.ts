import { Component, OnInit } from '@angular/core';
import {Challenge} from "../../../globals";
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-yellow-challenges',
  templateUrl: './yellow-challenges.component.html',
  styleUrls: ['./yellow-challenges.component.css']
})
export class YellowChallengesComponent implements OnInit {
  challenges: Challenge[] = []
  activeChallenge: string = '';
  infoText: string[] = [
    'Yellow challenges are a new way to boost red particle generation. You can get up to eight challenges that each contain a different way to boost generators, upgrades and so on. ',
    'When starting a challenge certain stuff mentioned in the description of the challenge will be nerfed. The goal is to reach a certain amount of red particles to be able to go yellow.' +
    ' You should try and figure out what the best way is to finish the challenge and gain the boost. Throughout the yellow phase every challenge will be unlocked.',
    'It is recommended you leave a challenge when you feel like you are not able to reach the goal and try and get more upgrades and generator upgrades.'
  ]
  constructor() { }

  leaveChallenge() {
    ChallengeService.leaveChallenge();
  }

  ngOnInit(): void {
    this.challenges = ChallengeService.getChallenges('yellow-challenges')
    this.activeChallenge = ChallengeService.getActiveChallenge();
    BackgroundService.setBackground('yellow')
  }
}
