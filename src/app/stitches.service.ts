import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Tables } from '../db/database.types';
import { ApiDataResponse } from './api.types';

@Service()
export class StitchesService {
    private readonly http = inject(HttpClient);

    getStitches() {
        return this.http.get<ApiDataResponse<Tables<'stitches'>[]>>('/api/v1/stitches');
    }
}
