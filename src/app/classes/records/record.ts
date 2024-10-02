import {GameElement} from "../features/game-element";

export abstract class Record {
  static list: GameElement[] = [];
  abstract getList(): GameElement[];
}
