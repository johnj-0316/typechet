import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  template: '<h1>Hi</h1><router-outlet />',
})
export class App {
  protected readonly title = signal('crochet-counter');
}
