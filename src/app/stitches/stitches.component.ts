import { Component, inject, signal } from '@angular/core';
import { Tables } from '../../db/database.types';
import { ApiDataResponse } from '../api.types';
import { StitchesService } from '../stitches.service';

@Component({
    imports: [],
    selector: 'tc-stitches',
    styleUrl: './stitches.component.css',
    templateUrl: './stitches.component.html',
})
export class StitchesComponent {
    private readonly stitchesService = inject(StitchesService);
    readonly stitches = signal<ApiDataResponse<Tables<'stitches'>[]> | undefined>(undefined);

    constructor() {
        this.stitchesService.getStitches()?.subscribe({
            next: (response) => {
                this.stitches.set(response);
            },
        });
    }
}
