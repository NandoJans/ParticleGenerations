import { Component, OnInit } from '@angular/core';
import {DropDownMessageService} from "../../../services/visuals/drop-down-message.service";

@Component({
  selector: 'app-drop-down-message',
  templateUrl: './drop-down-message.component.html',
  styleUrls: ['./drop-down-message.component.css']
})
export class DropDownMessageComponent implements OnInit {

  constructor(
    private dropDownMessageService: DropDownMessageService,
  ) { }

  ngOnInit(): void {
  }

  getTop(): string {
    return this.dropDownMessageService.messageQueue.length > 0 ? '50px' : '-200px';
  }

  getTitle(): string {
    return this.dropDownMessageService.messageQueue.length > 0 ? this.dropDownMessageService.messageQueue[0].title : '';
  }

  getMessage(): string {
    return this.dropDownMessageService.messageQueue.length > 0 ? this.dropDownMessageService.messageQueue[0].message : '';
  }

  getType() {
    return this.dropDownMessageService.messageQueue.length > 0 ? this.dropDownMessageService.messageQueue[0].type : '';
  }

  getTopClass() {
    return this.dropDownMessageService.messageQueue.length > 0 ? 'open' : 'closed';
  }
}
