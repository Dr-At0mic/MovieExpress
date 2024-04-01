import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core'; 
import { lucideLogIn } from '@ng-icons/lucide';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-landing-na-vbar',
  standalone: true,
  imports: [NgIconComponent,RouterLink,RouterLinkActive,RouterOutlet],
  viewProviders:[provideIcons({lucideLogIn})],
  templateUrl: './landing-na-vbar.component.html',
  styleUrl: './landing-na-vbar.component.scss'
})
export class LandingNaVBarComponent {

}
