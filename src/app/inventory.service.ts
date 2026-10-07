import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { ApiDataResponse, Inventory } from './api.types';

export type InventoryResponse = ApiDataResponse<Inventory[]>;

@Service()
export class InventoryService {
    private readonly http = inject(HttpClient);

    getInventory() {
        return this.http.get<InventoryResponse>('/api/v1/inventories');
    }
}
