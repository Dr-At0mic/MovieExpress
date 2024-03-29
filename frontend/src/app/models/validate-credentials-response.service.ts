import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateCredentialsResponseService {

  isSuccess: boolean = false;
  message: string;

  constructor(message: String, isSuccess?: Boolean) {
    if (isSuccess) {
      this.isSuccess = isSuccess as boolean;
    }
    this.message = message.toString();
  }
}
