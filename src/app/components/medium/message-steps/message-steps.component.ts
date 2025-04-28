import { Component, OnInit } from '@angular/core';
import {MessageStepsService} from "../../../services/message-steps.service";
import {faArrowLeft, faArrowRight, faCheck, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-message-steps',
  templateUrl: './message-steps.component.html',
  styleUrls: ['./message-steps.component.css']
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

  getIcon() {
    return this.messageStepsService.getMessageSteps()?.icon || faCheck;
  }
}
