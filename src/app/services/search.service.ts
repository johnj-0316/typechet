import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

export type SearchResult = {
    type: 'pattern' | 'tracker' | 'stitch';
    id: string;
    title: string;
    subtitle: string | null;
    updatedAt: string;
};

export type SearchResponse = {
    message: string;
    data: SearchResult[];
};

@Service()
export class SearchService {
    private readonly http = inject(HttpClient);

    search(query: string, limit = 10) {
        return this.http.get<SearchResponse>('/api/v1/search', {
            params: {
                q: query,
                limit,
            },
        });
    }
}
