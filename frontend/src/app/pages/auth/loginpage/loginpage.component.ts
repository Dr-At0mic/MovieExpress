import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ErrorCatcher } from '../../../models/ErrorCatcher.service';
import { Response } from '../../../models/Response.service';
RouterLink  
@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
  export class LoginpageComponent {
    constructor(private authService: AuthenticationService) { }

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
            console.log(res)
          }
        } catch (error) {
          const  err :ErrorCatcher = this.authService.convertToErrorCatcher(error);
          this.errorMessage = err.getMessage();
        }
       
    
  }
}
