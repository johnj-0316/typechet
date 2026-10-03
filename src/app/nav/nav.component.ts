import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from './nav.type';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  imports: [RouterLink, LucideDynamicIcon],
  selector: 'tc-nav',
  styleUrl: './nav.component.css',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  mode = input.required<string>();
  data = input<NavItem[]>();
}
