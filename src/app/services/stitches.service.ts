import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { ApiDataResponse, Stitches } from '../shared/types/api.types';

export type StitchesResponse = ApiDataResponse<Stitches[]>;

@Service()
export class StitchesService {
    private readonly http = inject(HttpClient);

    getStitches() {
        return this.http.get<StitchesResponse>('/api/v1/stitches');
    }
}
