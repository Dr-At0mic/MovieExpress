import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, Input} from '@angular/core';
import { bootstrapPlayFill } from '@ng-icons/bootstrap-icons';
import { provideIcons,NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgIcon],
  viewProviders:[provideIcons({bootstrapPlayFill})],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent {
  @Input() data: any ;
  @Input() title: any;
  id:number = 0;
  onHover: string ="flex darkLayer";
  hoverOut: string = "hidden";
  size: number=2;
  constructor(){
    this.updateOnResize()
  }
  mouseOver(id:number){
    this.id = id;
  }
  mouseLeave(){
    this.id =0;
  }
  @HostListener('window:resize') updateOnResize(){
    const width: number =window.innerWidth;
    if(width>50)
      this.size=2;
    if(width>300)
      this.size=2;
    if(width>600)
      this.size=4;
    if(width>1000)
      this.size=6;
    if(width>1400)
      this.size=8;
    }
}
