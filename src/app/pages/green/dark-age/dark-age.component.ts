import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Challenge} from "../../../globals";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-dark-age',
  templateUrl: './dark-age.component.html',
  styleUrls: ['./dark-age.component.css']
})
export class DarkAgeComponent implements OnInit {
  darkAgeActive: boolean = ChallengeService.activeChallenge?.name === 'dark-age';
  darkPowerEffect: any[] = ['darkPowerEffect']
  darkPowerGain: any[] = ['darkPowerGain']
  darkAge: Challenge = ChallengeService.getChallenges('dark-age')[0];

  leaveChallenge() {
    ChallengeService.leaveChallenge();
  }

  constructor() { }

  ngOnInit(): void {
    BackgroundService.setBackground('green')
  }

}
