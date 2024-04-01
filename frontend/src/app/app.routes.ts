import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginpageComponent } from './pages/auth/loginpage/loginpage.component';
import { RegistrationPageComponent } from './pages/auth/registration-page/registration-page.component';

export const routes: Routes = [
    {path:"", component: LandingpageComponent},
    {path:"home", component:HomePageComponent},
    {path:"signin", component: LoginpageComponent},
    {path:"signup", component: RegistrationPageComponent}
];
