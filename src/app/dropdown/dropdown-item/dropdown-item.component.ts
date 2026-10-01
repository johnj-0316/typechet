import { Component, input, signal, computed } from '@angular/core';
import { DropdownItemData } from '../dropdown-item.type';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  imports: [LucideDynamicIcon],
  selector: 'tc-dropdown-item',
  styleUrl: './dropdown-item.component.css',
  templateUrl: './dropdown-item.component.html',
})
export class DropdownItemComponent {
    data = input.required<DropdownItemData>();
    icon = computed(() => this.data().icon ?? null);
}
