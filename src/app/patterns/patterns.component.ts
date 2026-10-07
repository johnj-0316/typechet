import { Component, inject, signal } from '@angular/core';
import { Tables } from '../../db/database.types';
import { ApiDataResponse } from '../api.types';
import { PatternsService } from '../patterns.service';

@Component({
    imports: [],
    selector: 'tc-patterns',
    styleUrl: './patterns.component.css',
    templateUrl: './patterns.component.html',
})
export class PatternsComponent {
    private readonly patternsService = inject(PatternsService);
    readonly patterns = signal<ApiDataResponse<Tables<'patterns'>[]> | undefined>(undefined);

    constructor() {
        this.patternsService.getPatterns()?.subscribe({
            next: (response) => {
                this.patterns.set(response);
            },
        });
    }
}
