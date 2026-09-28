import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';

@Component({
  imports: [HeroComponent],
  selector: 'tc-landing',
  styleUrl: './landing.component.css',
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
