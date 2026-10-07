import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Tables } from '../db/database.types';
import { ApiDataResponse } from './api.types';

@Service()
export class TrackersService {
    private readonly http = inject(HttpClient);

    getTrackers() {
        return this.http.get<ApiDataResponse<Tables<'trackers'>[]>>('/api/v1/trackers');
    }
}
