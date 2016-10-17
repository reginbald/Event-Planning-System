export class NewApplicationViewModel {
	public departmentid: number;
	public eventid: number;

	constructor(dID:number, eID:number){
		this.departmentid = dID;
		this.eventid = eID;
	}
}