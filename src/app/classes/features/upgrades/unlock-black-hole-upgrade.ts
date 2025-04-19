import {BlackHoleUpgrade} from "./black-hole-upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {GeneratorService} from "../../../services/interactables/generator.service";

export class UnlockBlackHoleUpgrade extends BlackHoleUpgrade {
  baseCost: Num = new Num(1, 0);
  bought: Num = new Num(0, 0);
  cost: Num = new Num(1, 0);
  currency: Holding = HoldingRecord.purpleParticles;
  displayName: string = "Unlock Black Hole";
  increase: Num = new Num(1, 0);
  name: string = "unlock-black-hole";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.purples, new Num(5, 0))
  ];
  override oneTime: boolean = true;

  action(): Num | undefined {
    return undefined;
  }

  getDescription(): string {
    return "";
  }

}
