import { Component, inject } from '@angular/core';
import { LucideSearch } from '@lucide/angular';

import { SearchService } from '../../../services/search.service';

@Component({
    imports: [LucideSearch],
    selector: 'tc-search',
    styleUrl: './search.component.css',
    templateUrl: './search.component.html',
})
export class SearchComponent {
    private readonly searchService = inject(SearchService);

    protected search(query: string): void {
        this.searchService.search(query).subscribe({
            next: (response) => alert(JSON.stringify(response, null, 2)),
            error: (error) => alert(JSON.stringify(error.error ?? error, null, 2)),
        });
    }
}
