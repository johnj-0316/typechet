import { Component } from '@angular/core';
import { 
  LucideLayoutDashboard, 
  LucideNotebook,
  LucideSpotlight,
  LucideMusic,
  LucideSettings
} from '@lucide/angular';

@Component({
  imports: [
    LucideLayoutDashboard, 
    LucideNotebook, 
    LucideSpotlight,
    LucideMusic,
    LucideSettings
  ],
  selector: 'tc-sidebar',
  styleUrl: './sidebar.component.css',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
