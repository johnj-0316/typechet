import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard, guestGuard } from './auth-guard';

/*
{
    path: "",
    component: ComponentName
}
*/
export const routes: Routes = [
    {
        path: "",
        component: LandingComponent,
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: "sign-up",
        component: SignupComponent,
        canActivate: [guestGuard]
    },
    {
        path: "sign-in",
        component: SigninComponent,
        canActivate: [guestGuard]
    }
];
