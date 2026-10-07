import { Component } from '@angular/core';
import { PatternItemComponent } from '../pattern-item/pattern-item.component';

@Component({
  imports: [PatternItemComponent],
  selector: 'tc-testpage',
  styleUrl: './testpage.component.css',
  templateUrl: './testpage.component.html',
})
export class TestpageComponent {}
