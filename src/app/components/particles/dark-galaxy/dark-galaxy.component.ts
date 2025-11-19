import {Component, Input} from '@angular/core';
import {DarkGalaxyChallenge} from "../../../classes/features/challenges/dark-galaxy-challenge";
import {ChallengeRecord} from "../../../classes/records/challenges/challenge-record";
import {ChallengeService} from "../../../services/interactables/challenge.service";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

@Component({
  selector: 'app-dark-galaxy',
  imports: [],
  templateUrl: './dark-galaxy.component.html',
  styleUrl: './dark-galaxy.component.css',
})
export class DarkGalaxyComponent {
  @Input() challenge!: DarkGalaxyChallenge;

  stars: Star[] = [];

  constructor(
    private challengeService: ChallengeService
  ) {}

  ngOnInit() {
    this.generateStars(90); // adjust count as desired
  }

  private generateStars(count: number) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      const size = 1 + Math.random() * 2;              // 1–3 px
      const duration = 5 + Math.random() * 7;           // 5–12 s
      const delay = Math.random() * 10;                 // 0–10 s

      this.stars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size,
        duration,
        delay
      });
    }
  }

  startChallenge() {
    if (this.challenge.isUnlocked()) {
      this.challengeService.startChallenge(this.challenge);
    }
  }

  getButtonText(): string {
    return (this.isDarkChallenge()) ? "Stop" : "Start";
  }

  isDarkChallenge(): boolean {
    return ChallengeRecord.currentChallenges['green'] === this.challenge;
  }

  toggleChallenge() {
    if (this.isDarkChallenge()) {
      this.challengeService.leaveChallenge('green');
    } else {
      this.startChallenge();
    }
  }
}
