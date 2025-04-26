import {Injectable} from '@angular/core';
import {GlobalMultipliersService} from "./globals/global-multipliers.service";
import {Num} from "../num";
import {DataManagerService} from "./data-manager.service";
import {GeneratorService} from "./interactables/generator.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {Requirement} from "../classes/features/interfaces/requirement";
import {ComponentService} from "./component.service";
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";

@Injectable({
  providedIn: 'root'
})
export class TickService {
  mainInterval: any;
  saveInterval: any;
  iterationsInterval: any;
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'lastSave');

  constructor(
    private dataManagerService: DataManagerService,
    private generatorService: GeneratorService,
    private upgradeService: UpgradeService,
    private componentService: ComponentService,
    private multiplierService: GlobalMultipliersService,
  ) { }

  /**
   * Game tick function for running the game logic. The game tick is called every 50ms.
   * @param speed The speed of the game tick. This is used to slow down the game tick for testing purposes.
   */
  gameTick(speed: Num = new Num(1, -1)) {
    Requirement.checkRequirements();
    this.generatorService.tick(speed);
    this.multiplierService.tick();
    this.upgradeService.tick();
    this.componentService.reloadComponents();
  }

  iterations: number = 0;

  startIntervals() {
    this.clearIntervals()
    this.setIntervals()
  }

  private setIntervals() {
    this.mainInterval = setInterval(() => {
      this.iterations++;
      this.gameTick()
    }, 50)

    this.iterationsInterval = setInterval(() => {
      console.log('Iterations: '+this.iterations+'/s')
      this.iterations = 0
    }, 1000)

    this.saveInterval = setInterval(() => {
      this.dataManagerService.save()
    }, 5000)
  }

  clearIntervals() {
    clearInterval(this.mainInterval);
    clearInterval(this.saveInterval);
    clearInterval(this.iterationsInterval);
  }
}
