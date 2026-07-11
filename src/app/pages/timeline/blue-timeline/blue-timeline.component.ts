import {Component} from '@angular/core';
import {Timeline} from '../../../classes/features/timeline/timeline';
import {TimelineService} from '../../../services/timeline.service';

@Component({
  selector: 'app-blue-timeline',
  templateUrl: './blue-timeline.component.html',
  styleUrl: './blue-timeline.component.css',
  standalone: false
})
export class BlueTimelineComponent {
  timeline: Timeline = TimelineService.blueTimeline;
  infoText: string[] = [
    'The Blue Timeline follows the separation of charged particles, their collisions, and persistent neutron synthesis.',
    'Blue milestones are powered by persistent Neutrons and improve later particle runs.',
    'The first neutron stage produces Lithium; later logarithmic stages extend the heavy-element chain.'
  ];
}
