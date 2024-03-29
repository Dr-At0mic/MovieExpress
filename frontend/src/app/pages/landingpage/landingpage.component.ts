import { Component } from '@angular/core';
import { NewletterformComponent } from '../../components/newletterform/newletterform.component';
import { LandingfooterComponent } from '../../components/landingfooter/landingfooter.component';


@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [NewletterformComponent,LandingfooterComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
