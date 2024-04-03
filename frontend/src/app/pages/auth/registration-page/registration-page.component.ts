import { Component, input } from '@angular/core';
import { LandingNaVBarComponent } from '../../../components/landing-na-vbar/landing-na-vbar.component';
import { LandingfooterComponent } from '../../../components/landingfooter/landingfooter.component';
import { StepsComponent } from '../../../components/steps/steps.component';
import { VerificationsendComponent } from '../../../components/verificationsend/verificationsend.component';
import { ErrorCatcher } from '../../../models/ErrorCatcher.service';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [LandingNaVBarComponent,LandingfooterComponent,StepsComponent,VerificationsendComponent],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  verificationMessage : ErrorCatcher = new ErrorCatcher();
  captureVerificationMessage(value : any){
    this.verificationMessage.setStatus(value.isStatus());
    this.verificationMessage.setMessage(value.getMessage());
  }
}
