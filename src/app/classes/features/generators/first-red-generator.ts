import { Num } from "src/app/num";
import {Generator} from "../generator";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";
import {ResetKey} from "../../enums/reset-key";
import {RedGenerator} from "./red-generator";

export class FirstRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Red Generator 1';
  generates: Generatable = HoldingRecord.redParticles;
  name: string = 'redGenerator1';
}
