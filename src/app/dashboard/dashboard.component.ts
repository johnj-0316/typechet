import { Component, inject, signal } from '@angular/core';
import { LucideUsersRound, LucidePalette, LucideUserRound } from '@lucide/angular';

import { NavComponent } from '../nav/nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavItem } from '../nav/nav.type';
import { ProfileService } from '../profile.service';
import { Observable } from 'rxjs';
import { Tables } from '../../db/database.types';

@Component({
  imports: [SidebarComponent, NavComponent],
  selector: 'tc-dashboard',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  userProfile = inject(ProfileService);
  user = signal<string | null>("");
  username!: Observable<{message: string, user:Tables<"user_profile">}> | undefined;
  dashboardItems: NavItem[] = [
    {
      label: "Feedback",
      kind: "link",
      path: ""
    },
    {
      label: "Friends",
      kind: "button",
      action: "",
      icon: LucideUsersRound.icon
    },
    {
      label: "Design",
      kind: "button",
      action: "",
      icon: LucidePalette.icon
    },
    {
      label: "Account Details",
      kind: "button",
      action: "",
      icon: LucideUserRound.icon
    },
  ];

  constructor() {
    const profileObservable = this.userProfile.getUserProfile();
    profileObservable?.subscribe({
      next: res => {
        this.user.set(res.user.name);
      },
      error: res => {
        console.log(res);
      }
    })
    // effect(() => {
    //   this.username = this.userProfile.getUserProfile();
    // });
  }
}
