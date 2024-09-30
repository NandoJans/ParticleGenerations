import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Challenge} from "../../../globals";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Num} from "../../../num";

@Component({
  selector: 'app-dark-age',
  templateUrl: './dark-age.component.html',
  styleUrls: ['./dark-age.component.css']
})
export class DarkAgeComponent implements OnInit {
  darkAgeActive: boolean = ChallengeService.activeChallenge?.name === 'dark-age';
  darkAge: Challenge = ChallengeService.getChallenges('dark-age')[0];

  leaveChallenge() {
    ChallengeService.leaveChallenge();
  }

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
  }

  getUpcomingDarkPower() {
    // TODO: Implement this function
    return new Num(0, 0).toString()
  }
}
