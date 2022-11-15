import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() object: any;
  @Input() text: string | undefined;
  @Input() style: string | undefined;
  @Input() identifier: string | undefined;
  @Output() function: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  onClick() {
    // @ts-ignore
    this.function.emit(this.object);
  }

  ngOnInit(): void {

  }

}
