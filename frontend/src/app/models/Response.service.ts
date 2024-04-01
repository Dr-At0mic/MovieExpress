export class Response {
  private data: any;
  private status: boolean = false;
  private message: string = '';
  private statusCode: number = 0;
  private httpStatus: number = 0;

  public getData(): any{
    return this.data
  }
  public setData(value:any){
    this.data= value
  }
  public isStatus(): boolean{
    return this.status
  }
  public setStatus(value:boolean){
    this.status= value
  }
  public getMessage(): string{
    return this.message
  }
  public setMessage(value:string){
    this.message= value
  }
  public getStatusCode(): number{
    return this.statusCode
  }
  public setStatusCode(value:number){
    this.statusCode= value
  }
  public getHttpStatus(): number{
    return this.httpStatus
  }
  public setHttpStatus(value:number){
    this.httpStatus= value
  }
}
export class CaptchaResponse{
  private captchaId: string ="";
  private captchaUrl: any ;
  public getCaptchaId(): string{
    return this.captchaId;
  }
  public setCaptchaId(value:string){
    this.captchaId= value;
  }
  public getCaptchaUrl(): any{
    return this.captchaUrl;
  }
  public setCaptchaUrl(value:any){
    this.captchaUrl= value
  }
}