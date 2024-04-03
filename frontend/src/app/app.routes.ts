import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginpageComponent } from './pages/auth/loginpage/loginpage.component';
import { RegistrationPageComponent } from './pages/auth/registration-page/registration-page.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { EmailVerificationPageComponent } from './pages/auth/email-verification-page/email-verification-page.component';

export const routes: Routes = [
    {path:"", component: LandingpageComponent},
    {path:"home", component:HomePageComponent},
    {path:"c2lnbmlu", component: LoginpageComponent},
    {path:"c2lnbnVw", component: RegistrationPageComponent},
    {path:"ZW1haWxWZXJpZmljYXRpb24/:dmVyaWZpY2F0aW9uVG9rZW4",component:EmailVerificationPageComponent},
    {path:"**", component: NotfoundpageComponent}
];
