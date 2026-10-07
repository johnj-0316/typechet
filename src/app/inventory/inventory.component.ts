import { Component, inject, signal } from '@angular/core';
import { Tables } from '../../db/database.types';
import { ApiDataResponse } from '../api.types';
import { InventoryService } from '../inventory.service';

@Component({
    imports: [],
    selector: 'tc-inventory',
    styleUrl: './inventory.component.css',
    templateUrl: './inventory.component.html',
})
export class InventoryComponent {
    private readonly inventoryService = inject(InventoryService);
    readonly inventory = signal<ApiDataResponse<Tables<'inventory'>[]> | undefined>(undefined);

    constructor() {
        this.inventoryService.getInventory()?.subscribe({
            next: (response) => {
                this.inventory.set(response);
            },
        });
    }
}
