import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { CircleProgressComponent } from '../../../shared/components/circle-progress/circle-progress.component';
import { LucideEllipsisVertical, LucidePlay } from '@lucide/angular';

@Component({
  imports: [CircleProgressComponent, LucidePlay, LucideEllipsisVertical, DatePipe],
  selector: 'tc-tracker-item',
  styleUrl: './tracker-item.component.css',
  templateUrl: './tracker-item.component.html',
})
export class TrackerItemComponent {
    trackerTitle = input<string | null>();
    patternTitle = input<string | null>();
    date = input<string | Date | null>();
    index = input<number | null>();
    rows = input<string[] | null>();
}
