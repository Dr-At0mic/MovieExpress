import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent{
}
