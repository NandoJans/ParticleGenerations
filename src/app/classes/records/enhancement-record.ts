import {Enhancement} from "../features/enhancements/enhancement";
import {YellowEnhancement} from "../features/enhancements/yellow-enhancement";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EnhancementRecord {

  constructor() {}


  static yellow: YellowEnhancement = new YellowEnhancement('yellow');

  static list: Enhancement[] = [
    EnhancementRecord.yellow
  ];

  getList(): Enhancement[] {
    return EnhancementRecord.list;
  }
}
