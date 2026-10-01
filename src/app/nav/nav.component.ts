import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from './nav.type';

@Component({
  imports: [RouterLink],
  selector: 'tc-nav',
  styleUrl: './nav.component.css',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  mode = input.required<string>();
  landingItems: NavItem[] = [
    {
      label: "About",
      kind: "link",
      path: ""
    },
    {
      label: "Features",
      kind: "link",
      path: ""
    },
    {
      label: "Sign In",
      kind: "link",
      path: ""
    },
    {
      label: "Get Started",
      kind: "link",
      path: "",
      class: "get-started button-pill"
    }
  ];

  dashboardItems: NavItem[] = [
    
  ]
}
