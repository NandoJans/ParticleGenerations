import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() name: string | undefined
  @Input() infoText: string[] | undefined
  hidden: boolean = true

  constructor() { }

  show() {
    this.hidden = false;
  }

  hide() {
    this.hidden = true;
  }

  toggle() {
    this.hidden = !this.hidden;
  }

  getHidden() {
    return this.hidden;
  }

  stopClose(event: Event) {
    event.stopPropagation();
  }
}
