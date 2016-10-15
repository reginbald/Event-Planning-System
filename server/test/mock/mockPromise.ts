export class MockPromise {
  data: any;
	err: any
	throw:any;
	constructor(data) {
		this.data = data;
		this.throw = false;
		this.err = {
			"message": "error"
		}
	}
  then = (cb) => {
    cb(this.data);
    return this;
  };
  catch = (cb) => {
		if(this.throw){
			cb(this.err);
		}
    return this;
  }
}