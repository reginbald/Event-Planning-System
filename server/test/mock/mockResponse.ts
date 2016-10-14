export class MockResponse {
  data: any;
  send = (data:any) => {
    console.log("send " + data);
    this.data = data;
  };
}