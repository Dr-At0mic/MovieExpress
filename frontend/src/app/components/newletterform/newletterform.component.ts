import { Component, OnInit } from '@angular/core';
import { StepsComponent } from '../steps/steps.component';
import { LandingNaVBarComponent } from '../landing-na-vbar/landing-na-vbar.component';
@Component({
  selector: 'app-newletterform',
  standalone: true,
  imports: [StepsComponent,LandingNaVBarComponent],
  templateUrl: './newletterform.component.html',
  styleUrl: './newletterform.component.scss'
})
export class NewletterformComponent{
  backgroundImage: string = `../../assets/newletterbakcground.jpg`;
  isvlaid: boolean=true;

}
