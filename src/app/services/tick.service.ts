import {Injectable} from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {GlobalMultipliersService} from "./globals/global-multipliers.service";
import {Num} from "../num";
import {DataManagerService} from "./data-manager.service";
import {App} from "../App";
import {GeneratorService} from "./interactables/generator.service";

@Injectable({
  providedIn: 'root'
})
export class TickService {
  mainInterval: any;

  constructor(
    private dataManagerService: DataManagerService,
    private generatorService: GeneratorService,
  ) { }

  /**
   * Game tick function for running the game logic. The game tick is called every 50ms.
   * @param speed The speed of the game tick. This is used to slow down the game tick for testing purposes.
   */
  gameTick(speed: Num = new Num(1, 0)) {
    this.generatorService.tick(speed);
  }

  iterations: number = 0;

  tick() {

    this.mainInterval = setInterval(() => {
      this.iterations++;
      this.gameTick()
    }, 50)

    setInterval(() => {
      console.log('Iterations: '+this.iterations+'/s')
      this.iterations = 0
    }, 1000)

    setInterval(() => {
      this.dataManagerService.save()
    }, 5000)
  }
}
