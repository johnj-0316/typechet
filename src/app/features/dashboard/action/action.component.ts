import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon, LucideIconData } from '@lucide/angular';

@Component({
    imports: [RouterLink, LucideDynamicIcon],
    selector: 'tc-action',
    styleUrl: './action.component.css',
    templateUrl: './action.component.html',
})
export class ActionComponent {
    readonly label = input.required<string>();
    readonly icon = input.required<LucideIconData>();
    readonly action = input.required<() => void>();
    readonly link = input.required<string>();
}
