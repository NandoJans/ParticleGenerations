import {Styles} from "../enums/styles";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class MessageSteps {
  steps: {title: string, message: string}[] = [];
  style: Styles;
  icon: IconDefinition;

  constructor(style: Styles, icon: IconDefinition) {
    this.style = style;
    this.icon = icon;
  }
}
