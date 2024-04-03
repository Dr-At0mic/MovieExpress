import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {
  constructor(private http: HttpClient) { }
  postMethod(url: string,data: any): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    try{
      return this.http.post(url,data,{headers: headers, withCredentials: true });
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
