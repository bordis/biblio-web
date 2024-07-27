import { Routes } from '@angular/router';
import { LoginComponent } from './site/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {
        path : '', component: LandingPageComponent, pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    }, 
];
