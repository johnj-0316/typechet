import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

/*
{
    path: "",
    component: ComponentName
}
*/
export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "sign-up",
        component: SignupComponent
    },
    {
        path: "sign-in",
        component: SigninComponent
    }
];
