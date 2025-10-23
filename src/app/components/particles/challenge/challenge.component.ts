import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from "../../../classes/features/challenge";

@Component({
    selector: 'app-challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.css'],
    standalone: false
})
export class ChallengeComponent implements OnInit {
  @Input() challenge: Challenge | undefined;
  constructor() { }

  ngOnInit(): void {
  }
}
