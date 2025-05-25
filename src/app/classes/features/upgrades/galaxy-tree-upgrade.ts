import {Upgrade} from "../upgrade";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export abstract class GalaxyTreeUpgrade extends Upgrade {
  name: string;
  type: string = 'galaxy-tree-upgrade';
  nav: string = 'green';
  subNav: string = 'galaxyTree';
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.darkEnergy;
  increase: Num = new Num(1, 0);
  override limit: Num = new Num(1, 0);
  override oneTime: boolean = true;
  allowedEnhancements: any[] = [];
  override calculationOrder: number = 51;
  enhancementString(enhancement: any): string {
    return '';
  }
  canEnhance(): boolean {
    return false;
  }
  enhance(): void {
    // No enhancement logic for galaxy tree upgrades
  }

  override run(): Num | undefined {
    if (this.hasBought()) {
      MultiplierRecord.totalDarkEnergyCost.add(this.baseCost);
    }
    return super.run();
  }

  requirement: Requirement[];
  resetId: ResetKey;

  protected constructor(saveName: string, name: string) {
    super(saveName);
    this.name = name;
    this.requirement = [
      new Requirement(HoldingRecord.greenPrestiges, new Num(1, 0), this)
    ];
    this.resetId = ResetHelper.registerReset(ResetKey.GREEN, this)
  }

  abstract getChildren(): GalaxyTreeUpgrade[];
  abstract getParents(): GalaxyTreeUpgrade[];

  parentsBought(): boolean {
    for (const parent of this.getParents()) {
      if (parent.hasBought()) {
        return true;
      }
    }
    return false;
  }
}
