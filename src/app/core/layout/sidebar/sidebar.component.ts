import { Component } from '@angular/core';
import { 
  LucideLayoutDashboard, 
  LucideBookDashed,
  LucideCompass,
  LucideSpool,
  LucideShelvingUnit,
  LucideMusic,
  LucideSettings,
} from '@lucide/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideLayoutDashboard, 
    LucideBookDashed, 
    LucideCompass,
    LucideSpool,
    LucideShelvingUnit,
    LucideMusic,
    LucideSettings
  ],
  selector: 'tc-sidebar',
  styleUrl: './sidebar.component.css',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
