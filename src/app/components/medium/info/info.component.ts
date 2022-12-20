import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() name: string | undefined
  @Input() text: string[] | undefined
  constructor() { }

  show() {
    if (this.name !== undefined && this.text !== undefined) {
      (<HTMLElement> document.getElementById(this.name)).style.display = 'unset';
    }
  }

  ngOnInit(): void {
  }

}
