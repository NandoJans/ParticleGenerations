import { Component, OnInit } from '@angular/core';
import {MessageStepsService} from "../../../services/message-steps.service";
import {faArrowLeft, faArrowRight, faCheck, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-message-steps',
    templateUrl: './message-steps.component.html',
    styleUrls: ['./message-steps.component.css'],
    standalone: false
})
export class MessageStepsComponent implements OnInit {
  faArrowRight: IconDefinition = faArrowRight;
  faArrowLeft: IconDefinition = faArrowLeft;
  faCheck: IconDefinition = faCheck;

  constructor(
    private messageStepsService: MessageStepsService,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.messageStepsService.closeMessageSteps();
  }

  stopClose(event: MouseEvent) {
    event.stopPropagation();
  }

  getMessageSteps() {
    return this.messageStepsService.getCurrentMessageStep();
  }

  getStyle() {
    return this.messageStepsService.getMessageSteps()?.style;
  }

  getTitle() {
    return this.messageStepsService.getCurrentMessageStep()?.title;
  }

  next() {
    if (this.messageStepsService.nextMessageStep()) {
      this.messageStepsService.getCurrentMessageStep();
    } else {
      this.close();
    }
  }

  previous() {
    if (this.messageStepsService.currentStep > 0) {
      this.messageStepsService.currentStep--;
      this.messageStepsService.getCurrentMessageStep();
    }
  }

  showLeftButton() {
    return this.messageStepsService.getCurrentMessageStep() !== null
      && this.messageStepsService.currentStep > 0;
  }

  showDoneButton() {
    return this.messageStepsService.getCurrentMessageStep() !== null
      && this.messageStepsService.currentStep === this.messageStepsService.getLastStep();
  }

  showRightButton() {
    return this.messageStepsService.getCurrentMessageStep() !== null
      && this.messageStepsService.currentStep < this.messageStepsService.getLastStep();
  }

  getMessage() {
    return this.messageStepsService.getCurrentMessageStep()?.message;
  }

  getPhaseName(): string {
    return `${this.getStyle() ?? 'unknown'} phase`.toUpperCase();
  }

  getSteps() {
    return this.messageStepsService.getMessageSteps()?.steps ?? [];
  }

  getCurrentStepIndex(): number {
    return this.messageStepsService.currentStep;
  }

  getCurrentStepNumber(): number {
    return this.getCurrentStepIndex() + 1;
  }

  getTotalSteps(): number {
    return this.getSteps().length;
  }

  getProgressPercentage(): number {
    return this.getTotalSteps() ? (this.getCurrentStepNumber() / this.getTotalSteps()) * 100 : 0;
  }

  getChapterLabel(): string {
    const middleStep = Math.ceil(this.getTotalSteps() / 2);
    if (this.getCurrentStepNumber() === 1) {
      return 'Threshold detected';
    }
    if (this.getCurrentStepNumber() === this.getTotalSteps()) {
      return 'Passage unlocked';
    }
    return this.getCurrentStepNumber() <= middleStep ? 'Barrier analysis' : 'Transition protocol';
  }

  getIcon() {
    return this.messageStepsService.getMessageSteps()?.icon || faCheck;
  }
}
