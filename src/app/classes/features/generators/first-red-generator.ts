import { Num } from "src/app/num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {RedGenerator} from "./red-generator";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Red Generator 1';
  generates: Generatable = HoldingRecord.redParticles;
  name: string = 'red-generator-1';
  increase: Num = new Num(1, 1);
  override unlocked: boolean = true;
}
