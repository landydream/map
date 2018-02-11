class AstarNode {

	public static pool:Array<AstarNode> = new Array<AstarNode>();

	public static create():AstarNode {
		var ret:AstarNode;
		if(Astar.length > 0) {
			ret = AstarNode.pool.pop();
		}else{
			ret = new AstarNode();
		}
		return ret;
	}

	public constructor() {
	}

	public type:number;

	public block:boolean; //障碍

	public row:number;
	public col:number;

	public h:number;
	public f:number;

	public state:number = 0;

	public nears:Array<AstarLink> = [];

	public aPrev:AstarNode;

	public destory() {
		if(this.state != 0) {
			AstarNode.pool.push(this);
			this.state = 0;
		}
		this.nears.length = 0;
	}
}