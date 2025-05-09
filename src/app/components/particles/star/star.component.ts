import {Component, Input, OnInit} from '@angular/core';
import {YellowStarChallenge} from "../../../classes/features/challenges/yellow-star-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Num} from "../../../num";

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() star: YellowStarChallenge = ChallengeRecord.proximaCentauriStar;

  constructor(
    private challengeService: ChallengeService,
  ) { }

  ngOnInit(): void {
  }

  startChallenge(): void {
    this.challengeService.startChallenge(this.star)
  }

  getButtonText() {
    return (this.star.isCompleted()) ? 'Completed' : 'Enter';
  }

  hasMultipleCompletions(): boolean {
    if (this.star.maxCompletions === undefined) {
      return false;
    } else {
      return this.star.maxCompletions.gt(new Num(1, 0));
    }
  }
}
