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

@Component({
  imports: [
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
