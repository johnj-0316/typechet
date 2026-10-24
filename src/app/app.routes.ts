import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { SignupComponent } from './features/users/signup/signup.component';
import { SigninComponent } from './features/users/signin/signin.component';
import { authGuard, guestGuard } from './core/auth/auth-guard';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';
import { TestpageComponent } from './features/testpage/testpage.component';

/*
{
    path: "",
    component: ComponentName
}
*/
export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'patterns',
                loadComponent: () =>
                    import('./features/patterns/patterns.component').then(
                        (m) => m.PatternsComponent,
                    ),
            },
            {
                path: 'trackers',
                loadComponent: () =>
                    import('./features/trackers/trackers.component').then(
                        (m) => m.TrackersComponent,
                    ),
            },
            {
                path: 'stitches',
                loadComponent: () =>
                    import('./features/stitches/stitches.component').then(
                        (m) => m.StitchesComponent,
                    ),
            },
            {
                path: 'inventory',
                loadComponent: () =>
                    import('./features/inventory/inventory.component').then(
                        (m) => m.InventoryComponent,
                    ),
            },
        ],
    },
    {
        path: 'sign-up',
        component: SignupComponent,
        canActivate: [guestGuard],
    },
    {
        path: 'sign-in',
        component: SigninComponent,
        canActivate: [guestGuard],
    },
    {
        path: 'testing',
        component: TestpageComponent,
    },
];
