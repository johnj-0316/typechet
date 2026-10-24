import { Component, input } from '@angular/core';
import { LucideX } from '@lucide/angular';

@Component({
    imports: [LucideX],
    selector: 'tc-modal',
    styleUrl: './modal.component.css',
    templateUrl: './modal.component.html',
})
export class ModalComponent {
    buttonText = input.required<string | null>();
}
