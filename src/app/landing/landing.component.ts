import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { NavComponent } from '../nav/nav.component';
import { NavItem } from '../nav/nav.type';

@Component({
  imports: [HeroComponent, NavComponent],
  selector: 'tc-landing',
  styleUrl: './landing.component.css',
  templateUrl: './landing.component.html',
})
export class LandingComponent {
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
      path: "/sign-in"
    },
    {
      label: "Get Started",
      kind: "link",
      path: "/sign-up",
      class: "get-started"
    }
  ];
}
