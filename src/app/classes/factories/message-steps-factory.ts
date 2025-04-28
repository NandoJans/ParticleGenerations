import {MessageSteps} from "../display/message-steps";
import {Styles} from "../enums/styles";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class MessageStepsFactory {
  messageSteps: MessageSteps;

  static start(style: Styles, icon: IconDefinition) {
    return new MessageStepsFactory(style, icon);
  }

  constructor(style: Styles, icon: IconDefinition) {
    this.messageSteps = new MessageSteps(style, icon);
  }

  addStep(title: string, message: string) {
    this.messageSteps.steps.push({title, message});
    return this;
  }

  build(): MessageSteps {
    return this.messageSteps;
  }
}
