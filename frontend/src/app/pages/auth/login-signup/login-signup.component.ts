import { Component, OnInit} from '@angular/core';
import { ValidateCredentialsResponseService } from '../../../models/validate-credentials-response.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent{
  constructor( private authService: AuthenticationService){ }
  errorMessage :string = "";
  emailInput: string ="";
  passwordInput: string ="";
  SignInMode: boolean = true;
  buttonSignin :string = "border-2 py-1 hover:bg-gray-700";
  buttonSignup: string = "bg-black py-2 hover:bg-gray-800";
  handleEmail(val: string){
    this.emailInput = val;
  }
  handlePassword(val: string){
    this.passwordInput = val;
  }
  switchForm(val: boolean){
    this.SignInMode=val;
    if(val==true){
      this.buttonSignin="border-2 py-1 hover:bg-gray-700";
      this.buttonSignup="bg-black py-2 hover:bg-gray-800";
    }
    else{
      this.buttonSignin="bg-black py-2 hover:bg-gray-800";
      this.buttonSignup="border-2 py-1 hover:bg-gray-700";
    }
  }
  async handleSubmit(){
    const validationResponse: ValidateCredentialsResponseService = await this.authService.validateCredentials(this.emailInput,this.passwordInput);
      this.errorMessage = validationResponse.message

  }
}
