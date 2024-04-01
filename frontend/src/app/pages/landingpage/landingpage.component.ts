import { Component } from '@angular/core';
import { NewletterformComponent } from '../../components/newletterform/newletterform.component';
import { LandingfooterComponent } from '../../components/landingfooter/landingfooter.component';
import { COOKIE_OPTIONS, COOKIE_WRITER, CookieOptionsProvider, CookieService, CookieWriterService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [NewletterformComponent,LandingfooterComponent],
  providers:[CookieService,CookieOptionsProvider,{provide: COOKIE_OPTIONS, useValue:{}},{provide: COOKIE_WRITER,useClass: CookieWriterService}],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  constructor(private cookie:CookieService,private router: Router){
    if(this.cookie.hasKey("accessToken")){
      this.router.navigate(["/home"],{replaceUrl: true})
    }
  }
}
