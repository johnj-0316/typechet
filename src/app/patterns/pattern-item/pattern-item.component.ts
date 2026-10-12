import { Component, input } from '@angular/core';
import { LucideEllipsisVertical } from '@lucide/angular';

@Component({
  imports: [LucideEllipsisVertical],
  selector: 'tc-pattern-item',
  styleUrl: './pattern-item.component.css',
  templateUrl: './pattern-item.component.html',
})
export class PatternItemComponent {
  readonly title = input.required<string>();
  readonly date = input.required<string | null>();
}
