import { Injectable } from '@angular/core';
import { EnhancementService } from '../../enhancement.service';
import { EnhancementRecord } from '../../../classes/records/enhancement-record';
import { Upgrade } from '../../../classes/features/upgrade';
import { Generator } from '../../../classes/features/generator';

export interface EnhancementCtx {
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
}

@Injectable({ providedIn: 'root' })
export class EnhancementHelperService {
  constructor(private enhancementService: EnhancementService) {}

  checkEnhancement(ctx: EnhancementCtx, enhancable: Upgrade | Generator) {
    if (!(enhancable as any).canEnhance()) return;

    EnhancementRecord.list.forEach(enhancement => {
      if (
        (enhancable as any).enhancement !== enhancement &&
        this.enhancementService.canEnhance(enhancement) &&
        (enhancable as any).allowedEnhancements.includes(enhancement)
      ) {
        this.enhancementService.startEnhancing(enhancement);
        this.enhancementService.enhance(enhancable as any);
        ctx.results[enhancement.name + (enhancable as any).name] = {
          element: `${enhancement.displayName} - ${(enhancable as any).displayName}`,
          time: ctx.totalElapsedTime,
          timeBetween: ctx.elapsedSincePrevious,
          style: enhancement.style,
        };
        this.enhancementService.stopEnhancing();
        ctx.markNew();
      }
    })
  }
}
