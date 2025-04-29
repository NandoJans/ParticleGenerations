import {Timeline} from "./timeline";
import {Holding} from "../holding";
import {Num} from "../../../num";
import {Storable} from "../interfaces/storable";
import {LocalStorageHelper} from "../../helpers/local-storage-helper";

export class TimelineEvent implements Storable {
  shouldShow: boolean = false;
  reached: boolean = false;
  firstTime: boolean = true;
  highestAmount: Num = new Num(1, 0);

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
    this.localStorageHelper.save(this.reached, 'reached');
    this.localStorageHelper.save(this.shouldShow, 'shouldShow');
    this.localStorageHelper.save(this.firstTime, 'firstTime');
    this.localStorageHelper.saveNum(this.highestAmount, 'highestAmount');
  }

  tryLoad() {
    this.localStorageHelper = new LocalStorageHelper(this.getSaveCategory(), this.getSaveKey());
    this.reached = this.localStorageHelper.load(this.reached, 'reached');
    this.shouldShow = this.localStorageHelper.load(this.shouldShow, 'shouldShow');
    this.firstTime = this.localStorageHelper.load(this.firstTime, 'firstTime');
    this.highestAmount = this.localStorageHelper.loadNum(this.highestAmount, 'highestAmount');
  }

  reach(): void {
    this.reached = true;
    this.shouldShow = true;
  }

  show() {
    this.shouldShow = true;
  }

  run(): boolean {
    this.updateHighestAmount();

    if (!this.reached && this.holdingRequirement.amount.greq(this.requiredAmount)) {
      this.reach();
      const result = this.firstTime;
      this.firstTime = false;
      return result;
    }
    return false;
  }

  private updateHighestAmount() {
    if (this.holdingRequirement.amount.greq(this.highestAmount)) {
      this.highestAmount = this.holdingRequirement.amount;
    }
  }

  getNext(): TimelineEvent | null {
    return this.timeline.getNext(this);
  }
}
