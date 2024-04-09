import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/shared/navigation-bar/navigation-bar.component';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [NavigationBarComponent,HeroCarouselComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent {

}
