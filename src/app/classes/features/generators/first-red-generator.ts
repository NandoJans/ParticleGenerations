import { Num } from "src/app/num";
import {Generator} from "../generator";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Styles} from "../../enums/styles";
import {Holding} from "../holding";

export class FirstRedGenerator extends Generator {
    name: string = 'red-generator-1';
    displayName: string = 'Red Generator 1';
    generates: Generatable = HoldingRecord.redParticles;
    baseMulMod: Num = new Num(1, 0);
    baseMultiplier: Num = new Num(1, 0);
    type: string = 'red-particles';
    resetId: string = 'red';
    unlocked: boolean = false;
    requirement: Requirement[] = [];
    baseCost: Num = new Num(1, 1);
    cost: Num = new Num(1, 1);
    currency: Holding = HoldingRecord.redParticles;
    increase: Num = new Num(1, 0);
    scalingStart: Num = new Num(1, 0);
    globalMultiplier: string = 'redParticleGenerators';
    nav: string = 'red';
    style: Styles = Styles.RED;
    subNav: string = 'redParticles';
}
