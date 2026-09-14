import { Component } from "@angular/core";
import { Nav } from "./nav/nav";

@Component({
    imports: [Nav],
    selector: `app-header`,
    template: `
        <header>
            <h1>typechet</h1>
            <app-nav />
        </header>
    `,
    styleUrl: `./header.css`
})
export class Header {}