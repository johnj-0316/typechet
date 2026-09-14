import { Component, input } from "@angular/core";

@Component({
    selector: `app-button`,
    template: `
        <button [style.borderRadius]="radius()">
            <ng-content></ng-content>
        </button>
    `,
    styleUrl: `./button.css`
})
export class Button {
    readonly radius = input<string>();
}