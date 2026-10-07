import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard, guestGuard } from './auth-guard';
import { PatternsComponent } from './patterns/patterns.component';
import { TrackersComponent } from './trackers/trackers.component';
import { StitchesComponent } from './stitches/stitches.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { TestpageComponent } from './testpage/testpage.component';

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
