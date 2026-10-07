import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Tables } from '../db/database.types';
import { ApiDataResponse } from './api.types';

@Service()
export class PatternsService {
    private readonly http = inject(HttpClient);

    getPatterns() {
        return this.http.get<ApiDataResponse<Tables<'patterns'>[]>>('/api/v1/patterns');
    }
}
