import { Injectable } from '@angular/core';
import { MilestoneRecord } from '../../../classes/records/milestones/milestone-record';
import { DataManagerService } from '../../data-manager.service';

export interface MilestoneCtx {
  trackedMilestones: Set<string>;
  results: { [key: string]: any };
  totalElapsedTime: number;
  elapsedSincePrevious: number;
  markNew: () => void;
}

@Injectable({ providedIn: 'root' })
export class MilestoneHelperService {
  constructor(private dataManagerService: DataManagerService) {}

  checkMilestones(ctx: MilestoneCtx): void {
    MilestoneRecord.list.forEach(milestone => {
      if (milestone.unlocked && !ctx.trackedMilestones.has(milestone.name)) {
        ctx.trackedMilestones.add(milestone.name);

        if (!ctx.results[milestone.name]) {
          ctx.results[milestone.name] = {
            element: milestone.displayName,
            time: ctx.totalElapsedTime,
            timeBetween: ctx.elapsedSincePrevious,
            style: milestone.style,
          };
          ctx.markNew();
        }

        try {
          this.dataManagerService.saveSim();
          const snapId = this.dataManagerService.saveSimSnapshot({
            type: 'milestone',
            label: `Milestone: ${milestone.displayName}`,
            elapsed: ctx.totalElapsedTime,
            extra: { milestone: milestone.name }
          });
          if (ctx.results[milestone.name]) {
            ctx.results[milestone.name].snapshotId = snapId;
          }
        } catch {}
      }
    });
  }
}
