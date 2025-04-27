import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {StatsService} from "../../../services/stats.service";
import {RedGenerator} from "../generators/red-generator";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class RedGeneratorAutomator extends Automator {
  displayName: string;
  name: string;
  goal: Num = new Num(2, 1);
  goalString: string;
  generator: RedGenerator;
  style: Styles = Styles.RED_AUTOMATOR;

  constructor(generator: RedGenerator) {
    super();
    this.displayName = generator.stringRank + ' Red Generator Automator';
    this.name = 'red-generator-automator-' + generator.rank;
    this.goalString = 'Buy ' + this.goal.toString() + ' ' + generator.stringRank + ' Red Generators';
    this.requirement = [
      new Requirement(UpgradeRecord.redGeneratorExtension, new Num(generator.rank - 1, 0), this)
    ]
    this.generator = generator
  }

  buyables(): Buyable[] {
    return [
      this.generator,
      this.generator.buyMultiplierUpgrade,
      this.generator.multiplierUpgrade,
    ];
  }

  task(): Num {
    return StatsService.getNum(this.generator.name, 'totalBought');
  }
}
