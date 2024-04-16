import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carouselslide',
  standalone: true,
  imports: [],
  templateUrl: './carouselslide.component.html',
  styleUrl: './carouselslide.component.scss'
})
export class CarouselslideComponent{
  @Input() data: any ;
}
