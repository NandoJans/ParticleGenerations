import {Automator} from "../automator";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {ResetKey} from "../../enums/reset-key";
import {Requirement} from "../interfaces/requirement";
import {ResetHelper} from "../../helpers/reset-helper";
import {Buyable} from "../buyable";
import {StatsService} from "../../../services/stats.service";
import {YellowGenerator} from "../generators/yellow-generator";

export class YellowGeneratorAutomator extends Automator {
  displayName: string;
  name: string;
  goal: Num = new Num(2, 1);
  goalString: string;
  generator: YellowGenerator;
  style: Styles = Styles.YELLOW;
  resetId: ResetKey;

  constructor(saveName: string, generator: YellowGenerator) {
    super(saveName);
    this.displayName = generator.stringRank + ' Yellow Generator Automator';
    this.name = 'yellow-generator-automator-' + generator.rank;
    this.goalString = 'Buy ' + this.goal.toString() + ' ' + generator.stringRank + ' Yellow Generators';
    this.requirement = [
      new Requirement(generator, new Num(1, 0), this)
    ]
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
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
