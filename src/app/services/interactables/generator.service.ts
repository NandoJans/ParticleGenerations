import {Injectable} from '@angular/core';
import {Num} from "../../num";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";
import {Generator} from "../../classes/features/generator";
import {Multiplier} from "../../classes/features/multiplier";
import {Upgrade} from "../../classes/features/upgrade";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  constructor(
    private generatorRecord: GeneratorRecord,
  ) {}

  /**
   * Game tick function for running the game logic. The game tick is called every 50ms.
   * @param speed The speed of the game tick. This is used to slow down the game tick for testing purposes.
   */
  tick(speed: Num) {
    this.generate(speed);
  }

  /**
   * Generates particles based on the generators that are unlocked.
   * @param speed The speed of the game tick. This is used to slow down the game tick for testing purposes.
   */
  private generate(speed: Num) {
    this.generatorRecord.getList().forEach(generator => {
      if (generator.isUnlocked()) {
        generator.run(speed);
      }
    });
  }

  getElements(): (Generator|Upgrade)[] {
    return [
      ...this.generatorRecord.getList(),
      ...this.generatorRecord.getList().flatMap(generator => generator.getUpgrades()),
    ];
  }
}
