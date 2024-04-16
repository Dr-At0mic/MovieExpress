import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CarouselslideComponent } from '../carouselslide/carouselslide.component';
interface content{
  id:number;
  imageUrl:string;
  title:string;
  titleTail:string;
  rating:number;
  description:string;
  color:string;
  btnBgColor:string;
  hoverBtnBgColor:string;
  activeBtnBgColor:string;
}
@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CarouselslideComponent],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class  HeroCarouselComponent {
  carouselSlideItem : content[] =[
    {
     id:1,
     imageUrl:"../../../assets/drstrange.jpg",
     title:"Dr Strange 2",
     titleTail:"The Multiverse of Maddness",
     rating:9,
     description:"Doctor Strange teams up with a mysterious teenage girl from his "+
     "dreams who can travel across multiverses, to battle multiple threats, including "+
     "other-universe versions of himself, which threaten to wipe out millions across the multiverse."+
    "They seek help from Wanda the Scarlet Witch, Wong and others.",
    color:"text-[#B92D1A]",
    btnBgColor:"bg-[#AD1A02]",
    hoverBtnBgColor:"hover:bg-[#dd4545]",
    activeBtnBgColor:"active:bg-[#AD1A02]"
    },
    {
      id:2,
      imageUrl:"../../../assets/venomcarnage.jpg",
      title:"Venom:",
      titleTail:" Let There Be Carnage",
      rating:9.4,
      description:"Eddie Brock tries to revive his failing career by interviewing a serial killer, Cletus Kasady,"+
      "who is on death row. When Carnage gains control over Cletus's body, he escapes from the prison.",
      color:"text-[#FF002C]",
      btnBgColor:"bg-[#FF002C]",
      hoverBtnBgColor:"hover:bg-[#830019]",
      activeBtnBgColor:"active:bg-[#FF002C]"
     },
     {
      id:3,
      imageUrl:"../../../assets/blackadam.jpg",
      title:"Black Adam",
      titleTail:"",
      rating:9.2,
      description:"After being granted with the divine power of the Egyptian Gods and spending almost 5000 years in "+
      "a guardhouse, Black Adam is freed and he decides to unloose his own style of justice to the world.",
      color:"text-[#D2AB32]",
      btnBgColor:"bg-[#D2AB32]",
      hoverBtnBgColor:"hover:bg-[#F4ECA4]",
      activeBtnBgColor:"active:bg-[#D2AB32]"
     }
  ];
  
}
