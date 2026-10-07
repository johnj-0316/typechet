import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Tables } from '../db/database.types';
import { ApiDataResponse } from './api.types';

@Service()
export class InventoryService {
    private readonly http = inject(HttpClient);

    getInventory() {
        return this.http.get<ApiDataResponse<Tables<'inventory'>[]>>('/api/v1/inventories');
    }
}
