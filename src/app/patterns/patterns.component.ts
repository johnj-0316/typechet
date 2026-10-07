import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { PatternResponse, PatternsService } from '../patterns.service';
import { PatternItemComponent } from '../pattern-item/pattern-item.component';

@Component({
    imports: [PatternItemComponent, DatePipe],
    selector: 'tc-patterns',
    styleUrl: './patterns.component.css',
    templateUrl: './patterns.component.html',
})
export class PatternsComponent {
    private readonly patternsService = inject(PatternsService);
    readonly patterns = signal<PatternResponse | undefined>(undefined);

    constructor() {
        this.patternsService.getPatterns()?.subscribe({
            next: (response) => {
                this.patterns.set(response);
            },
        });
    }
}
