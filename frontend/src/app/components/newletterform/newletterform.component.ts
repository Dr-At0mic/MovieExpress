import { Component, OnInit } from '@angular/core';
import { StepsComponent } from '../steps/steps.component';
import { LandingNaVBarComponent } from '../landing-na-vbar/landing-na-vbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-newletterform',
  standalone: true,
  imports: [StepsComponent,LandingNaVBarComponent],
  templateUrl: './newletterform.component.html',
  styleUrl: './newletterform.component.scss'
})
export class NewletterformComponent{
  constructor(private router: Router){}
  backgroundImage: string = `../../assets/newletterbakcground.jpg`;
  isvlaid: boolean=true;
  getStartedTrigger(){
    this.router.navigate(["signup"])
  }
}
