import {Requirement} from "./interfaces/requirement";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class Navigation {
  name: string;
  displayIcon: IconDefinition;
  location: string;
  unlocked: boolean;
  requirement: Requirement|null;
  wasOn: string;
  localStorageHelper: LocalStorageHelper;

  constructor(name: string, displayIcon: IconDefinition, location: string, requirement: Requirement|null, wasOn: string, unlocked: boolean = false) {
    this.name = name;
    this.displayIcon = displayIcon;
    this.location = location;
    this.unlocked = unlocked;
    this.requirement = requirement;
    this.wasOn = wasOn;
    this.localStorageHelper = new LocalStorageHelper('navigations', name);
  }

  save() {
    this.localStorageHelper.save(this.unlocked, 'unlocked');
    this.localStorageHelper.save(this.wasOn, 'wasOn');
  }

  tryLoad() {
    this.wasOn = this.localStorageHelper.load(this.wasOn, 'wasOn');
    this.unlocked = this.localStorageHelper.load(this.unlocked, 'unlocked');
  }
}
