import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
    standalone: false
})
export class ButtonComponent implements OnInit {
  @Input() object: any;
  @Input() text: string = '';
  @Input() icon: IconDefinition | undefined;
  @Input() style: string | undefined;
  @Input() identifier: string | undefined;
  @Input() ariaLabel: string | undefined;
  @Output() function: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }



  onClick() {
    // @ts-ignore
    this.function.emit(this.object);
  }

  ngOnInit(): void {

  }

}
