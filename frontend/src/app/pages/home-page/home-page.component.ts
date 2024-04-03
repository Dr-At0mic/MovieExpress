import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/shared/navigation-bar/navigation-bar.component';
import { EmailVerificationPageComponent } from '../auth/email-verification-page/email-verification-page.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavigationBarComponent,EmailVerificationPageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
