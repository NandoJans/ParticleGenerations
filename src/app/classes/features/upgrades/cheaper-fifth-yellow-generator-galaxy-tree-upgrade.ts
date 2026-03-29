import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {Styles} from "../../enums/styles";
import {Num} from "../../../num";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class CheaperFifthYellowGeneratorGalaxyTreeUpgrade extends GalaxyTreeUpgrade {

  constructor(saveName: string) {
    super(saveName, "cheaper-fifth-yellow-generator-galaxy-tree-upgrade");
  }

  override getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  override getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.cheaperFourthYellowGeneratorGalaxyTreeUpgrade,
    ];
  }

  override displayName: string = 'Cheaper Fifth Yellow Generator';

  override getDescription(): string {
    return 'Set the base cost of the fifth yellow generator to '+this.buffer.toString();
  }

  override style: Styles = Styles.STAR_YELLOW;
  override buffer: Num = new Num(1, 6);
  override baseBuffer: Num = new Num(1, 6);

  override action(): Num | undefined {
    if (!this.hasBought()) return;
    GeneratorRecord.fifthYellowGenerator.baseCost = this.baseBuffer.copy();
    return;
  }

  override baseCost: Num = new Num(2, 2);
  override cost: Num = new Num(2, 2);
}
