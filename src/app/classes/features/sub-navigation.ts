import {Requirement} from "./interfaces/requirement";
import {Navigation} from "./navigation";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export class SubNavigation {
  name: string;
  displayName: IconDefinition;
  location: string;
  parent: Navigation;
  requirement: Requirement|null;
  unlocked: boolean;
  localStorageHelper: LocalStorageHelper;

  constructor(name: string, displayName: IconDefinition, location: string, parent: Navigation, requirement: Requirement|null, unlocked: boolean = false) {
    this.name = name;
    this.displayName = displayName;
    this.location = location;
    this.parent = parent;
    this.requirement = requirement;
    this.unlocked = unlocked;
    this.localStorageHelper = new LocalStorageHelper('navigations', name);
  }

  save() {
    this.localStorageHelper.save(this.unlocked, 'unlocked');
  }

  tryLoad() {
    this.unlocked = this.localStorageHelper.load(this.unlocked, 'unlocked');
  }
}
