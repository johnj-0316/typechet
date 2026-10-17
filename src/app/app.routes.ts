import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { SignupComponent } from './features/users/signup/signup.component';
import { SigninComponent } from './features/users/signin/signin.component';
import { authGuard, guestGuard } from './core/auth/auth-guard';
import { PatternsComponent } from './features/patterns/patterns.component';
import { TrackersComponent } from './features/trackers/trackers.component';
import { StitchesComponent } from './features/stitches/stitches.component';
import { InventoryComponent } from './features/inventory/inventory.component';
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
                component: PatternsComponent,
            },
            {
                path: 'trackers',
                component: TrackersComponent,
            },
            {
                path: 'stitches',
                component: StitchesComponent,
            },
            {
                path: 'inventory',
                component: InventoryComponent,
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
        component: TestpageComponent
    }
];
