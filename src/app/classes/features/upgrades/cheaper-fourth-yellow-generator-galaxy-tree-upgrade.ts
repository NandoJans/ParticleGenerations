import {Num} from "src/app/num";
import {Styles} from "../../enums/styles";
import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class CheaperFourthYellowGeneratorGalaxyTreeUpgrade extends GalaxyTreeUpgrade {

  constructor(saveName: string) {
    super(saveName, "cheaper-fourth-yellow-generator-galaxy-tree-upgrade");
  }


  override getChildren(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.cheaperFifthYellowGeneratorGalaxyTreeUpgrade,
    ];
  }

  override getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.moreYellowParticlesGalaxyTree,
    ];
  }

  override displayName: string = 'Cheaper Fourth Yellow Generator';

  override getDescription(): string {
    return 'Set the base cost of the fourth yellow generator to '+this.buffer.toString();
  }

  override style: Styles = Styles.STAR_YELLOW;
  override buffer: Num = new Num(1, 5);
  override baseBuffer: Num = new Num(1, 5);

  override action(): Num | undefined {
    if (!this.hasBought()) return;
    GeneratorRecord.fourthYellowGenerator.baseCost = this.baseBuffer.copy();
    return;
  }

  override baseCost: Num = new Num(1, 2);
  override cost: Num = new Num(1, 2);
}
