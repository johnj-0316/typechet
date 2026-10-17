import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { Inventory } from '../../../shared/types/api.types';
import { LucideDog, LucidePuzzle } from '@lucide/angular';

@Component({
  imports: [LucideDog, LucidePuzzle, CurrencyPipe],
  selector: 'tc-inventory-item',
  styleUrl: './inventory-item.component.css',
  templateUrl: './inventory-item.component.html',
})
export class InventoryItemComponent {
  readonly inventoryItem = input.required<Inventory>();
}
