import { Component, ViewChild, computed } from "@angular/core";
import { Button } from "../../../basic/button/button";

@Component({
    selector: `app-nav`,
    template: `
        <nav>
            <ul>
                @for (list of navList; track list.id) {
                    <li>
                        <a href="{{list.href}}">{{list.name}}</a>
                    </li>
                }
                <li>
                    <app-button radius="10px">Get Started</app-button>
                </li>
            </ul>
        </nav>
    `,
    styleUrl: `./nav.css`,
    imports: [Button]
})
export class Nav {
    readonly navList = [
        {
            id: 0,
            name: "Features",
            href: ""
        },
        {
            id: 1,
            name: "Resources",
            href: ""
        },
        {
            id: 2,
            name: "Log In",
            href: "./login"
        }
    ];
}