import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { ApiDataResponse, Trackers } from './api.types';

export type TrackersResponse = ApiDataResponse<Trackers[]>;

@Service()
export class TrackersService {
    private readonly http = inject(HttpClient);

    getTrackers() {
        return this.http.get<TrackersResponse>('/api/v1/trackers');
    }
}
