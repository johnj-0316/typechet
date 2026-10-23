import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownItemData } from '../dropdown-item.type';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  imports: [LucideDynamicIcon, RouterLink],
  selector: 'tc-dropdown-item',
  styleUrl: './dropdown-item.component.css',
  templateUrl: './dropdown-item.component.html',
})
export class DropdownItemComponent {
  data = input.required<DropdownItemData>();
  selected = output<DropdownItemData>();
  icon = computed(() => this.data().icon ?? null);

  select(): void {
    if (!this.data().disabled) 
      this.selected.emit(this.data());
  }
}
