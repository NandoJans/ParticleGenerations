import {Injectable} from '@angular/core';
import {GlobalMultipliersService} from "./globals/global-multipliers.service";
import {Num} from "../num";
import {DataManagerService} from "./data-manager.service";
import {GeneratorService} from "./interactables/generator.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {Requirement} from "../classes/features/interfaces/requirement";
import {ComponentService} from "./component.service";
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {AutomatorService} from "./interactables/automator.service";
import {HoldingService} from "./holding.service";
import {DropDownMessageService} from "./visuals/drop-down-message.service";
import {GameElement} from "../classes/features/game-element";
import {Holding} from "../classes/features/holding";
import {Multiplier} from "../classes/features/multiplier";
import {PrestigeLayersService} from "./prestige-layers.service";

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
    private automatorService: AutomatorService,
    private holdingService: HoldingService,
    private prestigeLayersService: PrestigeLayersService,
    private dropDownMessageService: DropDownMessageService
  ) {}

  /**
   * Game tick function for running the game logic. The game tick is called every 50ms.
   * @param speed The speed of the game tick. This is used to slow down the game tick for testing purposes.
   */
  gameTick(speed: Num = new Num(1, -1)) {
    this.checkRequirements();

    this.calculationOrder.forEach((elements) => {
      elements.forEach((element) => {
        if (element instanceof Holding) {
          element.run();
        } else if (element instanceof Multiplier) {
          element.reset();
        } else {
          if (element.isUnlocked()) {
            element.run(speed);
          }
        }
      });
    });

    this.prestigeLayersService.tick(speed);
    this.componentService.reloadComponents();
  }

  private checkRequirements() {
    const dropDownMessages: {title: string, message: string}[] = Requirement.checkRequirements();
    this.dropDownMessageService.addAllDropDowns(dropDownMessages);
  }

  iterations: number = 0;

  startIntervals() {
    this.clearIntervals()
    this.setIntervals()
  }

  private setIntervals() {
    if (this.calculationOrder.length == 0) {
      this.applyCalculationOrder();
      console.log(this.calculationOrder);
    }

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

  calculationOrder: (GameElement|Holding|Multiplier)[][] = []

  private applyCalculationOrder() {
    const services = [
      this.multiplierService,
      this.upgradeService,
      this.automatorService,
      this.holdingService,
      this.generatorService
    ];

    services.forEach(service => {
      service.getElements().forEach(element => {
        this.pushToCalculationOrder(element);
      });
    });
  }

  private pushToCalculationOrder(element: GameElement|Holding|Multiplier) {
    if (element.calculationOrder == undefined) {
      if (this.calculationOrder[4] == undefined) {
        this.calculationOrder[4] = []
      }
      this.calculationOrder[4].push(element)
    } else {
      if (this.calculationOrder[element.calculationOrder] == undefined) {
        this.calculationOrder[element.calculationOrder] = []
      }
      this.calculationOrder[element.calculationOrder].push(element)
    }
  }
}
