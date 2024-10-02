import {GameElement} from "../features/game-element";

export class GameElementHelper {
  disableElements(elements: GameElement[]) {
    elements.forEach(element => element.disabled = true);
  }
}
