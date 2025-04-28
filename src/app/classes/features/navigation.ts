import {Requirement} from "./interfaces/requirement";
import {LocalStorageHelper} from "../helpers/local-storage-helper";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {GameElement} from "./game-element";
import {Require} from "./interfaces/require";
import {Num} from "../../num";

export class Navigation extends GameElement {
  name: string;
  displayIcon: IconDefinition;
  requirement: Requirement[];
  location: string;
  wasOn: string;
  localStorageHelper: LocalStorageHelper;

  constructor(name: string, displayIcon: IconDefinition, location: string, requirement: { requirement: Require, amount: Num }[], wasOn: string, unlocked: boolean = false) {
    super(name);
    this.name = name;
    this.displayIcon = displayIcon;
    this.location = location;
    this.unlocked = unlocked;
    this.requirement = requirement.map((req) => {
      return new Requirement(req.requirement, req.amount, this, unlocked);
    });
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

  override unlock(): {title: string, message: string} {
    this.unlocked = true;
    return {
      title: 'Navigation Unlocked',
      message: `You have unlocked the ${this.name} navigation!`
    };
  }
}
