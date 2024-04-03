import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-email-verification-page',
  standalone: true,
  imports: [],
  templateUrl: './email-verification-page.component.html',
  styleUrl: './email-verification-page.component.scss',
})
export class EmailVerificationPageComponent implements OnInit{
  Text: any = 'loading';
  token: any = '';
  tokenId: string = 'dmVyaWZpY2F0aW9uVG9rZW4';
  style : string = "";
  constructor(
    private router: Router,
    private authservice: AuthenticationService
  ) {}
  @Input() dmVyaWZpY2F0aW9uVG9rZW4: string = '';

  async ngOnInit(): Promise<void> {
    if (this.tokenId != this.dmVyaWZpY2F0aW9uVG9rZW4.split('=')[0])
      this.router.navigate(['/**'], { replaceUrl: true });
    this.dmVyaWZpY2F0aW9uVG9rZW4 = this.dmVyaWZpY2F0aW9uVG9rZW4.split('=')[1];
    const response = await this.authservice.verifyEmail(
      this.dmVyaWZpY2F0aW9uVG9rZW4
    );
    this.Text = response.getMessage();
    this.style="text-green-500";
    if(response.isStatus()){
      setTimeout(() => {
        this.router.navigate(["/"],{replaceUrl: true})
      }, 2000);
    }
    else{
      this.router.navigate(["/"],{replaceUrl:true})
    }
     
  }
}
