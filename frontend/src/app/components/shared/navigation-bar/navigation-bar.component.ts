import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule,NgClass,NgIf],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  isOpen: boolean = false;
  style :string = "opacity-0 -translate-x-full";

  toggleMenu() {
    this.isOpen = !this.isOpen;
    if(!this.isOpen){
      this.style = "opacity-0 -translate-x-full";
    }
    else {
      this.style = "translate-x-0 opacity-100";
    }
  }
}
