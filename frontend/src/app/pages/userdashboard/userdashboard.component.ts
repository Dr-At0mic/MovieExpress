import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/shared/navigation-bar/navigation-bar.component';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';
import { NewtothisweekComponent } from '../../components/newtothisweek/newtothisweek.component';
import { TrendingnowComponent } from '../../components/trendingnow/trendingnow.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [NavigationBarComponent,HeroCarouselComponent,NewtothisweekComponent,TrendingnowComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent {

}
