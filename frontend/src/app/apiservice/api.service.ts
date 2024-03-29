import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { response } from 'express';
import { get } from 'http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

    // constructor(private http: HttpClient) { }
  // this.http.get('url')
  //   .map((res: Response) => {
  //     res.json();
  // })
  async Post(url: string, data: any) :Promise<any>{
   const post = await axios.post(url , data, {'headers':{'Content-Type': 'application/json'},'withCredentials':true})
   return post;
  }

}
