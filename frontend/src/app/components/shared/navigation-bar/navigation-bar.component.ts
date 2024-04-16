import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { cssClapperBoard, cssMathPlus } from '@ng-icons/css.gg';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { heroHomeSolid,heroBars3Solid} from '@ng-icons/heroicons/solid';
import { ionShuffle, ionTrendingUpSharp } from '@ng-icons/ionicons';
import { matTvRound } from '@ng-icons/material-icons/round';
interface MenuItems{
  iconId:number
  iconName:string
  description:string
}
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [provideIcons({heroBars3Solid,heroHomeSolid,heroMagnifyingGlass,cssClapperBoard,matTvRound,cssMathPlus,ionShuffle,ionTrendingUpSharp})],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent{
  menuFlag :boolean = false;
  menuItemsList : MenuItems[]=[
    {
      iconId:1,
      iconName:"heroMagnifyingGlass",
      description:"Search"
    },
    {
      iconId:2,
      iconName:"heroHomeSolid",
      description:"Home"
    },
    {
      iconId:3,
      iconName:"cssClapperBoard",
      description:"Movies"
    },
    {
      iconId:4,
      iconName:"matTvRound",
      description:"Series"
    },
    {
      iconId:5,
      iconName:"cssMathPlus",
      description:"Trending"
    },
    {
      iconId:6,
      iconName:"ionTrendingUpSharp",
      description:"Favorites"
    },
    {
      iconId:7,
      iconName:"ionShuffle",
      description:"Shuffle"
    }
  ];
  menuTrigger(){
    this.menuFlag = !this.menuFlag;
  }
  redirectMenu(value: number){
    console.log(value);
  }
}
