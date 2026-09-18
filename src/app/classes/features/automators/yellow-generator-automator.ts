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
  private readonly getGenerator: () => YellowGenerator;
  style: Styles = Styles.YELLOW;
  resetId: ResetKey;

  constructor(saveName: string, getGenerator: () => YellowGenerator, rank: number, stringRank: string) {
    super(saveName);
    this.displayName = stringRank + ' Yellow Generator Automator';
    this.name = 'yellow-generator-automator-' + rank;
    this.goalString = 'Buy ' + this.goal.toString() + ' ' + stringRank + ' Yellow Generators';
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
    this.getGenerator = getGenerator;
  }

  get generator(): YellowGenerator {
    return this.getGenerator();
  }

  override init(): void {
    this.requirement = [
      new Requirement(this.generator, new Num(1, 0), this)
    ];
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
