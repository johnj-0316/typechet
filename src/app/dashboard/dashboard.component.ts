import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItemData } from '../dropdown/dropdown-item.type';
import { LucideFileText } from '@lucide/angular';

@Component({
  imports: [SidebarComponent, DropdownComponent, NavComponent],
  selector: 'tc-dashboard',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  dropdownItems: DropdownItemData[] = [{ label: 'Lorem', icon: LucideFileText.icon }]
}
