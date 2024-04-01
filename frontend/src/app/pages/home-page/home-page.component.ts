import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/shared/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
