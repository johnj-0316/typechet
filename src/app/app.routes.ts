import { Routes } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { map } from 'rxjs';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/landing/landing.component';
import { SignupComponent } from './features/users/signup/signup.component';
import { SigninComponent } from './features/users/signin/signin.component';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';
import { TestpageComponent } from './features/testpage/testpage.component';

import { PatternsService } from './services/patterns.service';

import { authGuard, guestGuard } from './core/auth/auth-guard';

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
                path: 'patterns/:id',
                loadComponent: () =>
                    import('./features/patterns/pattern/pattern.component').then(
                        (m) => m.PatternComponent,
                    ),
                resources: (ctx) => {
                    const patternService = inject(PatternsService);

                    return {
                        pattern: rxResource({
                            params: () => ctx.params()['id'],
                            stream: ({ params: id }) =>
                                patternService
                                    .getPattern(id)
                                    .pipe(map((response) => response.data)),
                        }),
                    };
                },
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
