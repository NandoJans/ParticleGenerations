import {Automator} from "../automator";
import {Num} from "../../../num";
import {Buyable} from "../buyable";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {StatsService} from "../../../services/stats.service";
import {RedGenerator} from "../generators/red-generator";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export class RedGeneratorAutomator extends Automator {
  displayName: string;
  name: string;
  goal: Num = new Num(2, 1);
  goalString: string;
  generator: RedGenerator;
  style: Styles = Styles.RED_AUTOMATOR;
  resetId: ResetKey;

  constructor(saveName: string, generator: RedGenerator) {
    super(saveName);
    this.displayName = generator.stringRank + ' Red Generator Automator';
    this.name = 'red-generator-automator-' + generator.rank;
    this.goalString = 'Buy ' + this.goal.toString() + ' ' + generator.stringRank + ' Red Generators';
    this.requirement = [
      new Requirement(generator, new Num(1, 0), this)
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.RED, this);
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
    return StatsService.getNum(this.generator.name, 'totalBoughtAutomator');
  }

  override reset() {
    StatsService.setNum(this.generator.name, 'totalBoughtAutomator', new Num(0, 0));
    super.reset();
  }
}
