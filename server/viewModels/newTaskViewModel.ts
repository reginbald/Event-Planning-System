export class NewTaskViewModel {
	public ApplicationId: number;
	public senderid: number;
	public employeeid: number;
	public type: string;
	public description: string;
	public priority: string;

	constructor(aID:number, sID:number, emID:number, t:string, d:string, p:string){
		this.ApplicationId = aID;
		this.senderid = sID;
		this.employeeid = emID;
		this.type = t;
		this.description = d;
		this.priority = d;
	}
}