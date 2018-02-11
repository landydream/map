class StaticPart extends Part {

	public act:string;

	public constructor() {
		super();
	}

	public setAct(v:any) {
		if(this.act != v) {
			this.act = v;
			this.buildmc();
		}
	}

	public buildmc() {
		super.buildmc();
		if(this.res && this.res.factory) {
			this.setPec(0);
		}
	}
}