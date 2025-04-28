import { Injectable } from '@angular/core';
import {MessageSteps} from "../classes/display/message-steps";

@Injectable({
  providedIn: 'root'
})
export class MessageStepsService {
  currentMessageSteps: MessageSteps | null = null;
  currentStep: number = 0;

  constructor() { }

  showMessageSteps(): boolean {
    return this.currentMessageSteps !== null;
  }

  getMessageSteps(): MessageSteps | null {
    return this.currentMessageSteps;
  }

  setMessageSteps(messageSteps: MessageSteps) {
    this.currentStep = 0;
    this.currentMessageSteps = messageSteps;
  }

  nextMessageStep(): boolean {
    if (this.currentMessageSteps && this.currentStep < this.currentMessageSteps.steps.length - 1) {
      this.currentStep++;
      return true;
    } else {
      this.currentMessageSteps = null;
      return false;
    }
  }

  getCurrentMessageStep() {
    if (this.currentMessageSteps) {
      return this.currentMessageSteps.steps[this.currentStep];
    }
    return null;
  }

  getLastStep() {
    return this.currentMessageSteps ? this.currentMessageSteps.steps.length - 1 : 0;
  }

  closeMessageSteps() {
    this.currentMessageSteps = null;
    this.currentStep = 0;
  }
}
