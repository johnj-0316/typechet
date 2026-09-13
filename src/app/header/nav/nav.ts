import { Component } from "@angular/core";

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
            </ul>
        </nav>
    `,
    styleUrl: `./nav.css`
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