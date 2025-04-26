import {Requirement} from "./interfaces/requirement";
import {Navigation} from "./navigation";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Require} from "./interfaces/require";
import {Num} from "../../num";
import {GameElement} from "./game-element";

export class SubNavigation extends GameElement {
  name: string;
  displayName: IconDefinition;
  location: string;
  requirement: Requirement[];
  parent: Navigation;
  localStorageHelper: LocalStorageHelper;

  constructor(name: string, displayName: IconDefinition, location: string, parent: Navigation, requirement: { requirement: Require, amount: Num }[], unlocked: boolean = false) {
    super();
    this.name = name;
    this.displayName = displayName;
    this.location = location;
    this.parent = parent;
    this.requirement = requirement.map((req) => {
      return new Requirement(req.requirement, req.amount, this, unlocked);
    });
    this.unlocked = unlocked;
    this.localStorageHelper = new LocalStorageHelper('navigations', name);
  }

  save() {
    this.localStorageHelper.save(this.unlocked, 'unlocked');
  }

  tryLoad() {
    this.unlocked = this.localStorageHelper.load(this.unlocked, 'unlocked');
  }

  override unlock(): {title: string, message: string} {
    this.unlocked = true;
    return {
      title: 'Sub Navigation Unlocked',
      message: `You have unlocked the ${this.name} navigation!`
    };
  }
}
