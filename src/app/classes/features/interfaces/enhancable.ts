import {Enhancement} from "../enhancements/enhancement";

export interface Enhancable {
  unlocked: boolean;
  name: string;
  enhancement: Enhancement|null;
  allowedEnhancements: Enhancement[];
  enhance(): void;
  canEnhance(): boolean;
  enhancementString(enhancement: Enhancement): string;
}
