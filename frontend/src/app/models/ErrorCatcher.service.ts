export class ErrorCatcher {
  private status: boolean = false;
  private errorCode: number = 0;
  private mesage: string = '';
  private statusCode: number = 0;
  private statusName: string = '';
  private data: any;
  constructor(
    // status: boolean,
    // errorCode: number,
    // message: string,
    // statusCode: number,
    // statusName: string,
    // data: any
  ) {}
  public isStatus() {
    return this.status;
  }
  public setStatus(value: boolean) {
    this.status = value;
  }
  public getErrorCode() {
    return this.errorCode;
  }
  public setErrorCode(value: number) {
    this.errorCode = value;
  }
  public getMessage() {
    return this.mesage;
  }
  public setMessage(value: string) {
    this.mesage = value;
  }
  public getStatusCode() {
    return this.statusCode;
  }
  public setStatusCode(value: number) {
    this.statusCode = value;
  }
  public getStatusName() {
    return this.statusName;
  }
  public setStatusName(value: string) {
    this.statusName = value;
  }
  public getData() {
    return this.data;
  }
  public setData(value: any) {
    this.data = value;
  }
}
