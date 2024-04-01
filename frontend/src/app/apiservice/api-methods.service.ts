import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getCaptcha(url: string): Observable<any>{
    try {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(url,{headers,responseType: 'blob', observe: 'response' },);
    } catch (apierror) {
      return of(apierror);
    }
  }
}
