import { Component, inject, signal } from '@angular/core';

import { TrackersResponse, TrackersService } from '../trackers.service';

@Component({
    imports: [],
    selector: 'tc-trackers',
    styleUrl: './trackers.component.css',
    templateUrl: './trackers.component.html',
})
export class TrackersComponent {
    private readonly trackersService = inject(TrackersService);
    readonly trackers = signal<TrackersResponse | undefined>(undefined);

    constructor() {
        this.trackersService.getTrackers()?.subscribe({
            next: (response) => {
                this.trackers.set(response);
            },
        });
    }
}
