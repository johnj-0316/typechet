import { Component, inject, signal } from '@angular/core';

import { StitchesResponse, StitchesService } from './stitches.service';
import { StitchItemComponent } from './stitch-item/stitch-item.component';

@Component({
    imports: [StitchItemComponent],
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
