import {Component, Input, OnInit} from '@angular/core';
import {Automator} from "../../../classes/features/automator";
import {LocalStorageHelper} from "../../../classes/helpers/local-storage-helper";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-automator-section',
  templateUrl: './automator-section.component.html',
  styleUrl: './automator-section.component.css',
  standalone: false
})
export class AutomatorSectionComponent implements OnInit {
  @Input() name: string = '';
  @Input() title: string = '';
  @Input() automators: Automator[] = [];
  open: boolean = true;

  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('automator-section', this.name);

  isOpen(): boolean {
    return this.open;
  }

  toggle(): void {
    this.open = !this.open;
    this.localStorageHelper.save(this.open)
  }

  ngOnInit(): void {
    this.localStorageHelper = new LocalStorageHelper('automator-section', this.name);
    this.open = this.localStorageHelper.load(true)
  }

  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronUp = faChevronUp;
}
