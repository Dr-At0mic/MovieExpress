import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
interface MovieList{
  id:number;
  imageUrl:string;
}

@Component({
  selector: 'app-newtothisweek',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './newtothisweek.component.html',
  styleUrl: './newtothisweek.component.scss',
})
export class NewtothisweekComponent{
  title: string = "New to this Week"
  movieList:MovieList[] = [
    {
      id: 1,
      imageUrl:"../../../assets/AvengersPoster.jpg"
    },    {
      id: 2,
      imageUrl:"../../../assets/INCEPTION.webp"
    },    {
      id: 3,
      imageUrl:"../../../assets/joker2.webp"
    },    {
      id: 4,
      imageUrl:"../../../assets/MCDDUPA_WB040.webp"
    },    {
      id: 5,
      imageUrl:"../../../assets/openheimer.jpeg"
    },    {
      id: 6,
      imageUrl:"../../../assets/Pushpa-2.jpg"
    },    {
      id: 7,
      imageUrl:"../../../assets/zByhtBvX99ZiCQhac1sh9d9r6nb-ms-dmzggtivje.jpg"
    },    {
      id: 8,
      imageUrl:"../../../assets/guardianofgalaxyvol3.jpg"
    },    {
      id: 9,
      imageUrl:"../../../assets/darkknight.webp"
    },    {
      id: 10,
      imageUrl:"../../../assets/fastandfurious9.jpg"
    }
  ]
} 
