import { BootstrapOptions, Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';
import { ValidateCredentialsResponseService } from '../models/validate-credentials-response.service';
import { SystemConstants } from '../../utils/SystemConstants';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private apiservice: ApiService) { }
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  illegalCharRegex = /[ \.\|\+\=\`~\?<>\[\]\{\}\"\':;^]/;

  emailValidator(emailId: string): boolean { return this.emailRegex.test(emailId.toString());}
  passwordValidator(password: string): boolean { return this.illegalCharRegex.test(password);}

  async validateCredentials(emailId: string, password: string) :Promise<ValidateCredentialsResponseService>{

    if (!emailId || !password || " " == emailId) 
      return new ValidateCredentialsResponseService("emailId or password cannot be undefined!!!");
    else if (!this.emailValidator(emailId))
      return new ValidateCredentialsResponseService("Enter a Valid Email");
    else if (this.passwordValidator(password)) 
      return new ValidateCredentialsResponseService("password contain illegal characters");
    else if (password.length < 8)
      return new ValidateCredentialsResponseService("password cannot have alleast 8 charachters");
    return this.verifyUser({"emailId":emailId,"password": password, "ipAddress": "12341243234"})
  }

  async verifyUser(data :LoginRequestData): Promise<ValidateCredentialsResponseService>{
   const res: any=  await this.apiservice.Post(SystemConstants.LOGIN_URL,data)
  console.log(res)
    return new ValidateCredentialsResponseService("sucess");
  }

  
}
