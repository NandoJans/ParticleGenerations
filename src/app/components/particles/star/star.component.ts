import {Component, Input, OnInit} from '@angular/core';
import {YellowStarChallenge} from "../../../classes/features/challenges/yellow-star-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChallengeService} from "../../../services/interactables/challenge.service";

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
}
