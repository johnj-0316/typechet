import { Component, inject, signal } from '@angular/core';

import { ProfileService } from '../../services/profile.service';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
  imports: [SearchComponent],
  selector: 'tc-dashboard',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly profileService = inject(ProfileService);

  readonly user = signal<string | null>('');

  constructor() {
    this.profileService.getUserProfile().subscribe({
      next: (response) => this.user.set(response.user.displayName || response.user.name),
    });
  }
}
