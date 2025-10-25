import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-galaxy-tree',
    templateUrl: './galaxy-tree.component.html',
    styleUrls: ['./galaxy-tree.component.css'],
    standalone: false
})
export class GalaxyTreeComponent implements OnInit {
  infoText: string[] = [
    'This is a placeholder page for future galaxy tree functionality.',
    'Additional galaxy tree features and mechanics will be added here as the game expands.',
    'Check back for updates as new content becomes available!'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
