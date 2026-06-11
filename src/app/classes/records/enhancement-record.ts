import {Enhancement} from "../features/enhancements/enhancement";
import {YellowEnhancement} from "../features/enhancements/yellow-enhancement";
import {GreenEnhancement} from "../features/enhancements/green-enhancement";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EnhancementRecord {

  constructor() {}


  static yellow: YellowEnhancement = new YellowEnhancement('yellow');
  static green: GreenEnhancement = new GreenEnhancement('green');

  static list: Enhancement[] = [
    EnhancementRecord.yellow,
    EnhancementRecord.green
  ];

  getList(): Enhancement[] {
    return EnhancementRecord.list;
  }
}
