export class MockRequest {
 	body: any;
	params: any;
	hasprop: any;
	constructor(body:any, params:any) {
		this.body = body;
		this.params = params;
	};
}