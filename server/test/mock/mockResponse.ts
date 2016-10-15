export class MockResponse {
  data: any;
  stat: any;
  send = (data:any) => {
    this.data = data;
    return this;
  };
  status = (status:any) => {
    this.stat = status;
    return this;
  }
}