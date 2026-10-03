import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItemData } from '../dropdown/dropdown-item.type';
import { LucideFileText, LucideUsersRound, LucidePalette, LucideUserRound } from '@lucide/angular';
import { NavItem } from '../nav/nav.type';

@Component({
  imports: [SidebarComponent, DropdownComponent, NavComponent],
  selector: 'tc-dashboard',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  dropdownItems: DropdownItemData[] = [{ label: 'Lorem', icon: LucideFileText.icon }];
  dashboardItems: NavItem[] = [
    {
      label: "Feedback",
      kind: "link",
      path: ""
    },
    {
      label: "Friends",
      kind: "button",
      action: "",
      icon: LucideUsersRound.icon
    },
    {
      label: "Design",
      kind: "button",
      action: "",
      icon: LucidePalette.icon
    },
    {
      label: "Account Details",
      kind: "button",
      action: "",
      icon: LucideUserRound.icon
    },
  ];
}
