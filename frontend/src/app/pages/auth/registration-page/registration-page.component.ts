import { Component } from '@angular/core';
import { LandingNaVBarComponent } from '../../../components/landing-na-vbar/landing-na-vbar.component';
import { LandingfooterComponent } from '../../../components/landingfooter/landingfooter.component';
import { StepsComponent } from '../../../components/steps/steps.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [LandingNaVBarComponent,LandingfooterComponent,StepsComponent],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

}
