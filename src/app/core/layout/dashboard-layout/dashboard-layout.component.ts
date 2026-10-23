import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { NavComponent } from '../nav/nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { dashboardItems } from './dashboard-nav.items';
import { NavItem } from '../nav/nav.type';
import { UserService } from '../../../services/user.service';

@Component({
    imports: [NavComponent, RouterOutlet, SidebarComponent],
    selector: 'tc-dashboard-layout',
    styleUrl: './dashboard-layout.component.css',
    templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
    readonly router = inject(Router);
    readonly userService = inject(UserService);
    readonly dashboardItems: NavItem[] = dashboardItems.map(item => {
        if (item.kind === "button" && item.label === "Account Details") {
            return {
                ...item,
                action: () => this.logOut(),
            };
        }

        return item;
    });

    logOut() {
        this.userService.signout().subscribe({
            next: (res) => {
                this.router.navigate(["/sign-in"]);
            },
            error: res => {
                alert(res);
            }
        })
    }
}
