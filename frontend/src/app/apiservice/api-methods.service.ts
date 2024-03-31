import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SystemConstants } from '../../utils/SystemConstants';

@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {

  constructor(private http: HttpClient) { }
  postMethod(data: any): Observable<any>{
    try{
      return this.http.post(SystemConstants.LOGIN_URL, data, { withCredentials: true });
    }catch(apierror){
      return of (apierror);
    }
    
  }
}
