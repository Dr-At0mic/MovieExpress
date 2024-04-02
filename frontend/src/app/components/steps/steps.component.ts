import { NgStyle } from '@angular/common';
import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CaptchaResponse } from '../../models/Response.service';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent implements OnInit, AfterContentInit, OnDestroy {
  Message: string = "";
  intervalId: any = '';
  captchaUrl: string = '';
  captchaId: string = '';
  captchaText: string ="";
  password: string = "";
  emailId: string = "";
  captchaResponse: CaptchaResponse = new CaptchaResponse();
  constructor(private authservice: AuthenticationService) {}
  async ngAfterContentInit(): Promise<void> {
    this.intervalId = setInterval(async () => {
      URL.revokeObjectURL(this.captchaUrl);
      await this.FetchCaptcha();
    }, 60000);
  }

  async ngOnInit(): Promise<void> {
    this.FetchCaptcha();
  }
  handleEmail(value: string){
    this.emailId = value;
  }
  handlePassword(value: string) {
    this.password = value;
  }
  handleCaptcha(value: string) {
    this.captchaText = value;
  }
  async handleSubmit(){
    const response = await this.authservice.createNewUser(this.captchaId,this.captchaText,this.emailId,this.password)
    this.Message = response.getMessage();
    console.log(response);
  }
  async FetchCaptcha() {
    const res = await this.authservice.getCaptcha();
    this.captchaResponse = await this.authservice.convertToCaptchaResponse(res);
    this.captchaUrl = this.captchaResponse.getCaptchaUrl();
    this.captchaId = this.captchaResponse.getCaptchaId();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
