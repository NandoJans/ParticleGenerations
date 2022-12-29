import { Component, OnInit } from '@angular/core';
import {CombinerService} from "../../../services/interactables/combiner.service";
import {ResetService} from "../../../services/interactables/reset.service";

@Component({
  selector: 'app-combiner-box',
  templateUrl: './combiner-box.component.html',
  styleUrls: ['./combiner-box.component.css']
})
export class CombinerBoxComponent implements OnInit {
  combinations: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.combinations = [CombinerService.combinations[0]];
  }

  assignSubjectSession(event: any) {
    CombinerService.assignSubjectSession(event)
  }

  assignTargetSession(event: any) {
    CombinerService.assignTargetSession(event)
  }

  clearCombinations() {
    CombinerService.clearCombinations()
    ResetService.reset('blue')
    this.ngOnInit()
  }
}
