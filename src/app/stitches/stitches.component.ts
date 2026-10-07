import { Component, inject, signal } from '@angular/core';

import { StitchesResponse, StitchesService } from '../stitches.service';

@Component({
    imports: [],
    selector: 'tc-stitches',
    styleUrl: './stitches.component.css',
    templateUrl: './stitches.component.html',
})
export class StitchesComponent {
    private readonly stitchesService = inject(StitchesService);
    readonly stitches = signal<StitchesResponse | undefined>(undefined);

    constructor() {
        this.stitchesService.getStitches()?.subscribe({
            next: (response) => {
                this.stitches.set(response);
            },
        });
    }
}
