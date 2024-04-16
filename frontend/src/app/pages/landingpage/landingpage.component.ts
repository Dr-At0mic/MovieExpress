import { Component } from '@angular/core';
import { NewletterformComponent } from '../../components/newletterform/newletterform.component';
import { LandingfooterComponent } from '../../components/landingfooter/landingfooter.component';
import {
  COOKIE_OPTIONS,
  COOKIE_WRITER,
  CookieOptionsProvider,
  CookieService,
  CookieWriterService,
} from 'ngx-cookie';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [NewletterformComponent, LandingfooterComponent],
  providers: [
    CookieService,
    CookieOptionsProvider,
    { provide: COOKIE_OPTIONS, useValue: {} },
    { provide: COOKIE_WRITER, useClass: CookieWriterService },
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {
  accessToken: string = "";
  refreshToken: string ="";
  constructor(
    private cookie: CookieService,
    private router: Router,
    private validationService: ValidationService,
    private authService: AuthenticationService
  ) {
    if (this.cookie.hasKey('accessToken')) {
      this.accessToken = this.cookie.get('accessToken')!;
      if (this.accessToken && validationService.TokenValidator(this.accessToken))
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      if(this.cookie.hasKey("refreshToken")){
        this.refreshToken = this.cookie.get("refreshToken")!;
        if(this.refreshToken&&validationService.TokenValidator(this.refreshToken))
          authService.refreshToken(this.refreshToken);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
    } else {
       authService.createTempuser();
    }
  }
}
