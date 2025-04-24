import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from "../../../globals";

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
  dynamic: boolean | undefined;
  completions: any[] | undefined;
  effect: any[] | undefined;
  constructor() { }

  start() {
  }

  ngOnInit(): void {
    this.name = this.challenge?.name;
    this.displayName = this.challenge?.displayName;
    this.description = this.challenge?.description;
    this.goal = this.challenge?.goal.toString();
    this.rewardDescription = this.challenge?.rewardDescription;
    this.style = this.challenge?.style;
    this.dynamic = this.challenge?.dynamic;
    this.completions = [this.challenge?.completed, this.challenge?.maxCompletions];
    const reward = this.challenge?.reward
    if (reward !== undefined && typeof reward === 'function') {
      this.effect = ['challenge', this.name]
    }
  }

  isCompleted() {
    if (this.challenge === undefined) return false;
    return false;
  }
}
