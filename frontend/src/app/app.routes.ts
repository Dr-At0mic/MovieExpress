import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginSignupComponent } from './pages/auth/login-signup/login-signup.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { RegistrationPageComponent } from './pages/auth/registration-page/registration-page.component';

export const routes: Routes = [
    {path:"", component: LandingpageComponent},
    {path:"home", component:HomePageComponent},
    {path:"signin", component: LoginSignupComponent},
    {path:"signup", component: RegistrationPageComponent}

];
