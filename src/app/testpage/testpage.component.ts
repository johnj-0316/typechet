import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { Trackers } from '../api.types';
import { CircleProgressComponent } from '../circle-progress/circle-progress.component';

type PrototypeTracker = Trackers & {
    maxRows: number;
    progress: number;
};

@Component({
    imports: [CircleProgressComponent, DatePipe],
    selector: 'tc-testpage',
    styleUrl: './testpage.component.css',
    templateUrl: './testpage.component.html',
})
export class TestpageComponent {
    readonly trackers: PrototypeTracker[] = [
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
            user_id: 'demo-user',
        },
    ];
}
