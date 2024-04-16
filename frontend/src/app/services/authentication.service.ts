import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemConstants } from '../../utils/SystemConstants';
import { ApiMethodsService } from '../apiservice/api-methods.service';
import { ErrorCatcher } from '../models/ErrorCatcher.service';
import { CaptchaResponse, Response } from '../models/Response.service';
import { __values } from 'tslib';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class AuthenticationService {


  convertToResponse(response: any): Response {
    const res: Response = new Response();
    res.setData(response.data);
    res.setStatus(response.status);
    res.setMessage(response.message);
    res.setStatusCode(response.statusCode);
    res.setHttpStatus(response.httpStatus);
    return res;
  }
  constructor(private api: ApiMethodsService) {}
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  illegalCharRegex = /[ \.\|\+\=\`~\?<>\[\]\{\}\"\':;^]/;

  emailValidator(emailId: string): boolean {
    return this.emailRegex.test(emailId.toString());
  }
  passwordValidator(password: string): boolean {
    return this.illegalCharRegex.test(password);
  }

  validateCredentials(emailId: string, password: string): ErrorCatcher {
    const errorCatcher = new ErrorCatcher();
    if (!emailId || !password) {
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
    const errorCatcher: ErrorCatcher = new ErrorCatcher();
    errorCatcher.setStatus(error.status);
    errorCatcher.setMessage(error.message);
    errorCatcher.setErrorCode(error.errorCode);
    errorCatcher.setStatusCode(error.statusCode);
    errorCatcher.setStatusName(error.statusName);
    return errorCatcher;
  }
  async verifyUser(data: LoginRequestData): Promise<any> {
    const validate: ErrorCatcher = this.validateCredentials(
      data.emailId,
      data.password
    );
    if (!validate.isStatus()) return validate;
    return new Promise<ErrorCatcher>((resolve, reject) => {
      this.api.postMethod(SystemConstants.LOGIN_URL, data).subscribe({
        next: (value) => {
          const errorCatcher = new ErrorCatcher();
          errorCatcher.setData(value);
          resolve(errorCatcher);
        },
        error: (err) => {
          reject(err.error);
        },
        complete: () => {
          console.log('completed');
        },
      });
    });
  }
  async getCaptcha(): Promise<any> {
    return new Promise<CaptchaResponse>((resolve, reject) => {
      this.api.getCaptcha(SystemConstants.GET_CAPTCHA_URL).subscribe({
        next(response) {
          resolve(response);
        },
        error(error) {
          console.error('Error fetching captcha:', error);
        },
        complete() {
          console.log('Completed');
        },
      });
    });
  }
  async convertToCaptchaResponse(res: any): Promise<CaptchaResponse> {
    const response: CaptchaResponse = new CaptchaResponse();
    const header: HttpHeaders = res.headers;
    const blobBody: Blob = res.body;
    // response.setCaptchaUrl(URL.createObjectURL(blobBody));
    response.setCaptchaUrl(await this.blobToDataURL(blobBody));
    response.setCaptchaId(header.get('captchaId') || '');
    return response;
  }

  async blobToDataURL(blob: Blob) {
    if (typeof FileReader !== 'undefined') {
      // FileReader is defined, use it to convert blob to data URL
      // const base64String = await blobToBase64String(blob);
      // return `data:${blob.type};base64,${base64String}`;
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    }
    return '';
  }
  async fetchAndRenderCaptchaOnServer() {
    try {
      const captchaResponse = await this.getCaptcha();
      const blob = captchaResponse.body;
      return await this.blobToDataURL(blob);
    } catch (error) {
      console.error('Error fetching captcha during SSR:', error);
      return '';
    }
  }
  async createNewUser(
    captchaId: string,
    captchaText: string,
    emailId: string,
    password: string
  ): Promise<ErrorCatcher> {
    const errorcather: ErrorCatcher = this.validateCredentials(
      emailId,
      password
    );
    if (!errorcather.isStatus()) return errorcather;
    if (!captchaText) {
      errorcather.setMessage('Captcha is required');
      return errorcather;
    }
    const captData = {
      captchaId: captchaId,
      captchaText: captchaText,
    };
    const userDto = {
      emailId: emailId,
      password: password
    };
    try {
      const serverresponse = await this.validateCaptcha(captData);
      const  response =this.convertToErrorCatcher(serverresponse.getData());
      const createNewuserResponse = await this.sendNewuser(userDto);
      const newuserResponse = this.convertToErrorCatcher(
        createNewuserResponse.getData()
      );
      return newuserResponse;
    } catch (error: any) {
      const response = this.convertToErrorCatcher(error.getData());
      return response;
    }
  }
  async sendNewuser(data: any): Promise<any> {
    return new Promise<ErrorCatcher>((resolve, reject) => {
      const errorCatcher: ErrorCatcher = new ErrorCatcher();
      this.api.postMethod(SystemConstants.CREATE_NEW_USER_URL, data).subscribe({
        next(value) {
          errorCatcher.setData(value);
          resolve(errorCatcher);
        },
        error(err) {
          errorCatcher.setData(err.error);
          reject(errorCatcher);
        },
        complete() {
          console.log('Verification Send to your account');
        },
      });
    });
  }
  async validateCaptcha(data: any): Promise<any> {
    return new Promise<ErrorCatcher>((resolve, reject) => {
      const errorCatcher: ErrorCatcher = new ErrorCatcher();
      this.api.postMethod(SystemConstants.VERIFY_CAPTCHA_URL, data).subscribe({
        next(value) {
          errorCatcher.setData(value);
          resolve(errorCatcher);
        },
        error(err) {
          errorCatcher.setData(err.error);
          reject(errorCatcher);
        },
        complete() {
          console.log('verifycaptcha completed');
        },
      });
    });
  }
  async verifyEmail(verificationToken: string) {
    const errorcatcher: ErrorCatcher = new ErrorCatcher();
    if(!verificationToken){
      errorcatcher.setMessage("invalid Token");
    }
    try {
      const serverresponse = await this.validateEmail(verificationToken);
      const response = this.convertToErrorCatcher(
        serverresponse.getData()
      );
      return response;
    } catch (error: any) {
      const response = this.convertToErrorCatcher(error.getData());
      return response;
    }
  }
  async validateEmail(verificationToken: string): Promise<ErrorCatcher> {
    const data = {
      "sessionAccessToken":verificationToken
    }
    return new Promise<ErrorCatcher>((resolve, reject) => {
      const errorCatcher: ErrorCatcher = new ErrorCatcher();
      this.api
        .postMethod(SystemConstants.VALIDATE_EMAIL_URL,data)
        .subscribe({
          next(value) {
            errorCatcher.setData(value);
            resolve(errorCatcher);
          },
          error(err) {
            errorCatcher.setData(err.error);
            reject(errorCatcher);
          },
          complete() {
            console.log('Verification Send to your account');
          },
        });
    });
  }
  async createTempuser()  {
    console.log("in")
     const response: Observable<any> = this.api.getMethodXParam(SystemConstants.GET_tEMP_USER);
     console.log(response);
  }
  refreshToken(refreshToken: string) {
    //create a end point to refreshToken
  }
}
