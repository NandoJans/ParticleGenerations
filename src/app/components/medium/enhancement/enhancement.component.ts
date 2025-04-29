import {Component, Input, OnInit} from '@angular/core';
import {Enhancement} from "../../../classes/features/enhancements/enhancement";
import {EnhancementRecord} from "../../../classes/records/enhancement-record";
import {EnhancementService} from "../../../services/enhancement.service";

@Component({
  selector: 'app-enhancement',
  templateUrl: './enhancement.component.html',
  styleUrls: ['./enhancement.component.css']
})
export class EnhancementComponent implements OnInit {
  @Input() enhancement: Enhancement = EnhancementRecord.yellow;

  constructor(
    private enhancementService: EnhancementService
  ) { }

  ngOnInit(): void {
  }

  canEnhance(): boolean {
    return this.enhancement.canEnhance();
  }

  enhancing(): boolean {
    return this.enhancementService.isEnhancing();
  }

  startEnhancing() {
    this.enhancementService.startEnhancing(this.enhancement);
  }

  stopEnhancing() {
    this.enhancementService.stopEnhancing();
  }
}
