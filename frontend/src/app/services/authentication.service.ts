import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiMethodsService } from '../apiservice/api-methods.service';
import { ErrorCatcher } from '../models/ErrorCatcher.service';
import { Response } from '../models/Response.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  convertToResponse(response: any): Response {
     const res: Response =new Response();
     res.setData(response.data);
     res.setStatus(response.status);
     res.setMessage(response.message);
     res.setStatusCode(response.statusCode);
     res.setHttpStatus(response.httpStatus);
     return res;
  }
  constructor(private httpClient: HttpClient, private api: ApiMethodsService) {}
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  illegalCharRegex = /[ \.\|\+\=\`~\?<>\[\]\{\}\"\':;^]/;

  emailValidator(emailId: string): boolean {
    return this.emailRegex.test(emailId.toString());
  }
  passwordValidator(password: string): boolean {
    return this.illegalCharRegex.test(password);
  }

   validateCredentials(emailId: string, password: string): ErrorCatcher {
    const errorCatcher = new ErrorCatcher(false,0,"",0,"",null);
    if (!emailId || !password ) {
      errorCatcher.setMessage('All fields are Mandatory');
      return errorCatcher;
    } else if (!this.emailValidator(emailId)) {
      errorCatcher.setMessage('Please enter a Valid Email');
      return errorCatcher;
    } else if (this.passwordValidator(password)) {
      errorCatcher.setMessage('Password contain illegal Characters');
      return errorCatcher;
    } else if (password.length < 8) {
      errorCatcher.setMessage('Password Shold be Atleast 8 Characters');
      return errorCatcher;
      //both email and password  cannot be same should be added
    }
    errorCatcher.setStatus(true);
    return errorCatcher;
  }
  convertToErrorCatcher(error: any): ErrorCatcher {
    const errorCatcher :ErrorCatcher= new ErrorCatcher(false,0,"",0,"",null);
    errorCatcher.setMessage(error.message);
    errorCatcher.setErrorCode(error.errorCode);
    errorCatcher.setStatusCode(error.statusCode);
    errorCatcher.setStatusName(error.statusName);
    return errorCatcher
  }
  async verifyUser(data: LoginRequestData): Promise<ErrorCatcher> {
    const validate: ErrorCatcher = this.validateCredentials(
      data.emailId,
      data.password
    );
    if (!validate.isStatus()) return validate;
    return new Promise<ErrorCatcher>((resolve, reject) => {
      this.api.postMethod(data).subscribe({
        next: (value) => {
          const errorCatcher = new ErrorCatcher(false,0,"",0,"",value);
          resolve(errorCatcher);
        },
        error: (err) => {
          const errorCatcher = new ErrorCatcher(false,0,"",0,"",err);
          reject(err.error);
        },
        complete: () => {
          console.log('completed');
        },
      });
    });
  }
}
