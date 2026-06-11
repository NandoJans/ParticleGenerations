import {Component, Input, OnInit} from '@angular/core';
import {YellowStarChallenge} from "../../../classes/features/challenges/yellow-star-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Num} from "../../../num";
import {EnhancementService} from "../../../services/enhancement.service";

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css'],
    standalone: false
})
export class StarComponent implements OnInit {
  @Input() star: YellowStarChallenge = ChallengeRecord.proximaCentauriStar;

  constructor(
    private challengeService: ChallengeService,
    private enhancementService: EnhancementService,
  ) { }

  ngOnInit(): void {
  }

  startChallenge(): void {
    if (this.isEnhancing()) {
      this.enhancementService.enhance(this.star);
    } else {
      this.challengeService.startChallenge(this.star);
    }
  }

  isEnhancing(): boolean {
    return this.enhancementService.isEnhancing()
      && this.star.allowedEnhancements.includes(this.enhancementService.enhancing!)
      && this.star.enhancement !== this.enhancementService.enhancing;
  }

  isEnhanced(): boolean {
    return this.star.enhancement !== null;
  }

  getEnhancementStyle(): string {
    return this.enhancementService.enhancing?.style ?? '';
  }

  getButtonText() {
    if (this.isEnhancing() && this.enhancementService.enhancing) {
      return this.star.enhancementString(this.enhancementService.enhancing);
    }
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
