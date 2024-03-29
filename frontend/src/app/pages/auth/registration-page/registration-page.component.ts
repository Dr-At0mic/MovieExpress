import { Component } from '@angular/core';
import { LandingNaVBarComponent } from '../../../components/landing-na-vbar/landing-na-vbar.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [LandingNaVBarComponent],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

}
