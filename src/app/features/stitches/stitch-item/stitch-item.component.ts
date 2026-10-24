import { Component, computed, input } from '@angular/core';
import { LucidePin } from '@lucide/angular';

@Component({
    imports: [LucidePin],
    selector: 'tc-stitch-item',
    styleUrl: './stitch-item.component.css',
    templateUrl: './stitch-item.component.html',
})
export class StitchItemComponent {
    readonly shorthand = input.required<string>();
    readonly name = input.required<string>();
    readonly origin = input.required<string | null>();
    readonly custom = input.required<boolean>();
    readonly customStyle = computed(() =>
        this.custom() ? 'stitch-shorthand invert' : 'stitch-shorthand',
    );
}
