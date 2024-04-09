import { NgStyle } from '@angular/common';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { CaptchaResponse } from '../../models/Response.service';
import { AuthenticationService } from '../../services/authentication.service';
import { COOKIE_OPTIONS, COOKIE_WRITER, CookieOptionsProvider, CookieService, CookieWriterService } from 'ngx-cookie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [NgStyle],
  providers:[CookieService,CookieOptionsProvider,{provide:COOKIE_OPTIONS,useValue:{}},{provide:COOKIE_WRITER,useClass:CookieWriterService}],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent implements OnInit, AfterContentInit, OnDestroy {
  @Output() verificationMessageEvent = new EventEmitter<string>();
  Message: string = "";
  intervalId: any = '';
  captchaUrl: string = '';
  captchaId: string = '';
  captchaText: string ="";
  password: string = "";
  emailId: string = "";
  captchaResponse: CaptchaResponse = new CaptchaResponse();
  constructor(private authservice: AuthenticationService,private cookie:CookieService,private router: Router) {
    if(this.cookie.hasKey("refreshToken"))
    this.router.navigate(["/dashboard"],{replaceUrl: true})
  }
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
    if(response.isStatus()){
      this.Message = "";
      this.sendVerificationMessage(response);
    }
    else
      this.Message = response.getMessage();
  }
  async FetchCaptcha() {
    const res = await this.authservice.getCaptcha();
    this.captchaResponse = await this.authservice.convertToCaptchaResponse(res);
    this.captchaUrl = this.captchaResponse.getCaptchaUrl();
    this.captchaId = this.captchaResponse.getCaptchaId();
  }
  sendVerificationMessage(value : any){
    this.verificationMessageEvent.emit(value);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
