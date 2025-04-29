import {Timeline} from "./timeline";
import {Holding} from "../holding";
import {Num} from "../../../num";
import {Storable} from "../interfaces/storable";
import {LocalStorageHelper} from "../../helpers/local-storage-helper";

export class TimelineEvent implements Storable {
  shouldShow: boolean = false;
  unlocked: boolean = false;

  constructor(
    public name: string,
    public title: string,
    public message: string,
    public holdingRequirement: Holding,
    public requiredAmount: Num,
    public timeline: Timeline
  ) {
  }

  getSaveCategory(): string {
    return "timeline";
  }

  getSaveKey(): string {
    return this.name;
  }

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());

  save() {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.localStorageHelper.save(this.unlocked, 'unlocked');
    this.localStorageHelper.save(this.shouldShow, 'shouldShow');
  }

  tryLoad() {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.unlocked = this.localStorageHelper.load(this.unlocked, 'unlocked');
    this.shouldShow = this.localStorageHelper.load(this.shouldShow, 'shouldShow');
  }

  unlock(): void {
    this.unlocked = true;
    this.shouldShow = true;
    this.timeline.onUnlockedEvent(this);
  }

  show() {
    this.shouldShow = true;
  }
}
