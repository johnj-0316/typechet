import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { NavComponent } from '../nav/nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { dashboardItems } from './dashboard-nav.items';
import { NavItem } from '../nav/nav.type';

@Component({
    imports: [NavComponent, RouterOutlet, SidebarComponent],
    selector: 'tc-dashboard-layout',
    styleUrl: '../dashboard/dashboard.component.css',
    templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
    readonly router = inject(Router);
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
        if (!localStorage.getItem("accessToken"))
            return;

        localStorage.removeItem("accessToken");
        this.router.navigate(["/sign-in"]);
    }
}
