import { Component, Inject, Injectable, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ErrorCatcher } from '../../../models/ErrorCatcher.service';
import { Response } from '../../../models/Response.service';
import { CookieService ,CookieOptionsProvider, COOKIE_OPTIONS,COOKIE_WRITER, CookieWriterService} from 'ngx-cookie';


@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [RouterLink],
  providers: [CookieService,CookieOptionsProvider, { provide: COOKIE_OPTIONS, useValue: {} },{provide: COOKIE_WRITER, useClass: CookieWriterService}],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
  export class LoginpageComponent {
    constructor(private authService: AuthenticationService,private router: Router,private cookie: CookieService) { 
      if(this.cookie.hasKey("accessToken")){
        this.router.navigate(["/home"],{replaceUrl: true})
      }
    }
    errorMessage: any;
    emailInput: string = "";
    passwordInput: string = "";

    handleEmail(val: string) {
      this.emailInput = val;
    }
    handlePassword(val: string) {
      this.passwordInput = val;
    }
    
    async handleSubmit() {
      const data :LoginRequestData = {
        emailId: this.emailInput,
        password: this.passwordInput,
      }
        try {
          const response: ErrorCatcher = await this.authService.verifyUser(data);
          this.errorMessage = response.getMessage()
          if(response.getData()){
            const res: Response = this.authService.convertToResponse(response.getData());
            this.errorMessage=res.getMessage();
            if(res.isStatus()){
              this.router.navigate(["/home"],{replaceUrl: true});
            }
          }
        } catch (error) {
          const  err :ErrorCatcher = this.authService.convertToErrorCatcher(error);
          this.errorMessage = err.getMessage();
        } 
  }
}
