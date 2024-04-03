import { Component, DoCheck, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificationsend',
  standalone: true,
  imports: [NgIf,],
  templateUrl: './verificationsend.component.html',
  styleUrl: './verificationsend.component.scss'
})
export class VerificationsendComponent implements DoCheck{
  constructor(private router: Router){}
  @Input() data: any ;
  ngDoCheck(): void {
   if(this.data.isStatus()){
    setTimeout(() => {
      this.data.setStatus(false);
      this.router.navigate(["/"],{replaceUrl: true});
    }, 5000);
   }
  }
}
