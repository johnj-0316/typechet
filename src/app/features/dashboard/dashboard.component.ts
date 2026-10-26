import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

import { ProfileService } from '../../services/profile.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { Profile } from '../../shared/types/api.types';
import { LucideIconData, LucideMapPinPlusInside, LucideSquareDashedPlus } from '@lucide/angular';
import { ActionComponent } from './action/action.component';

type ActionItem = {
    id: string;
    label: string;
    icon: LucideIconData;
    action: () => void;
    link: string;
};

@Component({
    imports: [SearchComponent, ActionComponent, FormField],
    selector: 'tc-dashboard',
    styleUrl: './dashboard.component.css',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    private readonly profileService = inject(ProfileService);
    private readonly nameModel = signal({
        displayName: '',
    });
    protected readonly nameForm = form(this.nameModel);
    readonly user = signal<Profile | null>(null);
    protected readonly actionItems: ActionItem[] = [
        {
            id: 'pattern',
            label: 'Create new pattern',
            icon: LucideSquareDashedPlus.icon,
            action: () => {},
            link: '/dashboard/patterns',
        },
        {
            id: 'tracker',
            label: 'Create new tracker',
            icon: LucideMapPinPlusInside.icon,
            action: () => {},
            link: '/dashboard/trackers',
        },
    ];

    constructor() {
        this.profileService.getUserProfile().subscribe({
            next: (response) => {
                this.applyProfile(response.user);
            },
        });
    }

    protected editDisplayName(): void {
        if (this.user()?.displayName === this.nameModel().displayName) return;

        this.profileService
            .editUserProfile({
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

    private applyProfile(user: Profile): void {
        this.user.set(user);
        this.nameModel.set({
            displayName: user.displayName || user.name || '',
        });
    }
}
