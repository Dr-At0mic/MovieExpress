import { NgStyle, isPlatformServer } from '@angular/common';
import { AfterContentInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CaptchaResponse } from '../../models/Response.service';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent implements OnInit,OnDestroy,AfterContentInit{
  intervalId: any ="";
  captchaText: string ="";
  captchaId: string =""
  capthaurl2: any;
  captchaResponse : CaptchaResponse = new CaptchaResponse();
  constructor(private authservice :AuthenticationService ,@Inject(PLATFORM_ID) private platformId: Object,){
  }
  async ngAfterContentInit(): Promise<void> {
    this.intervalId = setInterval(async ()=>{
      await this.FetchCaptcha();
    },5000);
      
  }

  async ngOnInit(): Promise<void> {
   
    if (isPlatformServer(this.platformId)) {
     const  captchaUrl: any =  await this.authservice.fetchAndRenderCaptchaOnServer();
      console.log(captchaUrl)
    }
    else{
    }
  }

  handleCaptcha(capthca:string){
    this.captchaText= capthca;
  }

  async FetchCaptcha(){
     const res = await this.authservice.getCaptcha();
     this.captchaResponse = await  this.authservice.convertToCaptchaResponse(res);
     this.capthaurl2 =  this.captchaResponse.getCaptchaUrl();
  }

  ngOnDestroy(): void {
    
  }
}
