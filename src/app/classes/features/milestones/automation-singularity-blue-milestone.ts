import {BlueMilestone} from './blue-milestone';
import {Automator} from '../automator';
import {PrestigeLayersService} from '../../../services/prestige-layers.service';

export class AutomationSingularityBlueMilestone extends BlueMilestone {
  override init(): void {
    if (this.unlocked) this.applyEffects();
    super.init();
  }

  override run(): void {
    if (this.unlocked) this.applyEffects();
  }

  override action(): void {
    this.applyEffects();
  }

  override reset(): void {
    super.reset();
    Automator.keepOnReset = false;
    PrestigeLayersService.yellowPrestigeLayer.passivePrestige = false;
    PrestigeLayersService.greenPrestigeLayer.passivePrestige = false;
    PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = true;
    PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow = true;
  }

  private applyEffects(): void {
    Automator.keepOnReset = true;
    PrestigeLayersService.yellowPrestigeLayer.passivePrestige = true;
    PrestigeLayersService.greenPrestigeLayer.passivePrestige = true;
    PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = false;
    PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow = false;
  }
}
