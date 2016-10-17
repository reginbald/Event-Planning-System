export class NewJobApplicationViewModel {
	public departmentid: number;
	public recruitment_request_id: number;
	public contract_type: string;
	public years_experience: number;
	public job_title: string;
	public job_description: string;

	constructor(dID:number, rID:number, ct:string, ye:number, jt:string, jd:string){
		this.departmentid = dID;
		this.recruitment_request_id = rID;
		this.contract_type = ct;
		this.years_experience = ye;
		this.job_title = jt;
		this.job_description = jd;
	}
}