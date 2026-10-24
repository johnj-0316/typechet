import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

import { ProfileService } from '../../services/profile.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { Profile } from '../../shared/types/api.types';

@Component({
    imports: [SearchComponent, FormField],
    selector: 'tc-dashboard',
    styleUrl: './dashboard.component.css',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    private readonly profileService = inject(ProfileService);
    readonly user = signal<Profile | null>(null);
    private readonly nameModel = signal({
        displayName: '',
    });
    private readonly nameForm = form(this.nameModel);

    constructor() {
        this.profileService.getUserProfile().subscribe({
            next: (response) => {
                this.applyProfile(response.user);
            },
        });
    }

    editDisplayName() {
        this.profileService.editUserProfile({
            name: this.user()?.name,
            displayName: this.nameModel().displayName,
        })
        .subscribe({
            next: (response) => {
                this.applyProfile(response.user);
            },
            error: (response) => {
                alert(JSON.stringify(response));
            },
        });
    }

    private applyProfile(user: Profile) {
        this.user.set(user);
        this.nameModel.set({
            displayName: user.displayName || user.name || '',
        });
    }
}
