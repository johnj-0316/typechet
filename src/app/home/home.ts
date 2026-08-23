import {Component} from "@angular/core"

@Component({
    selector: "app-home",
    template: `
        @for (msg of msgs; track msg.id) {
            <h1>{{msg.txt}}</h1>
        }
    `
})
export class Home {
    readonly msgs = [
        {id: 0, txt: "hi"},
        {id: 1, txt: "hello"}
    ]
}