import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { CircleProgressComponent } from '../../circle-progress/circle-progress.component';
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
    date = input<string | null>();
    index = input<number | null>();
    rows = input<string[] | null>();

    readonly trackers = [
        {
            created_at: '2026-10-01T14:20:00.000Z',
            current_index: 18,
            current_row: 24,
            current_stitch: 'Half double crochet',
            id: 'tracker-1',
            is_finished: false,
            maxRows: 40,
            pattern_id: 12,
            progress: 60,
            title: 'Autumn Market Tote',
            pattern_title: "Untitled project",
            user_id: 'demo-user',
        },
        {
            created_at: '2026-09-28T09:15:00.000Z',
            current_index: 7,
            current_row: 8,
            current_stitch: 'Single crochet',
            id: 'tracker-2',
            is_finished: false,
            maxRows: 16,
            pattern_id: 18,
            progress: 50,
            title: 'Ribbed Beanie',
            pattern_title: "Untitled project",
            user_id: 'demo-user',
        },
        {
            created_at: '2026-09-12T18:40:00.000Z',
            current_index: 32,
            current_row: 52,
            current_stitch: 'Shell stitch',
            id: 'tracker-3',
            is_finished: true,
            maxRows: 52,
            pattern_id: 21,
            progress: 100,
            title: 'Garden Throw Blanket',
            pattern_title: "Untitled project",
            user_id: 'demo-user',
        },
    ];
}
