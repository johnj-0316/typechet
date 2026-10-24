import { Component, input } from '@angular/core';

@Component({
    imports: [],
    selector: 'tc-line-progress',
    styleUrl: './line-progress.component.css',
    templateUrl: './line-progress.component.html',
})
export class LineProgressComponent {
    value = input<number>(80);
    max = input<number>(100);
    size = input<number>(50);
    strokeWidth = input<number>(20);
    showText = input<boolean>(false);
}
