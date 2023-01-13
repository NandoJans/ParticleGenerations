import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropDownMessageService {
  constructor() { }

  static dropDown(title: string, message: string) {
    const dropDownElement: HTMLElement = <HTMLElement> document.getElementById('drop-down-message')
    const dropDownTitle: HTMLElement = <HTMLElement> document.getElementById('ddm-title')
    const dropDownContent: HTMLElement = <HTMLElement> document.getElementById('ddm-content')
    if (dropDownElement !== null && dropDownTitle !== null && dropDownContent !== null) {

      dropDownElement.style.top = '10px';
      dropDownTitle.innerHTML = title;
      dropDownContent.innerHTML = message;

      setTimeout(() => {
        dropDownElement.style.top = '-100px';
      }, 5000)
    }
  }
}
