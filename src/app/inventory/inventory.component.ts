import { Component, inject, signal } from '@angular/core';

import { InventoryResponse, InventoryService } from '../inventory.service';

@Component({
    imports: [],
    selector: 'tc-inventory',
    styleUrl: './inventory.component.css',
    templateUrl: './inventory.component.html',
})
export class InventoryComponent {
    private readonly inventoryService = inject(InventoryService);
    readonly inventory = signal<InventoryResponse | undefined>(undefined);

    constructor() {
        this.inventoryService.getInventory()?.subscribe({
            next: (response) => {
                this.inventory.set(response);
            },
        });
    }
}
