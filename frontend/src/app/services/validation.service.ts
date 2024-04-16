import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}
   TokenValidator(token: String): boolean {
    //create a end point for validatitng token;
    //return true if token is valid
    return false;
  }
}
