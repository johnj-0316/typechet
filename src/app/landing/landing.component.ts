import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  imports: [HeroComponent, NavComponent],
  selector: 'tc-landing',
  styleUrl: './landing.component.css',
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
