import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropDownMessageService {
  messageQueue: {title: string, message: string, type: string}[] = [];
  timeOut: any = undefined;

  constructor() {}

  dropDown(title: string, message: string, type: string = 'info') {
    this.messageQueue.push({title, message, type});
    this.setTimeout();
  }

  private setTimeout() {
    if (!this.timeOut) {
      this.timeOut = setTimeout(() => {
        this.messageQueue.shift();
        clearTimeout(this.timeOut);
        this.timeOut = undefined;
        if (this.messageQueue.length > 0) {
          this.setTimeout();
        }
      }, 5000);
    }
  }

  getMessage() {
    return this.messageQueue.length > 0 ? this.messageQueue[0] : null;
  }
}
