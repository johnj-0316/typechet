import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { ApiDataResponse, Pattern } from './api.types';

export type PatternResponse = ApiDataResponse<Pattern[]>;

@Service()
export class PatternsService {
    private readonly http = inject(HttpClient);

    getPatterns() {
        return this.http.get<PatternResponse>('/api/v1/patterns');
    }
}
