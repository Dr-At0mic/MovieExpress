import { Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:"login", component:SigninComponent},
    {path:"**", component:PageNotFoundComponent}
];
