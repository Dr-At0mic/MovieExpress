import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMethodsService } from '../apiservice/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class AutoConfigTaskService {

  constructor(private apiservice: ApiMethodsService ) {}
  // fetchCaptchaPeriodically(Interval : number): Observable<any>{

  // }
}
