import { Component, input } from '@angular/core';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropdownItemData } from './dropdown-item.type';

@Component({
  imports: [DropdownItemComponent],
  selector: 'tc-dropdown',
  styleUrl: './dropdown.component.css',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  items = input.required<DropdownItemData[]>();
}
