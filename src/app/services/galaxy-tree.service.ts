import {Injectable} from '@angular/core';
import {GalaxyTreeUpgrade} from "../classes/features/upgrades/galaxy-tree-upgrade";
import {UpgradeRecord} from "../classes/records/upgrades/upgrade-record";
import {ResetHelper} from "../classes/helpers/reset-helper";
import {ResetKey} from "../classes/enums/reset-key";

@Injectable({
  providedIn: 'root'
})
export class GalaxyTreeService {
  selectedGalaxyStar?: GalaxyTreeUpgrade;
  stars: GalaxyTreeUpgrade[] = [];

  constructor() {
    this.stars = UpgradeRecord.galaxyTreeUpgradeList;
  }


  setSelectedGalaxyStar(galaxyStar: GalaxyTreeUpgrade) {
    console.log('Selected galaxy star: ' + galaxyStar.displayName);
    this.selectedGalaxyStar = galaxyStar;
  }

  hasSelectedGalaxyStar(): boolean {
    return this.selectedGalaxyStar !== undefined;
  }

  getSelectedGalaxyStar(): GalaxyTreeUpgrade | undefined {
    return this.selectedGalaxyStar;
  }

  clearSelectedGalaxyStar() {
    this.selectedGalaxyStar = undefined;
  }

  respec() {
    ResetHelper.reset(ResetKey.YELLOW);
    this.stars.forEach(star => {
      if (star !== UpgradeRecord.unlockFirstGreenGeneratorGalaxyTree) {
        star.reset();
      }
    })
  }

  getStars(): GalaxyTreeUpgrade[] {
    return this.stars
  }
}
