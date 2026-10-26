import { DatePipe, JsonPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Pattern } from '../../../shared/types/api.types';
import { LucideArrowLeft } from '@lucide/angular';

@Component({
    imports: [LucideArrowLeft, DatePipe, JsonPipe, RouterLink],
    selector: 'tc-pattern',
    styleUrl: './pattern.component.css',
    templateUrl: './pattern.component.html',
})
export class PatternComponent {
    readonly pattern = input.required<Pattern>();

    protected readonly rowCount = computed(() => {
        const rows = this.pattern().rows;
        return Array.isArray(rows) ? rows.length : 0;
    });
}
