import { Component, inject, signal } from '@angular/core';

import { ProfileService } from '../profile.service';

@Component({
    imports: [],
    selector: 'tc-dashboard',
    styleUrl: './dashboard.component.css',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    userProfile = inject(ProfileService);
    user = signal<string | null>('');

    constructor() {
        const profileObservable = this.userProfile.getUserProfile();
        profileObservable?.subscribe({
            next: (res) => {
                this.user.set(res.user.name);
            },
            error: (res) => {
                console.log(res);
            },
        });
    }
}
