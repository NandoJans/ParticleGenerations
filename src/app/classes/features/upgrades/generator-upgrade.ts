import {Upgrade} from "../upgrade";
import {Num} from "../../../num";
import {Generator} from "../generator";
import {Requirement} from "../interfaces/requirement";

export abstract class GeneratorUpgrade extends Upgrade {
  protected constructor(
    saveName: string,
    cost: Num,
    increase: Num,
    scaling: Num,
    buffer: Num,
    public generator: Generator,
  ) {
    super(saveName);
    this.baseCost = cost.copy();
    this.cost = cost.copy();
    this.displayName = '';
    this.increase = increase.copy();
    this.startIncrease = increase.copy();
    this.scaling = scaling.copy();
    this.buffer = buffer.copy();
    this.baseBuffer = buffer.copy();
  }

  override init() {
    this.requirement = [
      new Requirement(this.generator, new Num(this.generator.rank, 0), this),
    ];
  }

  baseCost: Num;
  cost: Num;
  displayName: string;
  increase: Num;
  startIncrease: Num;
}
