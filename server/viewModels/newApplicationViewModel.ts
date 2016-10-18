export class NewApplicationViewModel {
	public departmentid: number;
	public EventId: number;

	constructor(dID:number, eID:number){
		this.departmentid = dID;
		this.EventId = eID;
	}
}