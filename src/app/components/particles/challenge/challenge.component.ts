import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Challenge} from "../../../globals";
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Action} from "../../../action";
import {NewAction} from "../../../NewAction";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  @Input() challenge: Challenge | undefined;
  name: string | undefined;
  displayName: string | undefined;
  description: string | undefined;
  goal: string | undefined;
  rewardDescription: string | undefined;
  style: string | undefined;
  effect: any[] | undefined;
  constructor() { }

  start() {
    if (this.challenge?.name !== undefined)
    ChallengeService.startChallenge(this.challenge?.name);
  }

  ngOnInit(): void {
    this.name = this.challenge?.name;
    this.displayName = this.challenge?.displayName;
    this.description = this.challenge?.description;
    this.goal = this.challenge?.goal.toString();
    this.rewardDescription = this.challenge?.rewardDescription;
    this.style = this.challenge?.style;
    const reward = this.challenge?.reward
    if (reward !== undefined && reward instanceof Action) {
      this.effect = [reward['type'], reward['amount'], reward['subject'], reward['variable']]
    } else if (reward !== undefined && reward instanceof NewAction) {
      this.effect = ['challenge', this.name]
    }
  }
}
